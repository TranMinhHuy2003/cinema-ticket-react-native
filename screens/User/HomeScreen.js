import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { movies } from '../Admin/data'; // Import movies từ file data.js

export default function HomeScreen() {
  // Render từng mục phim
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
          style={styles.trailerButton}
          onPress={() => console.log(`Watch trailer: ${item.trailerUrl}`)} // Hành động mở trailer
        >
          <Text style={styles.trailerButtonText}>Xem Trailer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách phim</Text>
      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
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
  trailerButton: {
    backgroundColor: '#ff0000',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  trailerButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});
