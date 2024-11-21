import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { users } from '../Admin/data'; // Import dữ liệu user

export default function UserInfo() {
  const { userRole } = useContext(AuthContext);

  // Lấy thông tin user từ danh sách dựa trên vai trò
  const user = users.find((u) => u.role === userRole);

  return (
    <View style={styles.container}>
      <Text style={styles.info}>Tên: {user.name}</Text>
      <Text style={styles.info}>Email: {user.email}</Text>
      <Text style={styles.info}>Ngày sinh: {user.birthday}</Text>
      <Text style={styles.info}>Số điện thoại: {user.phoneNumber}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 10,
  },
});
