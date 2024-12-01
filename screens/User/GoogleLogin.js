import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

export default function GoogleLogin() {
  useEffect(() => {
    // Cấu hình Google Sign-In
    GoogleSignin.configure({
      webClientId: '101104894890-hdmj6o9ljgdr3f21veinf928oajffffm.apps.googleusercontent.com', // Thay bằng Web Client ID của bạn
      offlineAccess: true, // Để lấy refresh token
    });
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true }); // Kiểm tra Google Play Services
      const userInfo = await GoogleSignin.signIn(); // Thực hiện đăng nhập
      Alert.alert('Đăng nhập Google thành công!', `Chào mừng ${userInfo.user.name}`);
      console.log('Thông tin người dùng:', userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Bạn đã hủy đăng nhập Google.');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Đang xử lý đăng nhập. Vui lòng đợi.');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Google Play Services không khả dụng.');
      } else {
        Alert.alert('Lỗi không xác định', error.message);
        console.error('Lỗi đăng nhập Google:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleGoogleLogin}>
        <Text style={styles.buttonText}>Đăng nhập với Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#4285F4',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
