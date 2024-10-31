import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, Touchable } from 'react-native';
import { List, FAB } from 'react-native-paper';
import { movies } from './data';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

export default function MoviesManagement() {
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
            onPress={() => navigation.navigate('EditMovie', { movie: item })}
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
                onPress={() => deleteMovie(item.id)}
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