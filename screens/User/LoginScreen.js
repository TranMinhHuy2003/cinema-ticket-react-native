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
import { users } from '../Admin/data';

export default function LoginScreen({ navigation }) {
    const { setIsAuthenticated, setUserRole } = useContext(AuthContext); // Lấy setUserRole từ context
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleLogin = () => {
        // Kiểm tra thông tin đăng nhập
        const user = users.find(
            (u) => u.email === email && u.password === password
        );

        if (user) {
            setIsAuthenticated(true); // Đánh dấu người dùng đã đăng nhập
            setUserRole(user.role); // Cập nhật vai trò (role)
            Alert.alert('Đăng nhập thành công!', `Chào mừng ${user.name}`);
        } else {
            Alert.alert('Đăng nhập thất bại!', 'Sai email hoặc mật khẩu!');
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
