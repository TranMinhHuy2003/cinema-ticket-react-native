from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
from firebase_admin import firestore
import firebase_admin
from firebase_admin import credentials, firestore


# Khởi tạo ứng dụng FastAPI
app = FastAPI()

if not firebase_admin._apps:
    cred = credentials.Certificate(r"C:\Users\user\.vscode\code\IE307\project\MovieBookingApp\moviebookingapp-435cc-firebase-adminsdk-hjrcs-c2c2d253dc.json")
    firebase_admin.initialize_app(cred)
db = firestore.client()

# Models cho phim và booking
class Movie(BaseModel):
    title: str
    description: str
    posterUrl: str
    trailerUrl: str
    imdbRating: Optional[float]
    rottenTomatoesRating: Optional[int]
    showtimes: Optional[dict]  # {'timeId': {'time': '2024-09-20T19:00:00', 'seats': {'A1': True, 'A2': False}}}

class Booking(BaseModel):
    user_id: str
    movie_id: str
    time_id: str
    seats: List[str]

# Mock admin authentication function
def get_current_admin_user():
    # Giả định là đã đăng nhập và xác thực, trả về user là admin
    return True  # Thay bằng logic xác thực thực tế

# 1. Lấy danh sách phim
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

# 6. Đặt vé
@app.post("/bookings", response_model=str)
async def book_ticket(booking: Booking):
    # Kiểm tra xem phim và khung giờ có tồn tại không
    movie_ref = db.collection('movies').document(booking.movie_id)
    movie = movie_ref.get()
    if not movie.exists:
        raise HTTPException(status_code=404, detail="Movie not found")
    
    movie_data = movie.to_dict()
    if booking.time_id not in movie_data['showtimes']:
        raise HTTPException(status_code=404, detail="Showtime not found")
    
    # Kiểm tra ghế còn trống
    available_seats = movie_data['showtimes'][booking.time_id]['seats']
    for seat in booking.seats:
        if available_seats.get(seat) == True:
            raise HTTPException(status_code=400, detail=f"Seat {seat} is already booked")
    
    # Cập nhật ghế đã đặt
    for seat in booking.seats:
        available_seats[seat] = True
    movie_ref.update({'showtimes': movie_data['showtimes']})
    
    # Thêm vào collection bookings
    booking_ref = db.collection('bookings').document()
    booking_ref.set(booking.dict())
    
    return booking_ref.id

# 7. Xem danh sách vé đã đặt của khách hàng
@app.get("/bookings/{user_id}", response_model=List[Booking])
async def get_user_bookings(user_id: str):
    bookings_ref = db.collection('bookings').where('user_id', '==', user_id)
    bookings = bookings_ref.stream()
    booking_list = []
    for booking in bookings:
        booking_list.append(booking.to_dict())
    return booking_list

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
