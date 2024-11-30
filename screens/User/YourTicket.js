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

const YourTicket = () => {
  const { userId } = useContext(AuthContext); // Lấy userId từ AuthContext
  const [tickets, setTickets] = useState([]); // Dữ liệu vé
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu

  // Gọi API để lấy thông tin vé
  useEffect(() => {
    if (!userId) {
      Alert.alert('Lỗi', 'Không tìm thấy thông tin người dùng!');
      return;
    }

    const fetchTickets = async () => {
      try {
        const response = await axios.get(`${API_URL}/tickets/${userId}`);
        setTickets(response.data); // Lưu dữ liệu vé vào state
      } catch (error) {
        console.error(error);
        Alert.alert('Lỗi', 'Không thể lấy thông tin vé!');
      } finally {
        setLoading(false); // Tắt trạng thái tải
      }
    };

    fetchTickets();
  }, [userId]);

  // Xử lý trạng thái vé
  const handleStatus = (status) => {
    if (!status || status === 'Đã hủy') {
      return 'Đã hủy';
    }
    return 'Đã xác nhận';
  };

  // Hiển thị thông tin vé
  const renderTicket = ({ item }) => (
    <TouchableOpacity style={styles.ticketItem}>
      <View>
        <View style={styles.decorDotLeft}></View>
        <View style={styles.decorDotRight}></View>
        <Text style={styles.ticketInfo}>🎬 Phim: {item.movie_title}</Text>
        <Text style={styles.ticketInfo}>📍 Rạp: {item.cinema_name}</Text>
        <Text style={styles.ticketInfo}>
          ⏰ Thời gian: {new Date(item.showtime).toLocaleString()}
        </Text>
        <Text style={styles.ticketInfo}>💺 Ghế: {item.seat_number}</Text>
        <Text style={styles.ticketInfo}>
          📜 Trạng thái: {handleStatus(item.status)}
        </Text>
        <Text style={styles.ticketInfo}>
          💵 Tổng tiền: {item.total_price?.toLocaleString() || 0} VNĐ
        </Text>
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
        keyExtractor={(item, index) => index.toString()} // Sử dụng index làm key
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
