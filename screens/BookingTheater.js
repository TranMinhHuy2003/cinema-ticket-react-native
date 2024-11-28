import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView, } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { API_URL } from '@env';

// Hàm tạo các ngày trong tuần từ thứ Hai đến Chủ Nhật
const generateWeekDays = (startDate) => {
  const days = [];
  const currentDate = new Date(startDate);
  const day = currentDate.getDay();

  // Tìm ngày thứ Hai của tuần hiện tại
  const mondayOffset = day === 0 ? -6 : 1 - day; // Nếu Chủ Nhật (0), lùi 6 ngày
  const mondayDate = new Date(currentDate);
  mondayDate.setDate(currentDate.getDate() + mondayOffset);

  for (let i = 0; i < 7; i++) {
    const day = new Date(mondayDate);
    day.setDate(mondayDate.getDate() + i);
    days.push(day);
  }

  return days;
};

const Booking = ({ route, navigation }) => {
  const { movieId, movieTitle, moviePoster } = route.params;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(generateWeekDays(new Date()));
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());
  const [theaters, setTheaters] = useState({});
  const [expandedTheater, setExpandedTheater] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);

  // Chuyển sang tuần tiếp theo
  const goToNextWeek = () => {
    const newDate = new Date(currentWeek[0]); // Lấy ngày thứ Hai hiện tại
    newDate.setDate(newDate.getDate() + 7); // Thêm 7 ngày
    setCurrentWeek(generateWeekDays(newDate)); // Tạo tuần mới từ ngày mới
    setSelectedDate(newDate); // Cập nhật ngày được chọn là thứ Hai tuần mới
  };

  // Quay lại tuần trước
  const goToPreviousWeek = () => {
    const newDate = new Date(currentWeek[0]); // Lấy ngày thứ Hai hiện tại
    newDate.setDate(newDate.getDate() - 7); // Trừ 7 ngày
    setCurrentWeek(generateWeekDays(newDate)); // Tạo tuần mới từ ngày mới
    setSelectedDate(newDate); // Cập nhật ngày được chọn là thứ Hai tuần trước
  };

  // Định dạng dữ liệu phim
  const formatMovieData = (data) => {
    if (!data.showtimes || typeof data.showtimes !== 'object') {
      console.error('Invalid showtimes data:', data.showtimes);
      return { showtimes: [] };
    }

    const formattedShowtimes = Object.entries(data.showtimes).map(([id, showtime]) => {
      const startTime = new Date(showtime.start_time);

      const localDate = new Date(startTime.getTime() - startTime.getTimezoneOffset() * 60000).toISOString().split('T')[0];
  
      // Kiểm tra xem startTime có hợp lệ không
      if (isNaN(startTime)) {
        console.error(`Invalid start_time value for showtime ${id}:`, showtime.start_time);
        return null; // Hoặc có thể tiếp tục với giá trị mặc định nếu cần
      }
  
      return {
        id,
        date: localDate,
        cinemaName: showtime.cinema.cinema_name,
        hallName: showtime.cinema.hall_name,
        startTimeOriginal: showtime.start_time,
        startTime: startTime.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }),
      };
    }).filter(showtime => showtime !== null); // Lọc bỏ các showtime bị lỗi  

    return {
      showtimes: formattedShowtimes,
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://192.168.0.103:8000/movies/${movieId}`);
        const formattedData = formatMovieData(response.data);

        // Nhóm dữ liệu theo rạp và ngày
        const groupedTheaters = formattedData.showtimes.reduce((acc, showtime) => {
          const date = showtime.date;
          const cinemaName = showtime.cinemaName;

          if (!acc[date]) {
            acc[date] = {};
          }
          if (!acc[date][cinemaName]) {
            acc[date][cinemaName] = [];
          }
          // Lưu cả startTime và hallName
          acc[date][cinemaName].push({
            id: showtime.id,
            startTimeOriginal: showtime.startTimeOriginal,
            startTime: showtime.startTime,
            hallName: showtime.hallName,
          });

          return acc;
        }, {});

        setTheaters(groupedTheaters);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchData();
  }, [movieId]);

  // Chọn ngày
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setCurrentMonth(date.getMonth() + 1); // Lấy số tháng và thêm 1
    setCurrentYear(date.getFullYear());
    setExpandedTheater(null);
    setSelectedShowtime(null);
  };

  // Chọn rạp
  const handleTheaterSelect = (cinemaName) => {
    setExpandedTheater(expandedTheater === cinemaName ? null : cinemaName);
    setSelectedShowtime(null);
  };

  // Chọn suất chiếu
  const handleShowtimeSelect = (showtime) => {
    setSelectedShowtime(showtime);
    navigation.navigate('BookingSeats', {
      selectedDate: selectedDate.toISOString(),
      originShowtime: showtime.startTimeOriginal,
      selectedTheater: expandedTheater,
      selectedShowtime: showtime.startTime,
      selectedHall: showtime.hallName,
      movieTitle,
      moviePoster,
      movieId,
      showtimeId: showtime.id,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.header}>Chọn ngày chiếu</Text>
          <Text style={styles.monthText}>Tháng {currentMonth}, {currentYear}</Text>
        </View>
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
              <Text
                style={[
                  styles.dayText,
                  date.toDateString() === selectedDate.toDateString() && styles.selectedDay,
                ]}
              >
                {date.toLocaleDateString('en-GB', { weekday: 'short' })}
              </Text>
              <Text
                style={[
                  styles.dateText,
                  date.toDateString() === selectedDate.toDateString() && styles.selectedDate,
                ]}
              >
                {date.getDate()}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={goToNextWeek}>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="#FFD700" />
          </TouchableOpacity>
        </View>

        <Text style={styles.header}>Chọn rạp và khung giờ chiếu</Text>
        {theaters[selectedDate.toISOString().split('T')[0]] ? (
          Object.entries(theaters[selectedDate.toISOString().split('T')[0]]).map(
            ([cinemaName, showtimes], index) => (
              <View key={index}>
                <TouchableOpacity
                  onPress={() => handleTheaterSelect(cinemaName)}
                  style={styles.theaterContainer}
                >
                  <View style={styles.theaterRow}>
                    <Text style={styles.theaterName}>{cinemaName}</Text>
                    <MaterialIcons
                      name={
                        expandedTheater === cinemaName
                          ? 'keyboard-arrow-up'
                          : 'keyboard-arrow-down'
                      }
                      size={24}
                      color="#FFD700"
                    />
                  </View>
                </TouchableOpacity>

                {expandedTheater === cinemaName && (
                  <FlatList
                    data={showtimes}
                    horizontal
                    style={styles.showtimeRow}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={[
                          styles.showtimeButton,
                          selectedShowtime === item && styles.selectedShowtimeButton,
                        ]}
                        onPress={() => handleShowtimeSelect(item)}
                      >
                        <Text
                          style={[
                            styles.showtimeText,
                            selectedShowtime === item && styles.selectedShowtimeText,
                          ]}
                        >
                          {item.startTime}
                        </Text>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                  />
                )}
              </View>
            )
          )
        ) : (
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },  
  header: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  monthText: {
    fontSize: 16,
    color: '#fff',
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
  selectedShowtimeText: {
    fontWeight: 'bold',
  },
  noShowtimesText: {
    color: '#aaa',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});
