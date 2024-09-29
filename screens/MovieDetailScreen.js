import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import axios from 'axios';
import Video from 'react-native-video';
import { API_URL } from '@env';

const MovieDetailScreen = ({ route }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/movies/${movieId}`)
      .then(response => {
        setMovie(response.data);
      })
      .catch(error => {
        console.error(error);
alert(error);
      });
  }, []);

  if (!movie) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView>
      <Image source={{ uri: movie.posterUrl }} style={{ width: '100%', height: 300 }} />
      <Text style={{ fontSize: 24, fontWeight: 'bold', padding: 10 }}>{movie.title}</Text>
      <Text style={{ padding: 10 }}>{movie.description}</Text>

      <Video
        source={{ uri: movie.trailerUrl }}
        style={{ height: 200, width: '100%' }}
        controls
      />

      <Text style={{ padding: 10 }}>IMDB: {movie.imdbRating}</Text>
      <Text style={{ padding: 10 }}>Rotten Tomatoes: {movie.rottenTomatoesRating}%</Text>
    </ScrollView>
  );
};

export default MovieDetailScreen;
