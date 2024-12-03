import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";
import { API_URL } from '@env';
import axios from "axios";
import { useFocusEffect } from '@react-navigation/native';

const CinemaManagementScreen = ({navigation}) => {
  const [cinema, setCinema] = useState([]);
  const [hallName, setHallName] = useState("");
  const [seatCapacity, setSeatCapacity] = useState("");
  const [selectedHallId, setSelectedHallId] = useState();
  const [refresh, setRefresh] = useState(false);

  const fetchCinema = async () => {
    try {
      const response = await axios.get(`${API_URL}/cinemas`);
      setCinema(response.data);
    } catch (error) {
      console.error("Failed to fetch cinema:", error);
    }
  };

  useEffect(() => {
    fetchCinema();
  }, [refresh]);

  useFocusEffect(
    useCallback(() => {
      fetchCinema(); // Cập nhật dữ liệu khi quay lại màn hình
    }, [])
  );

  const handleDelete = (cinema_id) => {
    Alert.alert("Xác nhận", "Bạn có chắc chắn muốn xóa rạp này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        onPress: () => {
          axios.delete(`${API_URL}/cinemas/${cinema_id}`)
          .then(() => {
            setRefresh(!refresh);
            alert('Xóa rạp thành công!');
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
        data={cinema}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.header}>{item.name}</Text>
            <Text style={styles.subHeader}>{item.location}</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={styles.editButton}
                onPress={() => navigation.navigate('EditCinema', { cinema: item, cinema_id: item.id })}
              >
                <Text style={styles.buttonText}>Chỉnh sửa</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => handleDelete(item.id)}
                style={styles.deleteButton}
              >
                <Text style={styles.buttonText}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddCinema')}
      >
        <Text style={styles.buttonText}>
          Thêm rạp chiếu mới
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1e1e1e'
  },
  listItem: {
    backgroundColor: '#575958',
    marginBottom: 10,
    borderRadius: 5,
    padding: 10,
    flex: 1,
    justifyContent: 'space-between'
  },
  header: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  subHeader: {
    color: '#fff',
    fontSize: 15,
    marginTop: 10
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
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
  addButton: {
    backgroundColor: "#ff0000",
    padding: 8,
    borderRadius: 4,
    padding: 16
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default CinemaManagementScreen;