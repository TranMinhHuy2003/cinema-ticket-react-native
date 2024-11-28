from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional, Dict
from firebase_admin import firestore
import firebase_admin
from firebase_admin import credentials, firestore
from payos import PayOS, PaymentData, ItemData
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from datetime import datetime, timedelta

# Tải các biến môi trường từ file .env
load_dotenv()

# Lấy thông tin từ biến môi trường
PAYOS_API_KEY = os.getenv("PAYOS_API_KEY")
PAYOS_CLIENT_ID = os.getenv("PAYOS_CLIENT_ID")
PAYOS_CHECKSUM_KEY = os.getenv("PAYOS_CHECKSUM_KEY")

# Khởi tạo ứng dụng FastAPI
app = FastAPI()

if not firebase_admin._apps:
    cred = credentials.Certificate(r"D:\StudyIT\Nam4Ki1\LTDNT\DoAn\MovieBookingAppBackend\moviebookingapp-435cc-firebase-adminsdk-hjrcs-55258e72df.json")
    firebase_admin.initialize_app(cred)
db = firestore.client()

# Cấu hình PayOS Client
payos = PayOS(
    api_key=PAYOS_API_KEY,  # API key
    client_id=PAYOS_CLIENT_ID,  # Client ID từ PayOS
    checksum_key=PAYOS_CHECKSUM_KEY  # Checksum Key từ PayOS
)

# Cấu hình CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cho phép tất cả các nguồn (hoặc có thể chỉ định các nguồn cụ thể như: ['http://localhost:8081'])
    allow_credentials=True,
    allow_methods=["*"],  # Cho phép tất cả các phương thức HTTP (GET, POST, PUT, DELETE, ...)
    allow_headers=["*"],  # Cho phép tất cả các tiêu đề
)

# Models cho phim và booking
class Movie(BaseModel):
    title: str
    description: str
    posterUrl: str
    trailerUrl: str
    releaseDate: datetime = "1999-03-30T17:00:00.610000Z"
    duration: Optional[int]
    genres: Optional[List[str]] = None
    imdbRating: Optional[float] = 1.5
    rottenTomatoesRating: Optional[int] = 1
    showtimes: Optional[dict] = {}  # {'timeId': {'time': '2024-09-20T19:00:00', 'seats': {'A1': True, 'A2': False}}}

class Booking(BaseModel):
    user_id: str
    movie_id: str
    movie_title: str
    cinema_name: str
    showtime: datetime = "1999-03-30T17:00:00.610000Z"
    seats: List[str] = []
    total_price: int

# Model cho booking response
class BookingResponse(BaseModel):
    ticket_ids: List[str]
    total_price: int

# Model thanh toán
class PaymentRequest(BaseModel):
    order_id: int
    amount: int
    description: str

# Mock admin authentication function
def get_current_admin_user():
    # Giả định là đã đăng nhập và xác thực, trả về user là admin
    return True  # Thay bằng logic xác thực thực tế

# # 1. Lấy danh sách phim
@app.get("/movies", response_model=List[Movie])
async def get_movies():
    movies_ref = db.collection('movies')
    movies = movies_ref.stream()
    movie_list = []
    for movie in movies:
        movie_list.append(movie.to_dict())
    return movie_list

# 2. Lấy thông tin chi tiết của một phim
@app.get("/movies/{movie_id}", response_model=Movie)
async def get_movie(movie_id: str):
    movie_ref = db.collection('movies').document(movie_id)
    movie = movie_ref.get()
    if movie.exists:
        return movie.to_dict()
    raise HTTPException(status_code=404, detail="Movie not found")

# 3. Thêm phim mới (chỉ admin)
@app.post("/movies", response_model=str)
async def add_movie(movie: Movie, admin: bool = Depends(get_current_admin_user)):
    if not admin:
        raise HTTPException(status_code=403, detail="Not authorized")
    movie_ref = db.collection('movies').document()
    movie_ref.set(movie.dict())
    return movie_ref.id

# 4. Cập nhật thông tin phim (chỉ admin)
@app.put("/movies/{movie_id}", response_model=str)
async def update_movie(movie_id: str, movie: Movie, admin: bool = Depends(get_current_admin_user)):
    if not admin:
        raise HTTPException(status_code=403, detail="Not authorized")
    movie_ref = db.collection('movies').document(movie_id)
    if not movie_ref.get().exists:
        raise HTTPException(status_code=404, detail="Movie not found")
    movie_ref.update(movie.dict())
    return movie_id

# 5. Xóa phim (chỉ admin)
@app.delete("/movies/{movie_id}", response_model=str)
async def delete_movie(movie_id: str, admin: bool = Depends(get_current_admin_user)):
    if not admin:
        raise HTTPException(status_code=403, detail="Not authorized")
    movie_ref = db.collection('movies').document(movie_id)
    if not movie_ref.get().exists:
        raise HTTPException(status_code=404, detail="Movie not found")
    movie_ref.delete()
    return movie_id

