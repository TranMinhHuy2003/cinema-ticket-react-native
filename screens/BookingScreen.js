import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env';

const BookingScreen = ({ route, navigation }) => {
  const { movieId } = route.params;
  const [showtimes, setShowtimes] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedShowtime, setSelectedShowtime] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/movies/${movieId}`)
      .then(response => {
        setShowtimes(response.data.showtimes);
      })
      .catch(error => {
        console.error(error);
alert(error);
      });
  }, []);

  const toggleSeatSelection = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleBooking = () => {
    axios.post(`${API_URL}/bookings`, {
      movie_id: movieId,
      time_id: selectedShowtime,
      seats: selectedSeats
    })
    .then(() => {
      navigation.navigate('Payment');
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <View>
      <Text>Chọn khung giờ</Text>
      <FlatList
        data={showtimes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedShowtime(item.id)}>
            <Text>{item.time}</Text>
          </TouchableOpacity>
        )}
      />

      <Text>Chọn ghế</Text>
      <FlatList
        data={['A1', 'A2', 'A3', 'A4', 'B1', 'B2']}
        numColumns={4}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleSeatSelection(item)}>
            <Text style={{ padding: 10, backgroundColor: selectedSeats.includes(item) ? 'green' : 'gray' }}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      <Button title="Đặt vé" onPress={handleBooking} />
    </View>
  );
};

export default BookingScreen;
