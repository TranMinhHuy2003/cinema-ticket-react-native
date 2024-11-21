import React from 'react';
import { View, Text, StyleSheet, Button, Alert, Image } from 'react-native';
import { users, movies } from './data'
import { format } from 'date-fns';

const getUserName = (userId) => {
  const user = users.find((user) => user.id === userId);
  return user ? user.name : "Unknown User";
};

const getPosterURL = (movieName) => {
  const movie = movies.find((movie) => movie.title === movieName);
  return movie ? movie.posterUrl : "URL not found";
};

const handleStatus = (status) => {
  if (status === 0) {
    return "Đã hủy";
  }
  return "Đã xác nhận";
};

const TicketDetailsScreen = ({ route, navigation }) => {
  const { ticket } = route.params;

  const handleDelete = () => {
    if (ticket.status === "Paid") {
      Alert.alert("Không thể xóa", "Bạn không thể xóa vé đã thanh toán.");
    } else {
      Alert.alert("Xóa thành công", "Vé đã được xóa thành công.");
      navigation.goBack();
    }
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
        <View style={{width: 200}}>
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

export default TicketDetailsScreen;
