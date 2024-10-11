import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';

const MovieListScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(()=>{
    axios.get('http://192.168.221.130:8000/movies')
    .then(response => setMovies(response.data))
    .catch(error => console.error(error))
  },[]);

  return (
    <View>
      <TextInput 
        placeholder="Tìm kiếm phim..." 
        value={searchQuery} 
        onChangeText={text => setSearchQuery(text)} 
        style={{ padding: 10, margin: 10, borderColor: 'gray', borderWidth: 1 }} 
      />
      <FlatList
        data={movies}
        keyExtractor={(item, index) => item + index}
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
