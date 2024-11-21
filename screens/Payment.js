import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';

const { width } = Dimensions.get("window");

const Payment = ({ route, navigation }) => {
  const { selectedShowtime, selectedTheater, movieTitle, moviePoster, selectedSeats, totalPrice } = route.params;
  const [orderId, setOrderId] = useState(null);
  const [checkoutUrl, setCheckoutUrl] = useState(null);
  const description = "Mua vé xem phim";

  // Nếu selectedTheater là một object, lấy giá trị cụ thể (ví dụ: theater name)
  const theaterName = typeof selectedTheater === 'object' ? selectedTheater.theater : selectedTheater;

  // Nếu selectedShowtime là một object, lấy giá trị cụ thể (ví dụ: thời gian chiếu)
  const showtimeValue = typeof selectedShowtime === 'object' ? selectedShowtime.time : selectedShowtime;

  // Hàm tạo số ngẫu nhiên
  const generateRandomOrderId = () => {
    const currentTime = new Date();
    const formattedTime = currentTime
      .toISOString()
      .replace(/[-T:.Z]/g, '')
      .slice(0, 14); // yyyyMMddHHmmss
    const randomNumber = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return parseInt(`${formattedTime}${randomNumber}`, 10); // Trả về giá trị
  };

  // Tạo orderId mỗi khi vào màn hình
  useEffect(() => {
    const newOrderId = generateRandomOrderId();
    if (newOrderId) {
      setOrderId(newOrderId.toString()); // Chỉ gọi nếu giá trị hợp lệ
      console.log(newOrderId)
    } else {
      console.error('Failed to generate Order ID');
    }
  }, []);

  const handlePayment = async () => {
    if (!orderId) {
      Alert.alert('Error', 'Order ID chưa được tạo');
      return;
    }

    const paymentData = {
      order_id: orderId,
      amount: parseInt(totalPrice, 10), // Chuyển amount sang kiểu số
      description: description,
    };

    try {
      const response = await axios.post('http://192.168.0.103:8000/payment', paymentData);
      if (response.data.checkoutUrl) {
        // Alert.alert('Payment Link', `Checkout URL: ${response.data.checkoutUrl}`);
        setCheckoutUrl(response.data.checkoutUrl);
      } else {
        Alert.alert('Error', 'Payment link not generated');
      }
    } catch (error) {
      Alert.alert('Error', error.response?.data?.detail || 'Payment failed');
    }
  };

  // Nếu có checkoutUrl, hiển thị WebView
  if (checkoutUrl) {
    return (
      <WebView
        source={{ uri: checkoutUrl }}
        style={{ flex: 1 }}
        onNavigationStateChange={(navState) => {
          if (navState.url.includes('/success')) {
            Alert.alert('Success', 'Thanh toán thành công');
            setCheckoutUrl(null); // Quay lại màn hình chính
          } else if (navState.url.includes('/cancel')) {
            Alert.alert('Cancelled', 'Thanh toán bị hủy');
            setCheckoutUrl(null); // Quay lại màn hình chính
          }
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Image source={{ uri: moviePoster }} style={styles.poster} />
        </View>
        <View style={styles.section}>
          <Text style={styles.movieTitle}>{movieTitle}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>
            Rạp: <Text style={styles.value}>{theaterName}</Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>
            Suất chiếu: <Text style={styles.value}>{showtimeValue}</Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>
            Số lượng ghế: <Text style={styles.value}>{selectedSeats.length} ghế</Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>
            Số ghế: <Text style={styles.value}>{selectedSeats.join(', ')}</Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>
            Tổng tiền: <Text style={styles.value}>{totalPrice} VND</Text>
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Thanh toán</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 15,
  },
  poster: {
    width: width * 0.4,
    height: width * 0.6,
    alignItems:'center',
    alignSelf: 'center',
  },
  movieTitle: {
    alignItems: 'center',
    alignSelf: 'center',
    fontSize: 33,
    fontWeight: 'bold',
    color: '#fff'
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
    fontWeight: 'normal'
  },
  button: {
    backgroundColor: '#ff0000',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Payment;