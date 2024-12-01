import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { cinemas } from './data'
import { API_URL } from '@env';

const ShowtimeManagementScreen = ({ route, navigation }) => {
  const { movie } = route.params; // Nhận dữ liệu phim từ navigation
  const [showtimes, setShowtimes] = useState(movie.showtimes);
  
  useEffect(() => {
    navigation.setOptions({
      title: `Suất chiếu của ${movie.title}`,
    });
  }, [movie.title, navigation]);
  // Hàm xóa showtime
  const handleDeleteShowtime = (id) => {
    Alert.alert("Xác nhận", "Bạn có chắc chắn muốn xóa showtime này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        onPress: () => {
          const updatedShowtimes = { ...showtimes };
          delete updatedShowtimes[id];
          setShowtimes(updatedShowtimes);
        },
      },
    ]);
  };

  // Hàm chỉnh sửa showtime
  const onUpdateShowtime = (updatedShowtime) => {
    setShowtimes((prevShowtimes) =>
      prevShowtimes.map((showtime) =>
        showtime.start_time === updatedShowtime.start_time &&
        showtime.cinema.cinema_name === updatedShowtime.cinema.cinema_name &&
        showtime.cinema.hall_name === updatedShowtime.cinema.hall_name
          ? updatedShowtime // Thay thế showtime được chỉnh sửa
          : showtime
      )
    );
    Alert.alert("Thông báo", "Cập nhật suất chiếu thành công!");
  };

  const navigateToEditScreen = (showtime) => {
    navigation.navigate("EditShowtimeScreen", {
      showtime,
      cinemas,
      onUpdateShowtime,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.entries(showtimes)}
        keyExtractor={(item) => item[0]}
        renderItem={({ item }) => {
          const [id, showtime] = item;
          return (
            <View style={styles.showtimeItem}>
              <Text style={styles.showtimeText}>
                🕒 {new Date(showtime.start_time).toLocaleString()} -{" "}
                {new Date(showtime.end_time).toLocaleString()}
              </Text>
              <Text style={styles.showtimeText}>
                🎥 {showtime.cinema.cinema_name} - {showtime.cinema.hall_name}
              </Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.editButton}
                  // onPress={() => navigation.navigate('EditShowtimeScreen', { showtime: item })}
                  onPress={() => navigateToEditScreen(showtime)}
                >
                  <Text style={styles.buttonText}>Chỉnh sửa</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteShowtime(id)}
                >
                  <Text style={styles.buttonText}>Xóa</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />

      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => navigation.navigate("AddShowtimeScreen", {
          cinemas,
          onAddShowtime: (newShowtime) => {
            const newId = `showtime_${Date.now()}`;
            setShowtimes((prev) => ({
              ...prev,
              [newId]: newShowtime,
            }));
          },
        })}
      >
        <Text style={styles.buttonText}>Thêm suất chiếu mới</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#1e1e1e",
  },
  showtimeItem: {
    backgroundColor: "#575958",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  showtimeText: {
    fontSize: 14,
    marginBottom: 4,
    color: '#fff'
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  editButton: {
    backgroundColor: "#007bff",
    padding: 8,
    borderRadius: 4,
  },
  deleteButton: {
    backgroundColor: "#ff0000",
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#ff0000",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
});

export default ShowtimeManagementScreen;
