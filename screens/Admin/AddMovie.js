import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Keyboard} from 'react-native';

import axios from 'axios';

const AddMovie = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [trailerUrl, setTrailerUrl] = useState('');
  const [releaseDate, setReleaseDate] = useState(new Date);
  const [isFocused, setIsFocused] = useState({
    input1: false,
    input2: false,
    input3: false,
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.inputLabel}>Tựa đề</Text>
        <TextInput
          onFocus={() => setIsFocused({ ...isFocused, input1: true })}
          onBlur={() => setIsFocused({ ...isFocused, input1: false })}
          style={[styles.input, isFocused.input1 && styles.isFocused]} 
          value={title} onChangeText={setTitle} 
        />

        <Text style={styles.inputLabel}>Mô tả</Text>
        <TextInput
          onFocus={() => setIsFocused({ ...isFocused, input2: true })}
          onBlur={() => setIsFocused({ ...isFocused, input2: false })}
          style={[styles.input, isFocused.input2 && styles.isFocused, {height: 80}]} 
          value={description} onChangeText={setDescription} 
          multiline
        />
        
        <Text style={styles.inputLabel}>Link poster</Text>
        <TextInput 
          onFocus={() => setIsFocused({ ...isFocused, input3: true })}
          onBlur={() => setIsFocused({ ...isFocused, input3: false })}
          style={[styles.input, isFocused.input3 && styles.isFocused]} 
          keyboardType='url' 
          value={posterUrl} 
          onChangeText={setPosterUrl} 
        />
        
        <Text style={styles.inputLabel}>Link trailer</Text>
        <TextInput 
          onFocus={() => setIsFocused({ ...isFocused, input4: true })}
          onBlur={() => setIsFocused({ ...isFocused, input4: false })}
          style={[styles.input, isFocused.input4 && styles.isFocused]} 
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
        <Button color="#ff0000" title="Thêm" />
      </View>
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
  }
});

export default AddMovie;
