import React, { useContext, useEffect, useState, useCallback } from 'react';
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
import { useFocusEffect } from '@react-navigation/native';

export default function UserInfo() {
  const { userId } = useContext(AuthContext); // Lấy user_id từ AuthContext
  const [userData, setUserData] = useState(null); // Lưu thông tin người dùng
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [isEditing, setIsEditing] = useState(false); // Trạng thái chỉnh sửa thông tin
  const [passwordData, setPasswordData] = useState({ old_password: '', new_password: '' }); // Dữ liệu thay đổi mật khẩu
  const [isDatePickerVisible, setDatePickerVisible] = useState(false); // Trạng thái hiển thị DatePicker

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/${userId}`);
      setUserData(response.data); // Lưu dữ liệu người dùng
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi', 'Không thể lấy thông tin người dùng!');
    } finally {
      setLoading(false); // Tắt trạng thái tải
    }
  };

  // Gọi API để lấy dữ liệu người dùng
  useEffect(() => {
    if (!userId) {
      Alert.alert('Lỗi', 'Không tìm thấy thông tin người dùng!');
      return;
    }

    fetchUserData();
  }, [userId]);

  
  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [])
  );

  const handlePasswordUpdate = async () => {
    if (!passwordData.old_password || !passwordData.new_password) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    try {
      await axios.put(`${API_URL}/users/${userId}/update-password`, passwordData);
      Alert.alert('Thành công', 'Mật khẩu đã được thay đổi!');
      setPasswordData({ old_password: '', new_password: '' }); // Xóa dữ liệu sau khi đổi mật khẩu
    } catch (error) {
      Alert.alert('Lỗi', error.response?.detail || 'Không thể thay đổi mật khẩu!');
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`${API_URL}/users/${userId}`, {
        name: userData.name,
        dob: userData.dob,
        gender: userData.gender,
        phone_number: userData.phone_number,
      });
      Alert.alert('Thành công', 'Thông tin đã được cập nhật!');
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi', 'Không thể cập nhật thông tin!');
    }
  };

  const handleDateChange = (event, selectedDate) => {
    if (event.type === 'dismissed') {
      setDatePickerVisible(false);
      return;
    }
    const newDate = selectedDate || userData.dob;
    setUserData({ ...userData, dob: newDate.toISOString() });
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
      <ScrollView keyboardShouldPersistTaps="handled">
        {/* Thông tin tài khoản */}
        <Text style={styles.sectionTitle}>Thông tin tài khoản</Text>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={userData.email}
          editable={false}
        />

        <Text style={styles.label}>Điểm tích lũy:</Text>
        <TextInput
          style={styles.input}
          value={`${userData.point} điểm`}
          editable={false}
        />

        <Text style={styles.label}>Ngày tạo tài khoản:</Text>
        <TextInput
          style={styles.input}
          value={new Date(userData.created_at).toLocaleDateString('vi-VN')}
          editable={false}
        />

        {/* Thông tin có thể chỉnh sửa */}
        <Text style={styles.sectionTitle}>Chỉnh sửa thông tin</Text>
        <Text style={styles.label}>Tên:</Text>
        <TextInput
          style={styles.input}
          value={userData.name}
          editable={isEditing}
          onChangeText={(text) => setUserData({ ...userData, name: text })}
        />

        <Text style={styles.label}>Ngày sinh:</Text>
        <TouchableOpacity
          style={styles.datePicker}
          onPress={() => isEditing && setDatePickerVisible(true)}
        >
          <Text style={styles.datePickerText}>
            {new Date(userData.dob).toLocaleDateString('vi-VN')}
          </Text>
        </TouchableOpacity>
        {isDatePickerVisible && (
          <DateTimePicker
            value={new Date(userData.dob)}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <Text style={styles.label}>Số điện thoại:</Text>
        <TextInput
          style={styles.input}
          value={userData.phone_number}
          editable={isEditing}
          onChangeText={(text) =>
            setUserData({ ...userData, phone_number: text })
          }
        />

        {isEditing ? (
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Lưu</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={() => setIsEditing(true)}>
            <Text style={styles.buttonText}>Chỉnh sửa thông tin</Text>
          </TouchableOpacity>
        )}

        {/* Chỉnh sửa mật khẩu */}
        <Text style={styles.sectionTitle}>Đổi mật khẩu</Text>
        <Text style={styles.label}>Mật khẩu cũ:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={passwordData.old_password}
          onChangeText={(text) => setPasswordData({ ...passwordData, old_password: text })}
        />

        <Text style={styles.label}>Mật khẩu mới:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={passwordData.new_password}
          onChangeText={(text) => setPasswordData({ ...passwordData, new_password: text })}
        />

        <TouchableOpacity style={styles.button} onPress={handlePasswordUpdate}>
          <Text style={styles.buttonText}>Đổi mật khẩu</Text>
        </TouchableOpacity>
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
  sectionTitle: {
    fontSize: 18,
    color: '#ff0000',
    fontWeight: 'bold',
    marginVertical: 20,
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
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
