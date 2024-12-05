import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env';

const TicketDetails = ({ ticket, onCancel, onTicketUpdated }) => {
  const handleCancelTicket = async () => {
    try {
      await axios.delete(`${API_URL}/tickets/${ticket.id}`);
      Alert.alert('Thành công', 'Vé đã được hủy thành công!');
      onCancel(); // Quay lại danh sách vé
      onTicketUpdated(); // Cập nhật lại danh sách vé
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi', 'Không thể hủy vé!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>🎬 Phim: {ticket.movie_title}</Text>
      <Text style={styles.label}>📍 Rạp: {ticket.cinema_name}</Text>
      <Text style={styles.label}>
        ⏰ Thời gian: {new Date(ticket.showtime).toLocaleString()}
      </Text>
      <Text style={styles.label}>💺 Ghế: {ticket.seat_number}</Text>
      <Text style={styles.label}>💵 Giá: {ticket.price?.toLocaleString()} VNĐ</Text>
      <TouchableOpacity style={styles.cancelButton} onPress={handleCancelTicket}>
        <Text style={styles.cancelButtonText}>Hủy vé</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={onCancel}>
        <Text style={styles.backButtonText}>Quay lại</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1e1e1e',
  },
  label: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  cancelButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#ff0000',
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  backButton: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#555',
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default TicketDetails;
