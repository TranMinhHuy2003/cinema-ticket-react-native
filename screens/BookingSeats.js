import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions, ScrollView } from "react-native";
import axios from "axios";
import { API_URL } from '@env';

const { width } = Dimensions.get("window");

const BookingSeats = ({ route, navigation }) => {
  const { originShowtime, selectedShowtime, selectedTheater, selectedHall, selectedDate, movieId, movieTitle, moviePoster } = route.params;
  const parsedSelectedDate = new Date(route.params.selectedDate);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const ticketPrice = 100000;
  const vipTicketPrice = 150000;

  // Gọi API để lấy danh sách ghế
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axios.get(`${API_URL}/movies/${movieId}`);

        // Kiểm tra showtimes là một object
        if (typeof response.data.showtimes === "object" && response.data.showtimes !== null) {
          const showtimesArray = Object.values(response.data.showtimes);

          const selectedShowtimeData = showtimesArray.find(showtime => {
            // Chuyển start_time và selectedDate thành dạng ngày (không giờ)
            const startDate = new Date(showtime.start_time).toLocaleDateString();
            const selectedDateFormatted = parsedSelectedDate.toLocaleDateString();

            // So sánh ngày và thời gian
            const dateMatch = startDate === selectedDateFormatted;
            const theaterMatch = showtime.cinema.cinema_name === selectedTheater;
            const hallMatch = showtime.cinema.hall_name === selectedHall;

            return dateMatch && theaterMatch && hallMatch;
          });

          if (selectedShowtimeData) {
            setSeats(selectedShowtimeData.seats);
          } else {
            console.log("Không tìm thấy suất chiếu phù hợp");
          }
        } else {
          console.log("showtimes không phải là một object hợp lệ", response.data.showtimes);
        }
      } catch (error) {
        console.error("Error fetching seats:", error);
      }
    };

    fetchSeats();
  }, [movieId, selectedShowtime, selectedTheater, selectedHall, selectedDate]);

  const toggleSeatSelection = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const calculateTotalPrice = () => {
    return selectedSeats.reduce((total, seat) => {
      const seatType = seats.find((s) => s.seat === seat)?.type;
      const price = seatType === "vip" ? vipTicketPrice : ticketPrice;
      return total + price;
    }, 0);
  };

  // Format price as VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const handleBooking = () => {
    const totalPrice = calculateTotalPrice();
    navigation.navigate("Payment", {
      selectedShowtime,
      originShowtime,
      selectedDate: parsedSelectedDate.toISOString(),
      selectedTheater,
      selectedHall,
      selectedSeats,
      movieId,
      movieTitle,
      moviePoster,
      totalPrice,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.header}>Chọn ghế ngồi</Text>
        {seats.length === 0 ? (
          <Text style={styles.noSeatsText}>Không có suất chiếu phù hợp. Vui lòng chọn lại.</Text>
        ) : (
          <ScrollView horizontal>
            <FlatList
              data={seats}
              numColumns={10}
              keyExtractor={(item) => item.seat} // Sử dụng `seat` làm key
              ListHeaderComponent={() => (
                <View style={styles.screenBox}>
                  <Text style={styles.screenText}>Màn hình</Text>
                </View>
              )}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.seat,
                    // Kiểm tra loại ghế (VIP hay bình thường) và trạng thái (có sẵn hay không)
                    item.type === "vip"
                      ? item.available
                        ? selectedSeats.includes(item.seat)
                          ? styles.selectedSeat
                          : styles.vipSeat
                        : styles.boughtSeat
                      : item.available
                      ? selectedSeats.includes(item.seat)
                        ? styles.selectedSeat
                        : styles.unselectedSeat
                      : styles.boughtSeat,
                  ]}
                  onPress={() => item.available && toggleSeatSelection(item.seat)} // Chỉ cho phép chọn ghế có sẵn
                  disabled={!item.available} // Ghế không có sẵn không thể chọn
                >
                  {!item.available && (
                    <View style={styles.boughtSeatCross}>
                      <View style={styles.crossLine1} />
                      <View style={styles.crossLine2} />
                    </View>
                  )}
                  <Text style={styles.seatText}>{item.seat}</Text>
                </TouchableOpacity>
              )}
            />
          </ScrollView>
        )}

        <View style={styles.legendContainer}>
          <View style={[styles.legendBox, styles.unselectedSeat]} />
          <Text style={styles.legendText}>Ghế trống</Text>
          <View style={[styles.legendBox, styles.vipSeat]} />
          <Text style={styles.legendText}>Ghế VIP</Text>
          <View style={[styles.legendBox, styles.selectedSeat]} />
          <Text style={styles.legendText}>Ghế đã chọn</Text>
          <View style={[styles.legendBox, styles.boughtSeat]}>
            <View style={styles.legendCross}>
              <View style={styles.legendLine1} />
              <View style={styles.legendLine2} />
            </View>
          </View>
          <Text style={styles.legendText}>Ghế đã bán</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <View>
          <Text style={styles.title}>{movieTitle}</Text>
          <Text style={styles.footerText}>Số ghế đã chọn: {selectedSeats.length} ghế</Text>
          <Text style={styles.moneyText}>{formatPrice(calculateTotalPrice())}</Text>
        </View>
        <TouchableOpacity
          style={selectedSeats.length > 0 ? styles.paymentButton : styles.paymentButtonDisable}
          onPress={selectedSeats.length > 0 ? handleBooking : null}
          disabled={selectedSeats.length === 0}
        >
          <Text style={styles.paymentButtonText}>Thanh toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookingSeats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    padding: 10,
  },
  noSeatsText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    marginVertical: 20,
  },
  header: {
    fontSize: 20,
    color: "#fff",
    marginVertical: 10,
    fontWeight: "bold",
  },
  screenBox: {
    width: '100%',
    height: width * 0.3,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderColor: '#FFF',
    borderWidth: 1,
  },
  screenText: {
    color: "#FFF",
    fontSize: 50,
    fontWeight: "bold",
  },
  seatContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  seat: {
    margin: 5,
    padding: 2,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
  },
  selectedSeat: {
    backgroundColor: "#FF0000",
  },
  unselectedSeat: {
    backgroundColor: "#1e1e1e",
    borderColor: "#fff",
    borderWidth: 1,
  },
  vipSeat: {
    backgroundColor: "#FFD700",
  },
  boughtSeat: {
    backgroundColor: "#555",
  },
  boughtSeatCross: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  crossLine1: {
    position: "absolute",
    width: "100%",
    height: 2,
    backgroundColor: "#FFF",
    transform: [{ rotate: "45deg" }],
    top: "50%",
    left: 0,
  },
  crossLine2: {
    position: "absolute",
    width: "100%",
    height: 2,
    backgroundColor: "#FFF",
    transform: [{ rotate: "-45deg" }],
    top: "50%",
    left: 0,
  },
  seatText: {
    color: "#fff",
  },
  legendContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'center',
    alignItems: "center",
    marginTop: 10,
  },
  legendBox: {
    width: 20,
    height: 20,
    marginRight: 5,
    marginBottom: 10,
    borderRadius: 5,
  },
  legendCross: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  legendLine1: {
    position: "absolute",
    width: "100%",
    height: 2,
    backgroundColor: "#FFF",
    transform: [{ rotate: "45deg" }],
    top: "50%",
    left: 0,
  },
  legendLine2: {
    position: "absolute",
    width: "100%",
    height: 2,
    backgroundColor: "#FFF",
    transform: [{ rotate: "-45deg" }],
    top: "50%",
    left: 0,
  },
  legendText: {
    color: "#fff",
    marginRight: 10,
  },
  footer: {
    padding: 10,
    backgroundColor: "#FFF",
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    alignItems: "center",
  },
  paymentButton: {
    backgroundColor: "#FF0000",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  paymentButtonDisable: {
    backgroundColor: "#555",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  paymentButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,       
  },
  footerText: {
    color: "#000",
    marginBottom: 5,
  },
  title: {
    color: "#000",
    marginBottom: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  moneyText: {
    fontWeight: 'bold',
    fontSize: 16,
  }
});
