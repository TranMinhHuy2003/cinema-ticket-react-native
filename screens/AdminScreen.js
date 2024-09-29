import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env';

const AdminScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [trailerUrl, setTrailerUrl] = useState('');

  const handleAddMovie = () => {
    axios.post(`${API_URL}/movies`, {
      title,
      description,
      posterUrl,
      trailerUrl
    })
    .then(() => {
      alert('Phim đã được thêm thành công!');
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <View>
      <TextInput placeholder="Tiêu đề phim" value={title} onChangeText={setTitle} />
      <TextInput placeholder="Mô tả phim" value={description} onChangeText={setDescription} />
      <TextInput placeholder="URL poster" value={posterUrl} onChangeText={setPosterUrl} />
      <TextInput placeholder="URL trailer" value={trailerUrl} onChangeText={setTrailerUrl} />
      <Button title="Thêm phim" onPress={handleAddMovie} />
    </View>
  );
};

export default AdminScreen;
