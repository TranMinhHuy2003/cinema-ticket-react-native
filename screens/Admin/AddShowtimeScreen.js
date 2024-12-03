import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView
} from "react-native";
import { format } from "date-fns";
import DateTimePicker from 'react-native-ui-datepicker';
import { Picker } from "@react-native-picker/picker";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { API_URL } from '@env';
import { LogBox } from 'react-native';
import axios from "axios";

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const AddShowtimeScreen = ({ navigation, route }) => {
  const { movie_id, duration, showtimes, cinemas } = route.params;
  const [start_time, setStartTime] = useState(new Date());
  const [end_time, setEndTime] = useState(
    new Date(new Date().getTime() + duration * 60 * 1000)
  );
  const [hall_name, setHallName] = useState("");
  const [cinema_name, setCinemaName] = useState("");
  const [showStartPicker, setShowStartPicker] = useState(false);

  const onStartTimeChange = (params) => {
    const startDay = new Date(params.date);
    setStartTime(startDay.toISOString());
    setEndTime(new Date(startDay.setMinutes(startDay.getMinutes() + duration)));
  };

  function generateSeats() {
    const rows = 8; // Số hàng ghế (A, B, ..., H)
    const seatsPerRow = 10; // Số ghế mỗi hàng
    const newSeats = [];
  
    for (let row = 0; row < rows; row++) {
      const rowLetter = String.fromCharCode(65 + row); // Chuyển số thành chữ cái (A, B, C,...)
      for (let seatNumber = 1; seatNumber <= seatsPerRow; seatNumber++) {
        const isVip = row >= 5 && row <= 7 && seatNumber <= 10; // F, G, H và ghế từ 1 đến 8 là vip
        newSeats.push({
          seat: `${rowLetter}${seatNumber}`, // Ví dụ: A1, A2,...
          available: true, // Mặc định ghế trống
          type: isVip ? "vip" : "normal", // Phân loại ghế
        });
      }
    }
  
    return newSeats;
  }

  const handleAdd = () => {
    if (!cinema_name || !hall_name) {
      Alert.alert("Lỗi", "Vui lòng chọn rạp phim và phòng chiếu.");
      return;
    }

    if (new Date(start_time).toISOString() < new Date().toISOString()){
      Alert.alert("Lỗi", "Thời gian bắt đầu và thời gian kết thúc phải sau thời điểm hiện tại.");
      return;
    }

    if (new Date(start_time).toISOString() >= new Date(end_time).toISOString()) {
      Alert.alert("Lỗi", "Thời gian bắt đầu phải trước thời gian kết thúc.");
      return;
    }

    for (let i = 0; i < showtimes.length; i++) {
      if ((new Date(start_time).toISOString() >= new Date(showtimes[i].start_time).toISOString()) && (new Date(start_time).toISOString() <= new Date(showtimes[i].end_time).toISOString()) && (cinemas[cinema_name].name === showtimes[i].cinema_name) && (cinemas[cinema_name].halls[hall_name].name === showtimes[i].hall_name)) {
        Alert.alert("Lỗi", "Suất chiếu bị trùng với suất chiếu đã tồn tại!");
        return;
      }
    }

    axios.post(`${API_URL}/movies/${movie_id}/showtimes`, {
      start_time,
      end_time,
      cinema_name: cinemas[cinema_name].name,
      hall_name: cinemas[cinema_name].halls[hall_name].name,
      location: cinemas[cinema_name].location,
      seats: generateSeats()
    })
    .then(() => {
      alert('Suất chiếu đã được thêm thành công!');
      navigation.goBack();
    })
    .catch(error => {
      if (error.response && error.response.status === 400) {
        Alert.alert("Error", "Suất chiếu bị trùng với suất chiếu đã tồn tại!");
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Chọn rạp */}
      <Text style={styles.label}>Chọn Rạp Phim</Text>
      <Picker
        selectedValue={cinema_name}
        onValueChange={(itemValue) => {
          setCinemaName(itemValue);
          setHallName(""); // Reset phòng chiếu khi thay đổi rạp
        }}
        style={styles.picker}
        itemStyle={{
          fontSize: 18,
          color: "#fff",
        }}
      >
        <Picker.Item label="Chọn rạp" value="" />
        {Object.keys(cinemas).map((cinemaId) => (
          <Picker.Item
            key={cinemaId}
            label={cinemas[cinemaId].name}
            value={cinemaId}
          />
        ))}
      </Picker>

      {/* Chọn phòng chiếu */}
      {cinema_name ? (
        <>
          <Text style={styles.label}>Chọn Phòng Chiếu</Text>
          <Picker
            selectedValue={hall_name}
            onValueChange={(itemValue) => setHallName(itemValue)}
            style={styles.picker}
            itemStyle={{
              fontSize: 18,
              color: "#fff",
            }}
          >
            <Picker.Item label="Chọn phòng chiếu" value="" />
            {Object.entries(cinemas[cinema_name].halls).map(
              ([hallId, hall]) => (
                <Picker.Item key={hallId} label={hall.name} value={hallId} />
              )
            )}
          </Picker>
        </>
      ) : null}

      {/* Chọn giờ bắt đầu */}
      <View>
        <Text style={styles.label}>Giờ Bắt Đầu</Text>
        <TextInput
          style={styles.input}
          value={format(start_time, "dd/MM/yyyy, H:mm:ss")}
          editable={false}
        />
        <Ionicons
          name="calendar-outline"
          size={20}
          onPress={() => setShowStartPicker(!showStartPicker)}
          style={{ color: 'red', position: 'absolute', top: 45, right: 15 }}
        />
        {showStartPicker && (
          <ScrollView horizontal={true} style={{display: 'flex', flexDirection: 'column'}}>
            <DateTimePicker
              date={start_time}
              timePicker
              mode="single"
              monthContainerStyle={{backgroundColor: '#575958'}}
              yearContainerStyle={{backgroundColor: '#575958'}}
              calendarTextStyle={{color: '#fff'}}
              headerTextStyle={{color: '#fff'}}
              weekDaysTextStyle={{color: '#fff'}}
              headerButtonColor='#fff'
              selectedItemColor='#ff0000'
              timePickerTextStyle={{color: '#fff'}}
              timePickerIndicatorStyle={{backgroundColor: '#ff0000'}}
              dayContainerStyle={{backgroundColor: '#575958'}}
              onChange={onStartTimeChange}
            />
          </ScrollView>
        )}
      </View>

      {/* Chọn giờ kết thúc */}
      <View>
        <Text style={styles.label}>Giờ Kết Thúc</Text>
        <TextInput
          style={styles.input}
          value={format(end_time, "dd/MM/yyyy, H:mm:ss")}
          editable={false}
        />
      </View>

      {/* Nút thêm */}
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.buttonText}>Thêm</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#1e1e1e",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#fff',
    fontWeight: 'bold'
  },
  picker: {
    backgroundColor: "#575958",
    borderRadius: 8,
    marginBottom: 16
  },
  input: {
    backgroundColor: "#575958",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 20,
    marginBottom: 16,
    color: '#fff'
  },
  addButton: {
    backgroundColor: "#ff0000",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 26,
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AddShowtimeScreen;
