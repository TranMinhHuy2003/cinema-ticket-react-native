import React, { useState } from 'react';
import { Alert, View, Text, TextInput, Button, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, FlatList, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Keyboard} from 'react-native';
import { API_URL } from '@env';
import axios from 'axios';

const AddCinema = ({ route, navigation }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [halls, setHalls] = useState([]);
  const [hallName, setHallName] = useState("");
  const [seatCapacity, setSeatCapacity] = useState(80);
  const [isFocused, setIsFocused] = useState({});
  const {cinemas} = route.params;

  const addHall = () => {
    if (hallName && seatCapacity) {
      setHalls([...halls, { name: hallName, seat_capacity: parseInt(seatCapacity) }]);
      setHallName('');
      setSeatCapacity(80);
    }
  };

  const handleRemoveHall = (index) => {
    const updatedHalls = halls.filter((_, i) => i !== index);
    setHalls(updatedHalls);
  };

  const handleSubmit = () => {
    if (!name || !location || !halls) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin rạp chiếu.");
      return;
    }
    for (let i = 0; i < cinemas.length; i++) {
      if (name === cinemas[i].name) {
        Alert.alert("Lỗi", "Tồn tại rạp chiếu trùng tên!");
        return;
      }
    }
    axios.post(`${API_URL}/cinemas/`, {
      name,
      location,
      halls,
    })
    .then(() => {
      alert('Rạp chiếu đã được thêm thành công!');
    })
    .catch(error => {
      console.error(error);
    });
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={styles.inputLabel}>Tên rạp chiếu</Text>
          <TextInput
            onFocus={() => setIsFocused({ ...isFocused, name: true })}
            onBlur={() => setIsFocused({ ...isFocused, name: false })}
            style={[styles.input, isFocused.name && styles.isFocused]} 
            value={name} onChangeText={setName} 
          />

          <Text style={styles.inputLabel}>Địa chỉ</Text>
          <TextInput
            onFocus={() => setIsFocused({ ...isFocused, location: true })}
            onBlur={() => setIsFocused({ ...isFocused, location: false })}
            style={[styles.input, isFocused.location && styles.isFocused, {height: 80}]} 
            value={location} onChangeText={setLocation} 
            multiline
          />
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <View>
              <Text style={styles.inputLabel}>Tên phòng chiếu</Text>
              <TextInput
                onFocus={() => setIsFocused({ ...isFocused, hallName: true })}
                onBlur={() => setIsFocused({ ...isFocused, hallName: false })}
                style={[styles.input, isFocused.hallName && styles.isFocused, { width: 180 }]}
                value={hallName}
                onChangeText={setHallName}
              />
            </View>
            <View>
              <Text style={styles.inputLabel}>Sức chứa</Text>
              <TextInput
                style={styles.input}
                editable={false}
                placeholder='80'
                placeholderTextColor={'#fff'}
              />
            </View>
            <Button color="#ff0000" title="Thêm" onPress={addHall} />
          </View>
          <FlatList
            horizontal
            data={halls}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.hallItem}>
                <Text style={styles.hallText}>{item.name} - {item.seat_capacity}</Text>
                <TouchableOpacity onPress={() => {handleRemoveHall(index)}}>
                  <Text style={styles.removeHall}>X</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
        <View style={{backgroundColor: '#1e1e1e', paddingBottom: 40}}>
          <Button onPress={handleSubmit} color="#ff0000" title="Thêm" />
        </View>
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
  },
  genreInputContainer: {
    flexDirection: 'row',
  },
  hallItem: {
    flexDirection: 'column',
    marginBottom: 15,
  },
  hallText: {
    color: '#fff',
    marginRight: 15,
    fontSize: 20
  },
  removeHall: {
    color: '#ff0000',
    fontWeight: 'bold',
  },
});

export default AddCinema;
