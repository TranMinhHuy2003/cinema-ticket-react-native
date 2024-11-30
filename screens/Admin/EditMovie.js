import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableWithoutFeedback, TouchableOpacity, FlatList } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Keyboard} from 'react-native';
import { format } from "date-fns";
import axios from 'axios';

const EditMovie = ({ route, navigation }) => {
  const { movie, movie_id } = route.params;
  const [title, setTitle] = useState(movie.title);
  const [description, setDescription] = useState(movie.description);
  const [posterUrl, setPosterUrl] = useState(movie.posterUrl);
  const [trailerUrl, setTrailerUrl] = useState(movie.trailerUrl);
  const [releaseDate, setReleaseDate] = useState(new Date(movie.releaseDate));
  const [duration, setDuration] = useState(movie.duration);
  const [genres, setGenres] = useState(movie.genres);
  const [newGenre, setNewGenre] = useState('');
  const [imdbRating, setImdbRating] = useState(movie.imdbRating);
  const [rottenTomatoesRating, setRottenTomatoesRating] = useState(movie.rottenTomatoesRating);
  const [isFocused, setIsFocused] = useState({});

  const handleAddGenre = () => {
    if (newGenre.trim()) {
      setGenres([...genres, newGenre.trim()]);
      setNewGenre('');
    }
  };

  const handleRemoveGenre = (index) => {
    const updatedGenres = genres.filter((_, i) => i !== index);
    setGenres(updatedGenres);
  };

  const handleUpdate = () => {
    if (!title || !description || !posterUrl || !trailerUrl || !releaseDate || !duration || !genres || !imdbRating || !rottenTomatoesRating) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin phim.");
      return;
    }
    axios.put(`http://192.168.1.3:8000/movies/${movie_id}`, {
      title,
      description,
      posterUrl,
      trailerUrl,
      releaseDate,
      duration: parseInt(duration, 10),
      genres,
      imdbRating: parseFloat(imdbRating),
      rottenTomatoesRating: parseInt(rottenTomatoesRating, 10),
    })
    .then(() => {
      alert('Cập nhật phim thành công!');
      navigation.goBack();
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.inputLabel}>Tựa đề</Text>
          <TextInput
            onFocus={() => setIsFocused({ ...isFocused, title: true })}
            onBlur={() => setIsFocused({ ...isFocused, title: false })}
            style={[styles.input, isFocused.title && styles.isFocused]} 
            value={title} onChangeText={setTitle} 
          />

          <Text style={styles.inputLabel}>Mô tả</Text>
          <TextInput
            onFocus={() => setIsFocused({ ...isFocused, description: true })}
            onBlur={() => setIsFocused({ ...isFocused, description: false })}
            style={[styles.input, isFocused.description && styles.isFocused, {height: 80}]} 
            value={description} onChangeText={setDescription} 
            multiline
          />

          <Text style={styles.inputLabel}>Thời lượng (phút)</Text>
          <TextInput
            style={[styles.input, isFocused.duration && styles.isFocused]}
            onFocus={() => setIsFocused({ ...isFocused, duration: true })}
            onBlur={() => setIsFocused({ ...isFocused, duration: false })}
            keyboardType="numeric"
            value={`${duration}`}
            onChangeText={setDuration}
          />

          <Text style={styles.inputLabel}>Thể loại</Text>
          <View style={styles.genreInputContainer}>
            <TextInput
              onFocus={() => setIsFocused({ ...isFocused, genres: true })}
              onBlur={() => setIsFocused({ ...isFocused, genres: false })}
              style={[styles.input, {flex: 1, marginBottom: 20}, isFocused.genres && styles.isFocused]}
              value={newGenre}
              onChangeText={setNewGenre}
            />
            <Button color="#ff0000" title="Thêm" onPress={handleAddGenre} />
          </View>
          <FlatList
            horizontal
            data={genres}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.genreItem}>
                <Text style={styles.genreText}>{item}</Text>
                <TouchableOpacity onPress={() => handleRemoveGenre(index)}>
                  <Text style={styles.removeGenre}>X</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <Text style={styles.inputLabel}>IMDb Rating</Text>
          <TextInput
            style={[styles.input, isFocused.imdbRating && styles.isFocused]}
            onFocus={() => setIsFocused({ ...isFocused, imdbRating: true })}
            onBlur={() => setIsFocused({ ...isFocused, imdbRating: false })}
            keyboardType="numeric"
            value={`${imdbRating}`}
            onChangeText={setImdbRating}
          />

          <Text style={styles.inputLabel}>Rotten Tomatoes Rating (%)</Text>
          <TextInput
            style={[styles.input, isFocused.rottenTomatoesRating && styles.isFocused]}
            onFocus={() => setIsFocused({ ...isFocused, rottenTomatoesRating: true })}
            onBlur={() => setIsFocused({ ...isFocused, rottenTomatoesRating: false })}
            keyboardType="numeric"
            value={`${rottenTomatoesRating}`}
            onChangeText={setRottenTomatoesRating}
          />
          
          <Text style={styles.inputLabel}>Link poster</Text>
          <TextInput 
            onFocus={() => setIsFocused({ ...isFocused, posterUrl: true })}
            onBlur={() => setIsFocused({ ...isFocused, posterUrl: false })}
            style={[styles.input, isFocused.posterUrl && styles.isFocused]} 
            keyboardType='url' 
            value={posterUrl} 
            onChangeText={setPosterUrl} 
          />
          
          <Text style={styles.inputLabel}>Link trailer</Text>
          <TextInput 
            onFocus={() => setIsFocused({ ...isFocused, trailerUrl: true })}
            onBlur={() => setIsFocused({ ...isFocused, trailerUrl: false })}
            style={[styles.input, isFocused.trailerUrl && styles.isFocused]} 
            keyboardType='url' 
            value={trailerUrl} 
            onChangeText={setTrailerUrl} 
          />
          
          <Text style={styles.inputLabel}>Ngày phát hành</Text>
          <DateTimePicker
            value={releaseDate}
            mode="date"
            format="DD-MM-YYYY"
            style={{marginBottom: 40, marginRight: 231, backgroundColor: '#808080'}}
            onDateChange={setReleaseDate}
          />
          <Button onPress={handleUpdate} color="#ff0000" title="Cập nhật" />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1e1e1e'
  },
  inputLabel: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  input: {
    borderWidth: 1,
    marginBottom: 30,
    borderColor: '#575958',
    height: 50,
    borderRadius: 10,
    color: '#fff',
    padding: 10
  },
  isFocused: {
    borderColor: '#ff0000',
  },
  genreInputContainer: {
    flexDirection: 'row',
  },
  genreItem: {
    flexDirection: 'column',
    marginBottom: 15,
  },
  genreText: {
    color: '#fff',
    marginRight: 15,
    fontSize: 20
  },
  removeGenre: {
    color: '#ff0000',
    fontWeight: 'bold',
  },
});

export default EditMovie;
