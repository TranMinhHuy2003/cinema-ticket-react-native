import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { tickets } from './data';

const TicketsManagement = ({ navigation }) => {
  const handlePress = (ticket) => {
    navigation.navigate('TicketDetail', { ticket });
  };

  const handleStatus = (status) => {
    if (status === 0) {
      return "Đã hủy";
    }
    return "Đã xác nhận";
  };

  const renderTicket = ({ item }) => (
    <TouchableOpacity style={styles.ticketItem} onPress={() => handlePress(item)}>
      <View>
        <View style={{width: 20, height: 20, backgroundColor: '#1e1e1e', borderRadius: 100, position: "absolute", left: -35, top: -2}}></View>
        <View style={{width: 20, height: 20, backgroundColor: '#1e1e1e', borderRadius: 100, position: "absolute", left: -35, top: 28}}></View>
        <View style={{width: 20, height: 20, backgroundColor: '#1e1e1e', borderRadius: 100, position: "absolute", left: -35, top: 58}}></View>
        <View style={{width: 20, height: 20, backgroundColor: '#1e1e1e', borderRadius: 100, position: "absolute", right: -25, top: -2}}></View>
        <View style={{width: 20, height: 20, backgroundColor: '#1e1e1e', borderRadius: 100, position: "absolute", right: -25, top: 28}}></View>
        <View style={{width: 20, height: 20, backgroundColor: '#1e1e1e', borderRadius: 100, position: "absolute", right: -25, top: 58}}></View>
      </View>
      <Text style={styles.movieName}>{item.movie_title}</Text>
      <Text style={styles.text}>Rạp: {item.cinema_name}</Text>
      <Text style={styles.text}>Ghế: {item.seat_number}</Text>
      <Text style={styles.text}>Trạng thái: {handleStatus(item.status)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tickets}
        keyExtractor={(item, index) => item + index}
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
  text: {
    color: '#000',
    fontSize: 15
  },
  ticketItem: {
    padding: 15,
    paddingLeft: 25,
    backgroundColor: '#ffe6a9',
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
  },
  movieName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000'
  },
});

export default TicketsManagement;