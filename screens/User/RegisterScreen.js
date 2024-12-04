import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { API_URL } from '@env';

export default function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({
    fullName: '',
    dob: new Date(),
    gender: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    created_at: new Date()
  });
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  // Kiểm tra email có hợp lệ không
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = () => {
    // Kiểm tra các trường bắt buộc
    if (
      !form.fullName ||
      !form.gender ||
      !form.phone ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin!');
      return;
    }

    // Kiểm tra email hợp lệ
    if (!isValidEmail(form.email)) {
      Alert.alert('Lỗi', 'Địa chỉ email không hợp lệ!');
      return;
    }

    // Kiểm tra mật khẩu xác nhận
    if (form.password !== form.confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu xác nhận không trùng khớp!');
      return;
    }

    // Gọi API để tạo người dùng
    axios
      .post(`${API_URL}/users`, {
        name: form.fullName,
        email: form.email,
        dob: form.dob.toISOString(),
        gender: parseInt(form.gender),
        phone_number: form.phone,
        password: form.password,
        is_admin: false,
        created_at: new Date()
      })
      .then(() => {
        Alert.alert('Đăng ký thành công', `Chào mừng ${form.fullName}!`);
        navigation.navigate('Login');
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          // Kiểm tra lỗi email đã tồn tại
          if (error.response.data.detail === 'Email đã được sử dụng!') {
            Alert.alert('Lỗi', 'Email này đã được sử dụng. Vui lòng thử email khác.');
          } else {
            Alert.alert('Lỗi', 'Không thể đăng ký tài khoản!');
          }
        } else {
          console.error(error);
          Alert.alert('Lỗi', 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.');
        }
      });
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || form.dob;
    setDatePickerVisible(false);
    setForm({ ...form, dob: currentDate });
  };

  return (

    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Đăng Ký</Text>
        <TextInput
          placeholder="Họ và Tên"
          placeholderTextColor="#ccc"
          style={styles.input}
          onChangeText={(text) => setForm({ ...form, fullName: text })}
        />

        <TouchableOpacity
          style={styles.datePicker}
          onPress={() => setDatePickerVisible(true)}
        >
          <Text style={styles.datePickerText}>
            {form.dob.toLocaleDateString('vi-VN')}
          </Text>
        </TouchableOpacity>
        {isDatePickerVisible && (
          <DateTimePicker
            value={form.dob}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <View style={styles.selectContainer}>
          <Text style={styles.selectLabel}>Giới tính:</Text>
          <TouchableOpacity
            style={[
              styles.selectButton,
              form.gender === '0' && styles.selectButtonActive,
            ]}
            onPress={() => setForm({ ...form, gender: '0' })}
          >
            <Text style={styles.selectButtonText}>Nam</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.selectButton,
              form.gender === '1' && styles.selectButtonActive,
            ]}
            onPress={() => setForm({ ...form, gender: '1' })}
          >
            <Text style={styles.selectButtonText}>Nữ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.selectButton,
              form.gender === '2' && styles.selectButtonActive,
            ]}
            onPress={() => setForm({ ...form, gender: '2' })}
          >
            <Text style={styles.selectButtonText}>Khác</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          placeholder="Số điện thoại"
          placeholderTextColor="#ccc"
          style={styles.input}
          keyboardType='numeric'
          onChangeText={(text) => setForm({ ...form, phone: text })}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#ccc"
          style={styles.input}
          onChangeText={(text) => setForm({ ...form, email: text })}
        />
        <TextInput
          placeholder="Mật khẩu"
          placeholderTextColor="#ccc"
          secureTextEntry
          style={styles.input}
          onChangeText={(text) => setForm({ ...form, password: text })}
        />
        <TextInput
          placeholder="Xác nhận mật khẩu"
          placeholderTextColor="#ccc"
          secureTextEntry
          style={styles.input}
          onChangeText={(text) => setForm({ ...form, confirmPassword: text })}
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.link}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.linkText}>Đã có tài khoản? Đăng nhập</Text>
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
  title: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
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
    alignItems: 'center',
  },
  datePickerText: {
    color: '#fff',
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  selectLabel: {
    color: '#fff',
    marginRight: 10,
  },
  selectButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  selectButtonActive: {
    backgroundColor: '#ff0000',
  },
  selectButtonText: {
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
  link: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#ff0000',
    textDecorationLine: 'underline',
  },
});
