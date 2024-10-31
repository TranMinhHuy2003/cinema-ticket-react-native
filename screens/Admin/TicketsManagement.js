import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { tickets } from './data';
import { format } from 'date-fns';

const TicketsManagement = () => {
  const renderTicketItem = ({ item }) => {
    const formattedShowtime = format(new Date(item.showtime), "dd-MM-yyyy 'lúc' HH:mm");

    return (
      <View style={styles.ticketItem}>
        <Text style={styles.text}>Phim: {item.movie_title}</Text>
        <Text style={styles.text}>Rạp: {item.cinema_name}</Text>
        <Text style={styles.text}>Thời gian chiếu: {formattedShowtime}</Text>
        <Text style={styles.text}>Ghế: {item.seat_number}</Text>
        <Text style={styles.text}>Trạng thái: {item.status}</Text>
        <Text style={styles.text}>Giá: {item.price}</Text>
        <View style={styles.buttonContainer}>
        <Button
          title="Xóa"
          onPress={() => deleteTicket(item.id)}
          color={item.status === 'Đã hủy' ? 'red' : 'gray'}
          disabled={item.status !== 'Đã hủy'}
        />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tickets}
        keyExtractor={(item, index) => item + index}
        renderItem={renderTicketItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1e1e1e'
  },
  text: {
    color: '#fff',
    marginBottom: 10
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  ticketItem: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#575958',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TicketsManagement;
