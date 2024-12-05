import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { API_URL } from '@env';
import TicketDetails from './TicketDetails'; // Import TicketDetails

const YourTicket = () => {
  const { userId } = useContext(AuthContext); // Lấy userId từ AuthContext
  const [tickets, setTickets] = useState([]); // Dữ liệu vé
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [selectedTicket, setSelectedTicket] = useState(null); // Quản lý vé được chọn

  // Gọi API để lấy thông tin vé
  const fetchTickets = async () => {
    setLoading(true); // Hiển thị trạng thái loading
    try {
      const response = await axios.get(`${API_URL}/tickets/${userId}`);
      setTickets(response.data); // Lưu dữ liệu vé vào state
    } catch (error) {

      
      console.error(error);
      Alert.alert('Lỗi', 'Không thể lấy thông tin vé!');
    } finally {
      setLoading(false); // Tắt trạng thái loading
    }
  };

  useEffect(() => {
    if (!userId) {
      Alert.alert('Lỗi', 'Không tìm thấy thông tin người dùng!');
      return;
    }

    fetchTickets(); // Lấy danh sách vé ngay khi load
  }, [userId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ff0000" />
      </View>
    );
  }

  if (selectedTicket) {
    // Nếu đã chọn vé, hiển thị màn hình chi tiết
    return (
      <TicketDetails
        ticket={selectedTicket}
        onCancel={() => setSelectedTicket(null)} // Quay lại danh sách vé
        onTicketUpdated={fetchTickets} // Cập nhật danh sách vé sau khi hủy
      />
    );
  }

  if (tickets.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noTicketText}>Bạn chưa có vé nào!</Text>
      </View>
    );
  }

  // Hiển thị thông tin vé
  const renderTicket = ({ item }) => (
    <TouchableOpacity
      style={styles.ticketItem}
      onPress={() => setSelectedTicket(item)} // Lưu vé được chọn
    >
      <View>
        <View style={styles.decorDotLeft}></View>
        <View style={styles.decorDotRight}></View>
        <Text style={styles.ticketInfo}>🎬 Phim: {item.movie_title}</Text>
        <Text style={styles.ticketInfo}>📍 Rạp: {item.cinema_name}</Text>
        <Text style={styles.ticketInfo}>
          ⏰ Thời gian: {new Date(item.showtime).toLocaleString()}
        </Text>
        <Text style={styles.ticketInfo}>💺 Ghế: {item.seat_number}</Text>
        <Text style={styles.ticketInfo}>💵 Giá: {item.price?.toLocaleString()} VNĐ</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ff0000" />
      </View>
    );
  }

  if (tickets.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noTicketText}>Bạn chưa có vé nào!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={tickets}
        keyExtractor={(item) => item.id} // Sử dụng ticket ID làm key
        renderItem={renderTicket}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#1e1e1e',
  },
  ticketItem: {
    padding: 15,
    paddingLeft: 25,
    backgroundColor: '#ffe6a9',
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
    position: 'relative',
  },
  ticketInfo: {
    color: '#000',
    fontSize: 15,
    marginBottom: 5,
  },
  decorDotLeft: {
    width: 20,
    height: 20,
    backgroundColor: '#1e1e1e',
    borderRadius: 100,
    position: 'absolute',
    left: -35,
    top: 28,
  },
  decorDotRight: {
    width: 20,
    height: 20,
    backgroundColor: '#1e1e1e',
    borderRadius: 100,
    position: 'absolute',
    right: -25,
    top: 28,
  },
  noTicketText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default YourTicket;
