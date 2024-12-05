import React, { useState } from 'react';
import { Alert, View, Text, TextInput, Button, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, FlatList, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Keyboard } from 'react-native';
import { API_URL } from '@env';
import { format } from 'date-fns';
import axios from 'axios';

const AddMovie = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [trailerUrl, setTrailerUrl] = useState('');
  const [releaseDate, setReleaseDate] = useState(new Date);
  const [duration, setDuration] = useState('');
  const [genres, setGenres] = useState([]);
  const [newGenre, setNewGenre] = useState('');
  const [imdbRating, setImdbRating] = useState('');
  const [rottenTomatoesRating, setRottenTomatoesRating] = useState('');
  const [isFocused, setIsFocused] = useState({});
  const [showPicker, setShowPicker] = useState(false);

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

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || releaseDate;
    setReleaseDate(currentDate)
    setShowPicker(false);
  };

  const handleSubmit = () => {
    if (!title || !description || !posterUrl || !trailerUrl || !releaseDate || !duration || !genres || !imdbRating || !rottenTomatoesRating) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin phim.");
      return;
    }
    axios.post(`${API_URL}/movies/`, {
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
        alert('Phim đã được thêm thành công!');
      })
      .catch(error => {
        console.error(error);
      });
    navigation.goBack();
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
            style={[styles.input, isFocused.description && styles.isFocused, { height: 80 }]}
            value={description} onChangeText={setDescription}
            multiline
          />

          <Text style={styles.inputLabel}>Thời lượng (phút)</Text>
          <TextInput
            style={[styles.input, isFocused.duration && styles.isFocused]}
            onFocus={() => setIsFocused({ ...isFocused, duration: true })}
            onBlur={() => setIsFocused({ ...isFocused, duration: false })}
            keyboardType="numeric"
            value={duration}
            onChangeText={setDuration}
          />

          <Text style={styles.inputLabel}>Thể loại</Text>
          <View style={styles.genreInputContainer}>
            <TextInput
              onFocus={() => setIsFocused({ ...isFocused, genres: true })}
              onBlur={() => setIsFocused({ ...isFocused, genres: false })}
              style={[styles.input, { flex: 1, marginBottom: 20 }, isFocused.genres && styles.isFocused]}
              value={newGenre}
              onChangeText={setNewGenre}
            />
            <TouchableOpacity onPress={handleAddGenre} style={styles.addButton2}>
              <Text style={styles.addButtonText}>Thêm</Text>
            </TouchableOpacity>
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
            value={imdbRating}
            onChangeText={setImdbRating}
          />

          <Text style={styles.inputLabel}>Rotten Tomatoes Rating (%)</Text>
          <TextInput
            style={[styles.input, isFocused.rottenTomatoesRating && styles.isFocused]}
            onFocus={() => setIsFocused({ ...isFocused, rottenTomatoesRating: true })}
            onBlur={() => setIsFocused({ ...isFocused, rottenTomatoesRating: false })}
            keyboardType="numeric"
            value={rottenTomatoesRating}
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
          <TouchableOpacity
            style={styles.datePicker}
            onPress={() => setShowPicker(!showPicker)}
          >
            <Text style={styles.dateText}>
              {format(releaseDate, "dd-MM-yyyy")}
            </Text>
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              value={releaseDate}
              mode="date"
              style={{ marginBottom: 40, marginRight: 231, backgroundColor: '#808080' }}
              onChange={handleDateChange}
            />
          )}
          <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Thêm</Text>
          </TouchableOpacity>
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
    justifyContent: 'center'
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
  addButton: {
    backgroundColor: "#ff0000",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 26,
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  dateText: {
    color: '#fff',
    fontSize: 16
  },
  datePicker: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  addButton2: {
    justifyContent: 'center', // Căn giữa theo chiều dọc
    alignItems: 'center',     // Căn giữa theo chiều ngang
    padding: 10,              // Tùy chỉnh khoảng cách bên trong
  },
  addButtonText: {
    color: '#ff0000',         // Màu chữ đỏ
    fontWeight: 'bold',       // Làm chữ đậm (tùy chọn)
    fontSize: 16,             // Kích thước chữ (tùy chỉnh theo nhu cầu)
  },
});

export default AddMovie;
