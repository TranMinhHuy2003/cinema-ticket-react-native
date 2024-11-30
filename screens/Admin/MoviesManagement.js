import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, Alert, Touchable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

export default function MoviesManagement() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://192.168.1.5:8000/movies');
      setMovies(response.data);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [refresh]);

  useFocusEffect(
    useCallback(() => {
      fetchMovies(); // Cập nhật dữ liệu khi quay lại màn hình
    }, [])
  );

  const handleDelete = (movie_id) => {
    Alert.alert("Xác nhận", "Bạn có chắc chắn muốn xóa phim này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        onPress: () => {
          axios.delete(`http://192.168.1.5:8000/movies/${movie_id}`, {
          })
          .then(() => {
            alert('Xóa phim thành công!');
          })
          .catch(error => {
            console.error(error);
          });
          setRefresh(!refresh);
        },
      },
    ]);
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.navigate('AddMovie')} color="#ff0000" title="Thêm phim mới" />
      <FlatList
        data={movies}
        style={{marginTop: 20}}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.listItem} 
            onPress={() => navigation.navigate('EditMovie', { movie: item, movie_id: item.id })}
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
            <View>
              <Button
                title="Xóa"
                color="#ff0000"
                onPress={() => handleDelete(item.id)}
              />
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
    width: 190,
    marginRight: 10
  },
  posterImage: {
    width: 70,
    height: 110,
    borderRadius: 5,
    marginRight: 10,
  },
});