import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { API_URL } from '@env';

const sampleData = {
  "2024-10-30": [
    { theater: "Rạp 1", showtimes: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM", "9:30 PM"] },
    { theater: "Rạp 2", showtimes: ["11:00 AM", "2:30 PM", "6:00 PM", "8:30 PM", "10:30 PM"] },
    { theater: "Rạp 3", showtimes: ["9:30 AM", "12:30 PM", "3:30 PM", "6:30 PM", "9:00 PM"] },
    { theater: "Rạp 4", showtimes: ["10:30 AM", "1:00 PM", "5:00 PM", "7:30 PM", "10:00 PM"] },
  ],
  "2024-10-31": [
    { theater: "Rạp 5", showtimes: ["8:30 AM", "11:00 AM", "2:30 PM", "5:00 PM", "8:00 PM"] },
    { theater: "Rạp 6", showtimes: ["9:00 AM", "12:00 PM", "3:30 PM", "6:30 PM", "9:00 PM"] },
    { theater: "Rạp 7", showtimes: ["10:00 AM", "1:00 PM", "4:00 PM", "6:30 PM", "9:00 PM"] },
    { theater: "Rạp 8", showtimes: ["11:30 AM", "2:00 PM", "5:30 PM", "8:00 PM", "10:30 PM"] },
  ],
  "2024-11-11": [
    { theater: "Rạp 1", showtimes: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM", "9:30 PM"] },
    { theater: "Rạp 2", showtimes: ["11:00 AM", "2:30 PM", "6:00 PM", "8:30 PM", "10:30 PM"] },
    { theater: "Rạp 3", showtimes: ["9:30 AM", "12:30 PM", "3:30 PM", "6:30 PM", "9:00 PM"] },
    { theater: "Rạp 4", showtimes: ["10:30 AM", "1:00 PM", "5:00 PM", "7:30 PM", "10:00 PM"] },
  ],
  "2024-11-12": [
    { theater: "Rạp 5", showtimes: ["8:30 AM", "11:00 AM", "2:30 PM", "5:00 PM", "8:00 PM"] },
    { theater: "Rạp 6", showtimes: ["9:00 AM", "12:00 PM", "3:30 PM", "6:30 PM", "9:00 PM"] },
    { theater: "Rạp 7", showtimes: ["10:00 AM", "1:00 PM", "4:00 PM", "6:30 PM", "9:00 PM"] },
    { theater: "Rạp 8", showtimes: ["11:30 AM", "2:00 PM", "5:30 PM", "8:00 PM", "10:30 PM"] },
  ],
  "2024-11-14": [
    { theater: "Rạp 5", showtimes: ["8:30 AM", "11:00 AM", "2:30 PM", "5:00 PM", "8:00 PM"] },
    { theater: "Rạp 6", showtimes: ["9:00 AM", "12:00 PM", "3:30 PM", "6:30 PM", "9:00 PM"] },
    { theater: "Rạp 7", showtimes: ["10:00 AM", "1:00 PM", "4:00 PM", "6:30 PM", "9:00 PM"] },
    { theater: "Rạp 8", showtimes: ["11:30 AM", "2:00 PM", "5:30 PM", "8:00 PM", "10:30 PM"] },
  ],
  "2024-11-16": [
    { theater: "Rạp 5", showtimes: ["8:30 AM", "11:00 AM", "2:30 PM", "5:00 PM", "8:00 PM"] },
    { theater: "Rạp 6", showtimes: ["9:00 AM", "12:00 PM", "3:30 PM", "6:30 PM", "9:00 PM"] },
    { theater: "Rạp 7", showtimes: ["10:00 AM", "1:00 PM", "4:00 PM", "6:30 PM", "9:00 PM"] },
    { theater: "Rạp 8", showtimes: ["11:30 AM", "2:00 PM", "5:30 PM", "8:00 PM", "10:30 PM"] },
  ],
  "2024-11-17": [
    { theater: "Rạp 1", showtimes: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM", "9:30 PM"] },
    { theater: "Rạp 2", showtimes: ["11:00 AM", "2:30 PM", "6:00 PM", "8:30 PM", "10:30 PM"] },
    { theater: "Rạp 3", showtimes: ["9:30 AM", "12:30 PM", "3:30 PM", "6:30 PM", "9:00 PM"] },
    { theater: "Rạp 4", showtimes: ["10:30 AM", "1:00 PM", "5:00 PM", "7:30 PM", "10:00 PM"] },
  ],
  "2024-11-19": [
    { theater: "Rạp 1", showtimes: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM", "9:30 PM"] },
    { theater: "Rạp 2", showtimes: ["11:00 AM", "2:30 PM", "6:00 PM", "8:30 PM", "10:30 PM"] },
    { theater: "Rạp 3", showtimes: ["9:30 AM", "12:30 PM", "3:30 PM", "6:30 PM", "9:00 PM"] },
    { theater: "Rạp 4", showtimes: ["10:30 AM", "1:00 PM", "5:00 PM", "7:30 PM", "10:00 PM"] },
  ],
  "2024-11-20": [
    { theater: "Rạp 5", showtimes: ["8:30 AM", "11:00 AM", "2:30 PM", "5:00 PM", "8:00 PM"] },
    { theater: "Rạp 6", showtimes: ["9:00 AM", "12:00 PM", "3:30 PM", "6:30 PM", "9:00 PM"] },
    { theater: "Rạp 7", showtimes: ["10:00 AM", "1:00 PM", "4:00 PM", "6:30 PM", "9:00 PM"] },
    { theater: "Rạp 8", showtimes: ["11:30 AM", "2:00 PM", "5:30 PM", "8:00 PM", "10:30 PM"] },
  ],
  "2024-11-21": [
    { theater: "Rạp 1", showtimes: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM", "9:30 PM"] },
    { theater: "Rạp 2", showtimes: ["11:00 AM", "2:30 PM", "6:00 PM", "8:30 PM", "10:30 PM"] },
    { theater: "Rạp 3", showtimes: ["9:30 AM", "12:30 PM", "3:30 PM", "6:30 PM", "9:00 PM"] },
    { theater: "Rạp 4", showtimes: ["10:30 AM", "1:00 PM", "5:00 PM", "7:30 PM", "10:00 PM"] },
  ],
  "2024-11-23": [
    { theater: "Rạp 1", showtimes: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM", "9:30 PM"] },
    { theater: "Rạp 2", showtimes: ["11:00 AM", "2:30 PM", "6:00 PM", "8:30 PM", "10:30 PM"] },
    { theater: "Rạp 3", showtimes: ["9:30 AM", "12:30 PM", "3:30 PM", "6:30 PM", "9:00 PM"] },
    { theater: "Rạp 4", showtimes: ["10:30 AM", "1:00 PM", "5:00 PM", "7:30 PM", "10:00 PM"] },
  ],
  "2024-11-24": [
    { theater: "Rạp 5", showtimes: ["8:30 AM", "11:00 AM", "2:30 PM", "5:00 PM", "8:00 PM"] },
    { theater: "Rạp 6", showtimes: ["9:00 AM", "12:00 PM", "3:30 PM", "6:30 PM", "9:00 PM"] },
    { theater: "Rạp 7", showtimes: ["10:00 AM", "1:00 PM", "4:00 PM", "6:30 PM", "9:00 PM"] },
    { theater: "Rạp 8", showtimes: ["11:30 AM", "2:00 PM", "5:30 PM", "8:00 PM", "10:30 PM"] },
  ],
  "2024-11-25": [
    { theater: "Rạp 1", showtimes: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM", "9:30 PM"] },
    { theater: "Rạp 2", showtimes: ["11:00 AM", "2:30 PM", "6:00 PM", "8:30 PM", "10:30 PM"] },
    { theater: "Rạp 3", showtimes: ["9:30 AM", "12:30 PM", "3:30 PM", "6:30 PM", "9:00 PM"] },
    { theater: "Rạp 4", showtimes: ["10:30 AM", "1:00 PM", "5:00 PM", "7:30 PM", "10:00 PM"] },
  ],
};


const Booking = ({ route, navigation }) => {
  const { movieTitle, moviePoster } = route.params;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [expandedTheater, setExpandedTheater] = useState(null);

//   useEffect(() => {
//     axios.get(${API_URL}/movies/${movieId})
//       .then(response => {
//         setShowtimes(response.data.showtimes);
//       })
//       .catch(error => {
//         console.error(error);
// alert(error);
//       });
//   }, []);

//   const toggleSeatSelection = (seat) => {
//     if (selectedSeats.includes(seat)) {
//       setSelectedSeats(selectedSeats.filter(s => s !== seat));
//     } else {
//       setSelectedSeats([...selectedSeats, seat]);
//     }
//   };

//   const handleBooking = () => {
//     axios.post(${API_URL}/bookings, {
//       movie_id: movieId,
//       time_id: selectedShowtime,
//       seats: selectedSeats
//     })
//     .then(() => {
//       navigation.navigate('Payment');
//     })
//     .catch(error => {
//       console.error(error);
//     });
//   };

  // Hàm tạo các ngày trong tuần từ thứ Hai đến Chủ Nhật
  const generateWeekDays = (startDate) => {
    const days = [];
    const firstDay = startDate.getDay();
    const mondayOffset = (firstDay === 0 ? -6 : 1) - firstDay;
    const mondayDate = new Date(startDate);
    mondayDate.setDate(mondayDate.getDate() + mondayOffset);
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(mondayDate);
      day.setDate(day.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const [currentWeek, setCurrentWeek] = useState(generateWeekDays(new Date()));

  // Hàm để chuyển sang tuần tiếp theo
  const goToNextWeek = () => {
    const newDate = new Date(currentWeek[0]);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentWeek(generateWeekDays(newDate));
  };

  // Hàm để quay lại tuần trước
  const goToPreviousWeek = () => {
    const newDate = new Date(currentWeek[0]);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentWeek(generateWeekDays(newDate));
  };

  // Hàm chọn ngày
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    const selectedDateString = date.toISOString().split('T')[0];
    setTheaters(sampleData[selectedDateString] || []);
    setSelectedShowtime(null);
    setSelectedSeats([]);
  };

  // Hàm chọn rạp
  const handleTheaterSelect = (theater) => {
    setSelectedTheater(theater);
    setExpandedTheater(expandedTheater === theater ? null : theater);
    setSelectedShowtime(null);
    setSelectedSeats([]);
  };

  const handleShowtimeSelect = (showtime) => {
    setSelectedShowtime(showtime);
    navigation.navigate('BookingSeats', { selectedShowtime: showtime, selectedTheater, movieTitle, moviePoster });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.header}>Chọn ngày chiếu</Text>
        <View style={styles.dateSelector}>
          <TouchableOpacity onPress={goToPreviousWeek}>
            <MaterialIcons name="keyboard-arrow-left" size={24} color="#FFD700" />
          </TouchableOpacity>
          {currentWeek.map((date, index) => (
            <TouchableOpacity 
              key={index} 
              onPress={() => handleDateSelect(date)}
              style={styles.dateItem}
            >
              <Text style={[styles.dayText, date.toDateString() === selectedDate.toDateString() && styles.selectedDay]}>
                {date.toLocaleDateString('en-GB', { weekday: 'short' })}
              </Text>
              <Text style={[styles.dateText, date.toDateString() === selectedDate.toDateString() && styles.selectedDate]}>
                {date.getDate()}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={goToNextWeek}>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="#FFD700" />
          </TouchableOpacity>
        </View>

        <Text style={styles.header}>Chọn rạp và khung giờ chiếu</Text>
        {theaters.length > 0 ? theaters.map((theater, index) => (
          <View key={index}>
            <TouchableOpacity 
              onPress={() => handleTheaterSelect(theater)}
              style={styles.theaterContainer}
            >
              <View style={styles.theaterRow}>
                <Text style={styles.theaterName}>{theater.theater}</Text>
                <MaterialIcons
                  name={expandedTheater === theater ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                  size={24}
                  color="#FFD700"
                />
              </View>
            </TouchableOpacity>

            {expandedTheater === theater && (
              <FlatList
                data={theater.showtimes}
                horizontal
                style={styles.showtimeRow}
                renderItem={({ item }) => (
                  <TouchableOpacity 
                    style={[styles.showtimeButton, selectedShowtime === item && styles.selectedShowtimeButton]}
                    onPress={() => {
                      setSelectedShowtime(item);
                      handleShowtimeSelect(item);
                    }}
                  >
                    <Text 
                      style={[styles.showtimeText, selectedShowtime === item]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            )}
          </View>
        )) : (
          <Text style={styles.noShowtimesText}>Không có rạp chiếu cho ngày này</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Booking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    padding: 10,
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    fontSize: 20,
    color: '#fff',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  dateItem: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  dayText: {
    fontSize: 16,
    color: '#fff',
  },
  dateText: {
    fontSize: 16,
    color: '#fff',
  },
  selectedDay: {
    fontWeight: 'bold',
  },
  selectedDate: {
    borderRadius: 15,
    borderWidth: 2,
    backgroundColor: '#FF0000',
    padding: 5,
  },
  theaterContainer: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#444',
    borderRadius: 5,
  },
  theaterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  theaterName: {
    fontSize: 18,
    color: '#fff',
    paddingVertical: 5,
  },
  showtimeRow: {
    marginVertical: 10,
  },
  showtimeButton: {
    padding: 10,
    backgroundColor: '#444',
    borderRadius: 5,
    marginRight: 10,
  },
  selectedShowtimeButton: {
    backgroundColor: '#FF0000',

  },
  showtimeText: {
    color: '#fff',
  },
  noShowtimesText: {
    color: '#fff',
  },
});