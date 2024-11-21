import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({
    fullName: '',
    birthDate: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleRegister = () => {
    if (form.password !== form.confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu xác nhận không trùng khớp!');
      return;
    }
    Alert.alert('Đăng ký thành công', `Chào mừng ${form.fullName}!`);
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Ký</Text>
      <TextInput
        placeholder="Họ và Tên"
        placeholderTextColor="#ccc"
        style={styles.input}
        onChangeText={(text) => setForm({ ...form, fullName: text })}
      />
      <TextInput
        placeholder="Ngày sinh (dd/mm/yyyy)"
        placeholderTextColor="#ccc"
        style={styles.input}
        onChangeText={(text) => setForm({ ...form, birthDate: text })}
      />
      <TextInput
        placeholder="Số điện thoại"
        placeholderTextColor="#ccc"
        style={styles.input}
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
      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Đã có tài khoản? Đăng nhập</Text>
      </TouchableOpacity>
    </View>
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
