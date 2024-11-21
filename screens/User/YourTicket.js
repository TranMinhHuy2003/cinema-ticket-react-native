import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { users } from '../Admin/data'; // Import dữ liệu user

const YourTicket = ({ navigation }) => {
  const { userRole } = useContext(AuthContext);

  // Lấy thông tin user từ danh sách dựa trên vai trò
  const user = users.find((u) => u.role === userRole);

  const handlePress = (ticket) => {
    console.log(ticket);
  };

  const handleStatus = (status) => {
    if (status === 0 || status === 'Đã hủy') {
      return 'Đã hủy';
    }
    return 'Đã xác nhận';
  };

  const renderTicket = ({ item }) => (
    <TouchableOpacity style={styles.ticketItem} onPress={() => handlePress(item)}>
      <View>
        {/* Các điểm trang trí tương tự TicketsManagement */}
        <View style={styles.decorDotLeft}></View>
        <View style={styles.decorDotRight}></View>
        <Text style={styles.ticketInfo}>🎬 Phim: {item.movie_title}</Text>
        <Text style={styles.ticketInfo}>📍 Rạp: {item.cinema_name}</Text>
        <Text style={styles.ticketInfo}>⏰ Thời gian: {new Date(item.showtime).toLocaleString()}</Text>
        <Text style={styles.ticketInfo}>💺 Ghế: {item.seat_number}</Text>
        <Text style={styles.ticketInfo}>📜 Trạng thái: {handleStatus(item.status)}</Text>
        <Text style={styles.ticketInfo}>💵 Tổng tiền: {item.totalPrice || 0} VNĐ</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={user.booking}
        keyExtractor={(item) => item.bookingId}
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
});

export default YourTicket;
