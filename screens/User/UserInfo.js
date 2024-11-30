import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { API_URL } from '@env';

export default function UserInfo() {
  const { userId } = useContext(AuthContext); // Lấy user_id từ AuthContext
  const [userData, setUserData] = useState(null); // Lưu trữ thông tin người dùng
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [isEditing, setIsEditing] = useState(false); // Trạng thái chỉnh sửa
  const [updatedData, setUpdatedData] = useState({}); // Lưu thông tin được cập nhật
  const [isDatePickerVisible, setDatePickerVisible] = useState(false); // Trạng thái DatePicker

  // Gọi API để lấy dữ liệu người dùng
  useEffect(() => {
    if (!userId) {
      Alert.alert('Lỗi', 'Không tìm thấy thông tin người dùng!');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/${userId}`);
        setUserData(response.data); // Lưu dữ liệu người dùng
        setUpdatedData(response.data); // Đồng bộ dữ liệu ban đầu
      } catch (error) {
        console.error(error);
        Alert.alert('Lỗi', 'Không thể lấy thông tin người dùng!');
      } finally {
        setLoading(false); // Tắt trạng thái tải
      }
    };

    fetchUserData();
  }, [userId]);

  const handleSave = async () => {
    try {
      const response = await axios.put(`${API_URL}/users/${userId}`, updatedData);
      Alert.alert('Thành công', 'Thông tin đã được cập nhật!');
      setUserData((prevData) => ({ ...prevData, ...updatedData })); // Cập nhật giao diện
      setIsEditing(false); // Kết thúc chỉnh sửa
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi', 'Không thể cập nhật thông tin!');
    }
  };

  const handleDateChange = (event, selectedDate) => {
    if (event.type === 'dismissed') {
      setDatePickerVisible(false); // Đóng DatePicker nếu hủy
      return;
    }
    const newDate = selectedDate || userData.dob;
    setUpdatedData({ ...updatedData, dob: newDate.toISOString() });
    setDatePickerVisible(false);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ff0000" />
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Không thể tải thông tin người dùng.</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
      >
          <Text style={styles.label}>Tên:</Text>
          <TextInput
            style={styles.input}
            value={updatedData.name}
            editable={isEditing}
            onChangeText={(text) => setUpdatedData({ ...updatedData, name: text })}
          />

          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={updatedData.email}
            editable={false} // Không cho phép chỉnh sửa email
          />

          <Text style={styles.label}>Ngày sinh:</Text>
          <TouchableOpacity
            style={styles.datePicker}
            onPress={() => isEditing && setDatePickerVisible(true)}
          >
            <Text style={styles.datePickerText}>
              {new Date(updatedData.dob).toLocaleDateString('vi-VN')}
            </Text>
          </TouchableOpacity>
          {isDatePickerVisible && (
            <DateTimePicker
              value={new Date(updatedData.dob)}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}

          <Text style={styles.label}>Số điện thoại:</Text>
          <TextInput
            style={styles.input}
            value={updatedData.phone_number}
            editable={isEditing}
            onChangeText={(text) =>
              setUpdatedData({ ...updatedData, phone_number: text })
            }
          />

          {isEditing ? (
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Lưu</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={() => setIsEditing(true)}>
              <Text style={styles.buttonText}>Chỉnh sửa</Text>
            </TouchableOpacity>
          )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  datePicker: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  datePickerText: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#ff0000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  error: {
    fontSize: 18,
    color: '#ff0000',
    textAlign: 'center',
  },
});
