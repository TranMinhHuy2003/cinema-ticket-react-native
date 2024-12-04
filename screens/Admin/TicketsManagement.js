import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Button, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { API_URL } from '@env';
import { SearchBar } from '@rneui/themed';

const TicketsManagement = ({ navigation }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = tickets.filter((ticket) =>
        ticket.movie_title.toLowerCase().includes(query.toLowerCase()) ||
        ticket.cinema_name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTickets(filtered);
    } else {
      setFilteredTickets(tickets);
    }
  };

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/tickets`);
      setTickets(response.data);
      setFilteredTickets(response.data);
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTickets(); // Cập nhật dữ liệu khi quay lại màn hình
    }, [])
  );

  const handleStatus = (status) => {
    if (status === 0) {
      return "Đã hủy";
    }
    return "Đã xác nhận";
  };

  const renderTicket = ({ item }) => (
    <TouchableOpacity style={styles.ticketItem} onPress={() => navigation.navigate('TicketDetail', { ticket: item, ticket_id: item.id })}>
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
      <SearchBar
        placeholder="Tìm kiếm vé..."
        onChangeText={handleSearch}
        value={searchQuery}
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInput}
        searchIcon={{color: '#ff0000'}}
        placeholderTextColor={'#f2f2f2'}
        inputStyle={{color: '#fff'}}
      />
      <FlatList
        data={filteredTickets}
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
  searchContainer: {
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    borderTopWidth: 0,
    marginBottom: 10
  },
  searchInput: {
    backgroundColor: "#575958",
  },
});

export default TicketsManagement;