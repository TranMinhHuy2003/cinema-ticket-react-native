import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { format } from "date-fns";
import DateTimePicker from "react-native-ui-datepicker";
import { Picker } from "@react-native-picker/picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const EditShowtimeScreen = ({ navigation, route }) => {
  const { cinemas, showtime, onUpdateShowtime } = route.params;

  const initialCinemaIndex = cinemas.findIndex(
    (cinema) => cinema.name === showtime.cinema.cinema_name
  );
  const initialHallIndex = initialCinemaIndex !== -1
    ? cinemas[initialCinemaIndex].halls.findIndex(
        (hall) => hall.name === showtime.cinema.hall_name
      )
    : -1;

  const [selectedCinema, setSelectedCinema] = useState(initialCinemaIndex);
  const [selectedHall, setSelectedHall] = useState(initialHallIndex);
  const [startTime, setStartTime] = useState(new Date(showtime.start_time));
  const [endTime, setEndTime] = useState(new Date(showtime.end_time));
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const onStartTimeChange = useCallback((params) => {
    setShowStartPicker(false);
    setStartTime(params.date);
  });

  const onEndTimeChange = useCallback((params) => {
    setShowEndPicker(false);
    setEndTime(params.date);
  });

  const handleUpdate = () => {
    if (selectedCinema === -1 || selectedHall === -1) {
      Alert.alert("Lỗi", "Vui lòng chọn rạp phim và phòng chiếu.");
      return;
    }

    if (new Date(startTime).toISOString() >= new Date(endTime).toISOString()) {
      Alert.alert("Lỗi", "Thời gian bắt đầu phải trước thời gian kết thúc.");
      return;
    }

    const updatedCinema = cinemas[selectedCinema];
    const updatedHall = updatedCinema.halls[selectedHall];

    const updatedShowtime = {
      start_time: startTime,
      end_time: endTime,
      cinema: {
        cinema_name: updatedCinema.name,
        location: updatedCinema.location,
        hall_name: updatedHall.name,
        seat_capacity: updatedHall.seat_capacity,
      },
      seats: showtime.seats, // Giữ nguyên danh sách ghế
    };

    // Gọi callback để cập nhật
    onUpdateShowtime(updatedShowtime);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      {/* Chọn rạp */}
      <Text style={styles.label}>Chọn Rạp Phim</Text>
      <Picker
        selectedValue={selectedCinema}
        onValueChange={(itemValue) => {
          setSelectedCinema(itemValue);
          setSelectedHall(-1); // Reset phòng chiếu khi thay đổi rạp
        }}
        style={styles.picker}
        itemStyle={{
          fontSize: 18,
          color: "#fff",
        }}
      >
        <Picker.Item label="Chọn rạp" value={-1} />
        {cinemas.map((cinema, index) => (
          <Picker.Item key={index} label={cinema.name} value={index} />
        ))}
      </Picker>

      {/* Chọn phòng chiếu */}
      {selectedCinema !== -1 && (
        <>
          <Text style={styles.label}>Chọn Phòng Chiếu</Text>
          <Picker
            selectedValue={selectedHall}
            onValueChange={(itemValue) => setSelectedHall(itemValue)}
            style={styles.picker}
            itemStyle={{
              fontSize: 18,
              color: "#fff",
            }}
          >
            <Picker.Item label="Chọn phòng chiếu" value={-1} />
            {cinemas[selectedCinema].halls.map((hall, index) => (
              <Picker.Item key={index} label={hall.name} value={index} />
            ))}
          </Picker>
        </>
      )}

      {/* Chọn giờ bắt đầu */}
      <View>
        <Text style={styles.label}>Giờ Bắt Đầu</Text>
        <TextInput
          style={styles.input}
          value={format(startTime, "dd/MM/yyyy, H:mm:ss")}
          editable={false}
        />
        <Ionicons
          name="calendar-outline"
          size={20}
          onPress={() => setShowStartPicker(true)}
          style={{ color: "red", position: "absolute", top: 45, right: 15 }}
        />
        {showStartPicker && (
          <ScrollView horizontal={true} style={{ display: "flex", flexDirection: "column" }}>
            <DateTimePicker
              date={startTime}
              timePicker
              mode="single"
              monthContainerStyle={{ backgroundColor: "#575958" }}
              yearContainerStyle={{ backgroundColor: "#575958" }}
              calendarTextStyle={{ color: "#fff" }}
              headerTextStyle={{ color: "#fff" }}
              weekDaysTextStyle={{ color: "#fff" }}
              headerButtonColor="#fff"
              selectedItemColor="#ff0000"
              timePickerTextStyle={{ color: "#fff" }}
              timePickerIndicatorStyle={{ backgroundColor: "#ff0000" }}
              dayContainerStyle={{ backgroundColor: "#575958" }}
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
          value={format(endTime, "dd/MM/yyyy, H:mm:ss")}
          editable={false}
        />
        <Ionicons
          name="calendar-outline"
          size={20}
          onPress={() => setShowEndPicker(true)}
          style={{ color: "red", position: "absolute", top: 45, right: 15 }}
        />
        {showEndPicker && (
          <ScrollView horizontal={true} style={{ display: "flex", flexDirection: "column" }}>
            <DateTimePicker
              date={endTime}
              timePicker
              mode="single"
              monthContainerStyle={{ backgroundColor: "#575958" }}
              yearContainerStyle={{ backgroundColor: "#575958" }}
              calendarTextStyle={{ color: "#fff" }}
              headerTextStyle={{ color: "#fff" }}
              weekDaysTextStyle={{ color: "#fff" }}
              headerButtonColor="#fff"
              selectedItemColor="#ff0000"
              timePickerTextStyle={{ color: "#fff" }}
              timePickerIndicatorStyle={{ backgroundColor: "#ff0000" }}
              dayContainerStyle={{ backgroundColor: "#575958" }}
              onChange={onEndTimeChange}
            />
          </ScrollView>
        )}
      </View>

      {/* Nút lưu */}
      <TouchableOpacity style={styles.addButton} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Cập nhật</Text>
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
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#fff",
    fontWeight: "bold",
  },
  picker: {
    backgroundColor: "#575958",
    borderRadius: 8,
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#575958",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 20,
    marginBottom: 16,
    color: "#fff",
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

export default EditShowtimeScreen;
