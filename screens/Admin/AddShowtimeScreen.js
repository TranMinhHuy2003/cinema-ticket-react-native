import React, { useState, useCallback } from "react";
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
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const AddShowtimeScreen = ({ navigation, route }) => {
  const { cinemas, onAddShowtime } = route.params;

  const [selectedCinema, setSelectedCinema] = useState("");
  const [selectedHall, setSelectedHall] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(
    new Date(new Date().getTime() + 2 * 60 * 60 * 1000)
  );
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const onStartTimeChange = useCallback(
    (params) => {
      setShowStartPicker(false);
      setStartTime(params.date);
    },
  );

  const onEndTimeChange = useCallback(
    (params) => {
      setShowEndPicker(false);
      setEndTime(params.date);
    },
  );

  // Hàm xử lý khi nhấn thêm
  const handleAdd = () => {
    if (!selectedCinema || !selectedHall) {
      Alert.alert("Lỗi", "Vui lòng chọn rạp phim và phòng chiếu.");
      return;
    }

    if (new Date(startTime).toISOString() >= new Date(endTime).toISOString()) {
      Alert.alert("Lỗi", "Thời gian bắt đầu phải trước thời gian kết thúc.");
      return;
    }

    const hallDetails = cinemas[selectedCinema].halls[selectedHall];

    // Tạo showtime mới
    const newShowtime = {
      start_time: startTime,
      end_time: endTime,
      cinema: {
        cinema_name: cinemas[selectedCinema].name,
        location: cinemas[selectedCinema].location,
        hall_name: hallDetails.name,
        seat_capacity: hallDetails.seat_capacity,
      },
      seats: [
        { seat: "A1", available: true, type: "normal" },
        { seat: "A2", available: true, type: "vip" },
      ],
    };

    // Truyền về màn hình trước
    onAddShowtime(newShowtime);
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
          setSelectedHall(""); // Reset phòng chiếu khi thay đổi rạp
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
      {selectedCinema ? (
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
            <Picker.Item label="Chọn phòng chiếu" value="" />
            {Object.entries(cinemas[selectedCinema].halls).map(
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
          value={format(startTime, "dd/MM/yyyy, H:mm:ss")}
          editable={false}
        />
        <Ionicons
          name="calendar-outline"
          size={20}
          onPress={() => setShowStartPicker(true)}
          style={{ color: 'red', position: 'absolute', top: 45, right: 15 }}
        />
        {showStartPicker && (
          <ScrollView horizontal={true} style={{display: 'flex', flexDirection: 'column'}}>
            <DateTimePicker
              date={startTime}
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
          value={format(endTime, "dd/MM/yyyy, H:mm:ss")}
          editable={false}
        />
        <Ionicons
          name="calendar-outline"
          size={20}
          onPress={() => setShowEndPicker(true)}
          style={{ color: 'red', position: 'absolute', top: 45, right: 15 }}
        />
        {showEndPicker && (
          <ScrollView horizontal={true} style={{display: 'flex', flexDirection: 'column'}}>
            <DateTimePicker
              date={endTime}
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
              onChange={onEndTimeChange}
            />
          </ScrollView>
        )}
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