# Set cứng giá ghế
SEAT_PRICES = {
    "vip": 150000,
    "normal": 100000
}

# 6. Đặt vé
@app.post("/bookings/", response_model=BookingResponse)
async def book_ticket(booking: Booking):
    # 1. Tìm phim trong collection movies theo movie_id
    movie_ref = db.collection('movies').document(booking.movie_id)
    movie = movie_ref.get()
    
    if not movie.exists:
        raise HTTPException(status_code=404, detail="Movie not found")

    movie_data = movie.to_dict()
    movie_showtimes = movie_data['showtimes']
    
    # 2. Kiểm tra xem showtime trong booking có trùng với thời gian bắt đầu của showtimes trong movie không
    showtime_match = None
    for showtime_key, showtime_data in movie_showtimes.items():
        if showtime_data['start_time'] == booking.showtime:
            showtime_match = showtime_data
            break
    
    if not showtime_match:
        raise HTTPException(status_code=404, detail="Showtime not found")

    # 3. Kiểm tra và cập nhật trạng thái ghế
    seats_dict = {seat['seat']: seat for seat in showtime_match['seats']}
    total_price = 0
    
    for seat_code in booking.seats:
        seat = seats_dict.get(seat_code)
        if not seat:
            raise HTTPException(status_code=404, detail=f"Seat {seat_code} not found")
        if not seat['available']:
            raise HTTPException(status_code=400, detail=f"Seat {seat_code} is already booked")
        
        # Cập nhật trạng thái ghế (đánh dấu ghế đã đặt)
        seat['available'] = False
        total_price += SEAT_PRICES[seat['type']]

    # Cập nhật lại thông tin ghế trong Firestore
    movie_ref.update({f'showtimes.{showtime_key}.seats': list(seats_dict.values())})

    # 4. Tạo booking trong collection `users`
    user_ref = db.collection('users').document(booking.user_id)
    user = user_ref.get()
    if not user.exists:
        raise HTTPException(status_code=404, detail="User not found")
    
    user_data = user.to_dict()
    new_booking = {
        "movie_title": movie_data['title'],
        "cinema_name": showtime_match['cinema']['cinema_name'],
        "showtime": booking.showtime,
        "seats": booking.seats,
        "total_price": total_price
    }
    
    # Thêm booking vào subcollection bookings của người dùng
    user_ref.collection('bookings').add(new_booking)

    # 5. Tạo vé trong collection `tickets`
    created_at = datetime.now() - timedelta(hours=7)
    ticket_ids = []
    
    for seat_code in booking.seats:
        ticket_data = {
            "user_id": booking.user_id,
            "movie_title": movie_data['title'],
            "cinema_name": showtime_match['cinema']['cinema_name'],
            "showtime": booking.showtime,
            "seat_number": seat_code,
            "status": "confirmed",
            "price": SEAT_PRICES[seats_dict[seat_code]['type']],
            "created_at": created_at,
            "updated_at": created_at,
        }
        ticket_ref = db.collection('tickets').document()
        ticket_ref.set(ticket_data)
        ticket_ids.append(ticket_ref.id)

    # Trả về object BookingResponse
    return BookingResponse(ticket_ids=ticket_ids, total_price=total_price)

# 7. Xem danh sách vé đã đặt của khách hàng
@app.get("/bookings/{user_id}", response_model=List[Booking])
async def get_user_bookings(user_id: str):
    bookings_ref = db.collection('users').where('user_id', '==', user_id)
    bookings = bookings_ref.stream()
    booking_list = []
    for booking in bookings:
        booking_list.append(booking.to_dict())
    return booking_list

# 8. Tạo liên kết thanh toán
@app.post("/payment")
async def create_payment_link(payment_request: PaymentRequest):
    domain = "http://192.168.0.103:8000"
    try:
        payment_data = PaymentData(
            orderCode=payment_request.order_id,
            amount=payment_request.amount,
            description=payment_request.description,
            cancelUrl=f"{domain}/cancel",
            returnUrl=f"{domain}/success"
        )
        payos_payment = payos.createPaymentLink(payment_data)
        return {"checkoutUrl": payos_payment.checkoutUrl}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
 
# 9. Kết quả thanh toán 
@app.get("/success")
async def success_page():
    return HTMLResponse(content="<h1>Thanh toán thành công</h1>", status_code=200)

@app.get("/cancel")
async def cancel_page():
    return HTMLResponse(content="<h1>Thanh toán đã bị hủy</h1>", status_code=200)

@app.get("/favicon.ico")
async def favicon():
    return HTMLResponse(content="", status_code=200)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
