import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, Image } from 'react-native';
import { format } from 'date-fns';
import axios from 'axios';
import { API_URL } from '@env';

export default function TicketDetailsScreen ({ route, navigation }) {
  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);

  const handleStatus = (status) => {
    if (status === 0) {
      return "Đã hủy";
    }
    return "Đã xác nhận";
  };

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`${API_URL}/movies`);
      setMovies(response.data);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    }
  };
  
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };
  
  useEffect(() => {
    fetchMovies();
    fetchUsers();
  }, []);
  const { ticket, ticket_id } = route.params;

  const getUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : "Unknown User";
  };

  const getPosterURL = (movieName) => {
    const movie = movies.find((movie) => movie.title === movieName);
    return movie ? movie.posterUrl : "URL not found";
  };

  const handleDelete = () => {
    Alert.alert("Xác nhận", "Bạn có chắc chắn muốn xóa vé này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        onPress: () => {
          axios.delete(`${API_URL}/tickets/${ticket_id}`, {
          })
          .then(() => {
            alert('Xóa vé thành công!');
            navigation.goBack();
          })
          .catch(error => {
            console.error(error);
          });
        }
      },
    ]);
  };

  const formattedShowtime = format(new Date(ticket.showtime), "dd-MM-yyyy 'lúc' HH:mm");

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <View>
          <Image
            source={{ uri: getPosterURL(ticket.movie_title) }}
            style={styles.posterImage}
          />
        </View>
        <View style={{width: 170}}>
          <Text style={[styles.text, {fontSize: 20, fontWeight: 'bold'}]}>{ticket.movie_title}</Text>
          <Text style={styles.text}>Rạp: {ticket.cinema_name}</Text>
          <Text style={styles.text}>Giá vé: {ticket.price}</Text>
          <Text style={styles.text}>Số ghế: {ticket.seat_number}</Text>
          <Text style={styles.text}>Người đặt: {getUserName(ticket.user_id)}</Text>
          <Text style={styles.text}>Thời gian chiếu: {formattedShowtime}</Text>
          <Text style={styles.text}>Trạng thái: {handleStatus(ticket.status)}</Text>
        </View>
      </View>
      <View style={{backgroundColor: '#1e1e1e', paddingBottom: 50}}>
        <Button
          title="Xóa vé" 
          onPress={handleDelete} 
          color={ticket.status === 0 ? '#ff0000' : 'gray'}
          disabled={ticket.status !== 0}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#1e1e1e',
    display: 'flex',
    flexDirection: 'row',
    flex: 1
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 10
  },
  posterImage: {
    width: 150,
    height: 250,
    borderRadius: 5,
    marginRight: 10,
  },
});
