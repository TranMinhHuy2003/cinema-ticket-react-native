import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import { API_URL } from '@env';
import MovieDetails from '../MovieDetails';
import BookingTheater from '../BookingTheater';
import BookingSeats from '../BookingSeats';
import Payment from '../Payment';


const Stack = createStackNavigator(); // Tạo Stack Navigator

// Danh sách phim
function MovieList({ navigation }) {
  const [movies, setMovies] = useState([]); // Trạng thái lưu danh sách phim
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu

  // Gọi API để lấy danh sách phim
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${API_URL}/movies`);
        setMovies(response.data); // Lưu danh sách phim vào state
      } catch (error) {
        console.error(error);
        Alert.alert('Lỗi', 'Không thể tải danh sách phim!');
      } finally {
        setLoading(false); // Tắt trạng thái tải
      }
    };

    fetchMovies();
  }, []);

  const renderMovieItem = ({ item }) => (
    <View style={styles.movieItem}>
      <Image source={{ uri: item.posterUrl }} style={styles.poster} />
      <View style={styles.movieDetails}>
        <Text style={styles.movieTitle}>{item.title}</Text>
        <Text style={styles.movieDescription} numberOfLines={3}>
          {item.description}
        </Text>
        <Text style={styles.movieRating}>⭐ {item.imdbRating}</Text>
        <Text style={styles.movieReleaseDate}>
          📅 {new Date(item.releaseDate).toLocaleDateString()}
        </Text>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => navigation.navigate('MovieDetails', { movieId: item.id })} // Chuyển hướng đến MovieDetails
        >
          <Text style={styles.detailsButtonText}>Xem chi tiết</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ff0000" />
      </View>
    );
  }

  if (movies.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noMoviesText}>Không có phim nào để hiển thị!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách phim</Text>
      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id} // Sử dụng movieId làm khóa
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

// Stack Navigator trong HomeScreen
export default function HomeScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1e1e1e',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color: '#fff',
        },
        headerTintColor: '#ff0000',
      }}
    >
      <Stack.Screen
        name="MovieList"
        component={MovieList}
        options={{
          headerShown: false, // Hiển thị header ở MovieList
          title: 'Danh Sách Phim',
        }}
      />
      <Stack.Screen
        name="MovieDetails"
        component={MovieDetails}
        options={{ title: 'Chi Tiết Phim' }}
      />
      <Stack.Screen
        name="BookingTheater"
        component={BookingTheater}
        options={{ title: 'Chọn Rạp & Suất Chiếu' }}
      />
      <Stack.Screen
        name="BookingSeats"
        component={BookingSeats}
        options={{ title: 'Chọn Ghế' }}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{ title: 'Thanh Toán' }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
  },
  list: {
    paddingHorizontal: 10,
  },
  movieItem: {
    flexDirection: 'row',
    backgroundColor: '#2c2c2c',
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  poster: {
    width: 100,
    height: 150,
  },
  movieDetails: {
    flex: 1,
    padding: 10,
  },
  movieTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  movieDescription: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 10,
  },
  movieRating: {
    color: '#ffcc00',
    fontSize: 14,
    marginBottom: 5,
  },
  movieReleaseDate: {
    color: '#bbb',
    fontSize: 14,
    marginBottom: 10,
  },
  detailsButton: {
    backgroundColor: '#ff0000',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  noMoviesText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});
