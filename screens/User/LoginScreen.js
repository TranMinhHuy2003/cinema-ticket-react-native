import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    TextInput,
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { Input, Icon } from 'react-native-elements';
import axios from 'axios';
import { API_URL } from '@env';

export default function LoginScreen({ navigation }) {
    const { setIsAuthenticated, setUserRole, setUserId } = useContext(AuthContext); // Lấy setUserId từ AuthContext
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${API_URL}/users/login`, {
                email,
                password,
            });

            const { user_id, name, is_admin } = response.data;

            setIsAuthenticated(true); // Đánh dấu người dùng đã đăng nhập
            setUserRole(is_admin ? 'admin' : 'user'); // Cập nhật vai trò (admin hoặc user)
            setUserId(user_id); // Ghi nhận user_id vào AuthContext

            Alert.alert('Đăng nhập thành công!', `Chào mừng ${name}`);
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    Alert.alert('Đăng nhập thất bại!', 'Email không tồn tại!');
                } else if (error.response.status === 401) {
                    Alert.alert('Đăng nhập thất bại!', 'Sai mật khẩu!');
                } else {
                    Alert.alert('Đăng nhập thất bại!', error.response.data.detail || 'Lỗi không xác định!');
                }
            } else {
                console.error(error);
                Alert.alert('Lỗi', 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.');
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đăng Nhập</Text>
            <TextInput
                placeholder="Email"
                placeholderTextColor="#ccc"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
            />
            <Input
                placeholder="Mật khẩu"
                secureTextEntry={!isPasswordVisible}
                value={password}
                onChangeText={setPassword}
                rightIcon={
                    <Icon
                        name={isPasswordVisible ? 'eye-off' : 'eye'}
                        type="ionicon"
                        color="#fff"
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    />
                }
                inputStyle={{ color: '#fff' }}
                placeholderTextColor="#ccc"
                containerStyle={styles.inputContainer}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Register')}>
                <Text style={styles.linkText}>Chưa có tài khoản? Đăng ký</Text>
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
