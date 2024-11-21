import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Button, Alert, StyleSheet, Dimensions, ScrollView } from "react-native";

const { width } = Dimensions.get("window");

const sampleSeats = [
  { seat: "A1", available: true, type: "normal" },
  { seat: "A2", available: false, type: "normal" },
  { seat: "A3", available: true, type: "normal" },
  { seat: "A4", available: true, type: "normal" },
  { seat: "A5", available: false, type: "normal" },
  { seat: "A6", available: true, type: "normal" },
  { seat: "A7", available: true, type: "normal" },
  { seat: "A8", available: false, type: "normal" },
  { seat: "A9", available: false, type: "normal" },
  { seat: "A10", available: true, type: "normal" },
  { seat: "A11", available: true, type: "normal" },
  { seat: "A12", available: false, type: "normal" },
  { seat: "A13", available: true, type: "normal" },
  { seat: "A14", available: true, type: "normal" },
  { seat: "A15", available: true, type: "normal" },
  { seat: "B1", available: true, type: "normal" },
  { seat: "B2", available: false, type: "normal" },
  { seat: "B3", available: true, type: "normal" },
  { seat: "B4", available: true, type: "normal" },
  { seat: "B5", available: false, type: "normal" },
  { seat: "B6", available: true, type: "normal" },
  { seat: "B7", available: true, type: "normal" },
  { seat: "B8", available: false, type: "normal" },
  { seat: "B9", available: false, type: "normal" },
  { seat: "B10", available: true, type: "normal" },
  { seat: "B11", available: true, type: "normal" },
  { seat: "B12", available: false, type: "normal" },
  { seat: "B13", available: true, type: "normal" },
  { seat: "B14", available: true, type: "normal" },
  { seat: "B15", available: true, type: "normal" },
  { seat: "C1", available: true, type: "normal" },
  { seat: "C2", available: false, type: "normal" },
  { seat: "C3", available: false, type: "normal" },
  { seat: "C4", available: true, type: "normal" },
  { seat: "C5", available: false, type: "normal" },
  { seat: "C6", available: true, type: "normal" },
  { seat: "C7", available: true, type: "normal" },
  { seat: "C8", available: false, type: "normal" },
  { seat: "C9", available: false, type: "normal" },
  { seat: "C10", available: true, type: "normal" },
  { seat: "C11", available: false, type: "normal" },
  { seat: "C12", available: true, type: "normal" },
  { seat: "C13", available: true, type: "normal" },
  { seat: "C14", available: true, type: "normal" },
  { seat: "C15", available: true, type: "normal" },
  { seat: "D1", available: true, type: "normal" },
  { seat: "D2", available: false, type: "normal" },
  { seat: "D3", available: true, type: "normal" },
  { seat: "D4", available: false, type: "normal" },
  { seat: "D5", available: false, type: "normal" },
  { seat: "D6", available: true, type: "normal" },
  { seat: "D7", available: true, type: "normal" },
  { seat: "D8", available: false, type: "normal" },
  { seat: "D9", available: false, type: "normal" },
  { seat: "D10", available: false, type: "normal" },
  { seat: "D11", available: true, type: "normal" },
  { seat: "D12", available: true, type: "normal" },
  { seat: "D13", available: true, type: "normal" },
  { seat: "D14", available: true, type: "normal" },
  { seat: "D15", available: true, type: "normal" },
  { seat: "E1", available: true, type: "vip" },
  { seat: "E2", available: false, type: "vip" },
  { seat: "E3", available: true, type: "vip" },
  { seat: "E4", available: true, type: "vip" },
  { seat: "E5", available: false, type: "vip" },
  { seat: "E6", available: true, type: "vip" },
  { seat: "E7", available: true, type: "vip" },
  { seat: "E8", available: false, type: "vip" },
  { seat: "E9", available: false, type: "vip" },
  { seat: "E10", available: true, type: "vip" },
  { seat: "E11", available: true, type: "vip" },
  { seat: "E12", available: true, type: "vip" },
  { seat: "E13", available: true, type: "vip" },
  { seat: "E14", available: true, type: "vip" },
  { seat: "E15", available: true, type: "vip" },
  { seat: "F1", available: true, type: "vip" },
  { seat: "F2", available: false, type: "vip" },
  { seat: "F3", available: false, type: "vip" },
  { seat: "F4", available: true, type: "vip" },
  { seat: "F5", available: false, type: "vip" },
  { seat: "F6", available: true, type: "vip" },
  { seat: "F7", available: true, type: "vip" },
  { seat: "F8", available: false, type: "vip" },
  { seat: "F9", available: false, type: "vip" },
  { seat: "F10", available: true, type: "vip" },
  { seat: "F11", available: true, type: "vip" },
  { seat: "F12", available: false, type: "vip" },
  { seat: "F13", available: false, type: "vip" },
  { seat: "F14", available: true, type: "vip" },
  { seat: "F15", available: true, type: "vip" },
  { seat: "G1", available: true, type: "normal" },
  { seat: "G2", available: false, type: "normal" },
  { seat: "G3", available: true, type: "normal" },
  { seat: "G4", available: true, type: "normal" },
  { seat: "G5", available: false, type: "normal" },
  { seat: "G6", available: false, type: "normal" },
  { seat: "G7", available: true, type: "normal" },
  { seat: "G8", available: false, type: "normal" },
  { seat: "G9", available: false, type: "normal" },
  { seat: "G10", available: true, type: "normal" },
  { seat: "G11", available: false, type: "normal" },
  { seat: "G12", available: true, type: "normal" },
  { seat: "G13", available: true, type: "normal" },
  { seat: "G14", available: false, type: "normal" },
  { seat: "G15", available: true, type: "normal" },
  { seat: "H1", available: true, type: "normal" },
  { seat: "H2", available: false, type: "normal" },
  { seat: "H3", available: true, type: "normal" },
  { seat: "H4", available: true, type: "normal" },
  { seat: "H5", available: false, type: "normal" },
  { seat: "H6", available: false, type: "normal" },
  { seat: "H7", available: true, type: "normal" },
  { seat: "H8", available: false, type: "normal" },
  { seat: "H9", available: false, type: "normal" },
  { seat: "H10", available: true, type: "normal" },
  { seat: "H11", available: true, type: "normal" },
  { seat: "H12", available: false, type: "normal" },
  { seat: "H13", available: true, type: "normal" },
  { seat: "H14", available: true, type: "normal" },
  { seat: "H15", available: true, type: "normal" },
];

