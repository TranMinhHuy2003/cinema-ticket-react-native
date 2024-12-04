import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  PanResponder,
  Animated,
  ScrollView,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import { API_URL } from '@env';
import MovieDetails from '../MovieDetails';
import BookingTheater from '../BookingTheater';
import BookingSeats from '../BookingSeats';
import Payment from '../Payment';

const Stack = createStackNavigator(); // Tạo Stack Navigator
const { width } = Dimensions.get('window'); // Lấy kích thước màn hình

function MovieSlider({ title, movies, navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 15000); // Tự động chuyển phim sau mỗi 15 giây

    return () => clearInterval(interval); // Xóa interval khi component bị hủy
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > 10, // Phát hiện cử chỉ lướt theo trục x
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 50) {
          handlePrev(); // Lướt sang phải
        } else if (gestureState.dx < -50) {
          handleNext(); // Lướt sang trái
        }
      },
    })
  ).current;

  if (movies.length === 0) {
    return (
      <View style={styles.noMoviesContainer}>
        <Text style={styles.noMoviesText}>Không có phim nào để hiển thị!</Text>
      </View>
    );
  }

  const currentMovie = movies[currentIndex];

  return (
    <View style={styles.sliderContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Animated.View
        style={[styles.slider]}
        {...panResponder.panHandlers} // Gắn sự kiện PanResponder vào View
      >
        <Image source={{ uri: currentMovie.posterUrl }} style={styles.poster} />
        <View style={styles.movieInfoContainer}>
          <Text style={styles.movieTitle}>{currentMovie.title}</Text>
          <Text style={styles.movieDescription} numberOfLines={3}>
            {currentMovie.description}
          </Text>
          <Text style={styles.movieRating}>⭐ {currentMovie.imdbRating}</Text>
          <Text style={styles.movieReleaseDate}>
            📅 {new Date(currentMovie.releaseDate).toLocaleDateString()}
          </Text>
          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() =>
              navigation.navigate('MovieDetails', { movieId: currentMovie.id })
            }
          >
            <Text style={styles.detailsButtonText}>Xem chi tiết</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

function MovieList({ navigation }) {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [upcomingResponse, allResponse] = await Promise.all([
          axios.get(`${API_URL}/movies/upcoming`),
          axios.get(`${API_URL}/movies`),
        ]);
        setUpcomingMovies(upcomingResponse.data);
        setAllMovies(allResponse.data);
      } catch (error) {
        console.error(error);
        alert('Không thể tải danh sách phim');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ff0000" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <MovieSlider
        title="🎥 Phim đang chiếu"
        movies={upcomingMovies}
        navigation={navigation}
      />
      <MovieSlider
        title="📜 Danh sách phim"
        movies={allMovies}
        navigation={navigation}
      />
    </ScrollView>
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
          headerShown: false,
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
  scrollContainer: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  sectionTitle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginVertical: 15,
    textAlign: 'center',
  },
  sliderContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  slider: {
    width: width * 0.9,
    flexDirection: 'row', // Sắp xếp poster và thông tin ngang hàng
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 15,
    elevation: 5,
  },
  poster: {
    width: 140,
    height: 200,
    borderRadius: 8,
    marginRight: 15, // Khoảng cách giữa poster và thông tin phim
  },
  movieInfoContainer: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  movieDescription: {
    fontSize: 16,
    color: '#ddd',
    marginBottom: 10,
  },
  movieRating: {
    fontSize: 18,
    color: '#FFD700',
    marginBottom: 10,
  },
  movieReleaseDate: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 15,
  },
  detailsButton: {
    backgroundColor: '#ff0000',
    padding: 8,
    alignItems: 'center',
    borderRadius: 5,
  },
  detailsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  noMoviesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noMoviesText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});
