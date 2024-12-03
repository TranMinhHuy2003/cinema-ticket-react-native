import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { format } from "date-fns";
import axios from 'axios';
import { API_URL } from '@env';
import { useFocusEffect } from '@react-navigation/native';

const ShowtimeManagementScreen = ({ route, navigation }) => {
  const { movie, movie_id } = route.params; // Nhận dữ liệu phim từ navigation
  const [cinemas, setCinemas] = useState([]);
  const [showtimes, setShowtimes] = useState();
  const [refresh, setRefresh] = useState(false);

  const fetchCinema = async () => {
    try {
      const response = await axios.get(`${API_URL}/cinemas`);
      setCinemas(response.data);
    } catch (error) {
      console.error("Failed to fetch cinema:", error);
    }
  };

  const fetchShowtimes = async () => {
    try {
      const response = await axios.get(`${API_URL}/movies/${movie_id}/showtimes`);
      setShowtimes(response.data);
    } catch (error) {
      console.error("Failed to fetch Showtimes:", error);
    }
  };

  useEffect(() => {
    fetchShowtimes();
    navigation.setOptions({
      title: `Suất chiếu của ${movie.title}`,
    });
  }, [movie.title, navigation, refresh]);
  
  useFocusEffect(
    useCallback(() => {
      fetchShowtimes(); // Cập nhật dữ liệu khi quay lại màn hình
      fetchCinema();
    }, [])
  );

  const handleDelete = (showtime_id) => {
    Alert.alert("Xác nhận", "Bạn có chắc chắn muốn xóa suất chiếu này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        onPress: () => {
          axios.delete(`${API_URL}/movies/${movie_id}/showtimes/${showtime_id}`)
          .then(() => {
            setRefresh(!refresh);
            alert('Xóa suất chiếu thành công!');
          })
          .catch(error => {
            console.error(error);
          });
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={showtimes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <View style={styles.showtimeItem}>
              <Text style={styles.showtimeText}>
                🕒 {format(item.start_time, "dd/MM/yyyy, HH:mm:ss")} -{" "}
                {format(item.end_time, "dd/MM/yyyy, HH:mm:ss")}
              </Text>
              <Text style={styles.showtimeText}>
                🎥 {item.cinema_name} - {item.hall_name}
              </Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => navigation.navigate('EditShowtimeScreen', { showtime_id: item.id, showtime: item, showtimes: showtimes, cinemas: cinemas, movie_id: movie.id, duration: movie.duration })}
                >
                  <Text style={styles.buttonText}>Chỉnh sửa</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(item.id)}
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
          duration: movie.duration, movie_id: movie.id, showtimes: showtimes, cinemas: cinemas
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