// const sampleSeats = Array.from({ length: 150 }, (_, i) => ({
//   seat: `A ${Math.floor(i / 15) + 1} Seat ${(i % 15) + 1}`,
//   available: i % 5 !== 0,
// }));

const BookingSeats = ({ route, navigation }) => {
  const { selectedShowtime, selectedTheater, movieTitle, moviePoster } = route.params;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const ticketPrice = 100000;
  const vipTicketPrice = 150000;

  const toggleSeatSelection = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const calculateTotalPrice = () => {
    return selectedSeats.reduce((total, seat) => {
      const seatType = sampleSeats.find((s) => s.seat === seat)?.type;
      const price = seatType === "vip" ? vipTicketPrice : ticketPrice;
      return total + price;
    }, 0);
  };

  const formatCurrency = (number) => {
    return number.toLocaleString("vi-VN");
  };

  const handleBooking = () => {
    const totalPrice = calculateTotalPrice();
    navigation.navigate("Payment", {
      selectedShowtime,
      selectedTheater,
      selectedSeats,
      movieTitle,
      moviePoster,
      totalPrice,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.header}>Chọn ghế ngồi</Text>
        <ScrollView horizontal>
          <FlatList
            data={sampleSeats}
            numColumns={15}
            keyExtractor={(item) => item.seat}
            ListHeaderComponent={() => (
              <View style={styles.screenBox}>
                <Text style={styles.screenText}>Màn hình</Text>
              </View>
            )}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.seat,
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
                onPress={() => item.available && toggleSeatSelection(item.seat)}
                disabled={!item.available}
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
        <View style={styles.legendContainer}>
          <View style={[styles.legendBox, styles.availableSeat]} />
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
          <Text style={styles.moneyText}>
            {formatCurrency(calculateTotalPrice())} đ
          </Text>
        </View>
        <TouchableOpacity 
          style={selectedSeats.length > 0 ? styles.paymentButton: styles.paymentButtonDisable} 
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
  availableSeat: {
    backgroundColor: "#1e1e1e",
    borderColor: "#fff",
    borderWidth: 1,
  },
  selectedSeat: {
    backgroundColor: "#FF0000",
  },
  boughtSeat: {
    backgroundColor: "#555",
    borderWidth: 2,
    borderColor: "transparent",
    position: "relative",
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
