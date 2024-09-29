import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env';

const MovieListScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch movie data from the API
    axios.get(`${API_URL}/movies`)
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.error(error);
alert(error);
      });
  }, []);

  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View>
      <TextInput 
        placeholder="Tìm kiếm phim..." 
        value={searchQuery} 
        onChangeText={text => setSearchQuery(text)} 
        style={{ padding: 10, margin: 10, borderColor: 'gray', borderWidth: 1 }} 
      />
      <FlatList
        data={filteredMovies}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })}>
            <View style={{ flexDirection: 'row', padding: 10 }}>
              <Image source={{ uri: item.posterUrl }} style={{ width: 100, height: 150 }} />
              <View style={{ paddingLeft: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
                <Text>{item.description}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MovieListScreen;
