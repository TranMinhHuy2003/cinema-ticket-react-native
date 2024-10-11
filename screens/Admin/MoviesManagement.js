import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { movies } from './data';

export default function MoviesManagement() {
  return (
    <View>
      <Button title="Add New Movie" />
      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Button title="Edit" />
            <Button title="Delete" />
          </View>
        )}
        keyExtractor={item => item.title}
      />
    </View>
  );
};
