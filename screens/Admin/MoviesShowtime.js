import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, Touchable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env';
import { SearchBar } from '@rneui/themed';

export default function MoviesShowtime() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase()) ||
        movie.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies(movies);
    }
  };

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`${API_URL}/movies`);
      setMovies(response.data);
      setFilteredMovies(response.data);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);
  
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Tìm kiếm suất chiếu của phim..."
        onChangeText={handleSearch}
        value={searchQuery}
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInput}
        searchIcon={{color: '#ff0000'}}
        placeholderTextColor={'#f2f2f2'}
        inputStyle={{color: '#fff'}}
      />
      <FlatList
        data={filteredMovies}
        style={{marginTop: 20}}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.listItem} 
            onPress={() => navigation.navigate('ShowtimeManagement', { movie: item, movie_id: item.id })}
          >
            <View>
              <Image
                source={{ uri: item.posterUrl }}
                style={styles.posterImage}
              />
            </View>
            <View>
              <Text style={styles.movieTitle}>{item.title}</Text>
              <Text style={styles.movieDescription}>Mô tả: {item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
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
  listItem: {
    backgroundColor: '#575958',
    marginBottom: 10,
    borderRadius: 5,
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff'
  },
  movieTitle: {
    color: '#ecf0f1',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  movieDescription: {
    color: '#bdc3c7',
    width: 220,
    marginRight: 10
  },
  posterImage: {
    width: 70,
    height: 110,
    borderRadius: 5,
    marginRight: 10,
  },
  searchContainer: {
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  searchInput: {
    backgroundColor: "#575958",
  },
});