import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';

const { width } = Dimensions.get("window");

const Payment = ({ route, navigation }) => {
  const { originShowtime, selectedDate, selectedShowtime, selectedTheater, selectedHall, movieId, movieTitle, moviePoster, selectedSeats, totalPrice } = route.params;
  const [orderId, setOrderId] = useState(null);
  const [checkoutUrl, setCheckoutUrl] = useState(null);
  const description = "Mua vé xem phim";
  
  // Format selectedDate to dd/mm/yyyy
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0'); // Add leading zero if day is < 10
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get month and add leading zero if < 10
    const year = date.getFullYear();
    return `${day}/${month}/${year}`; // Return formatted date
  };

  // Format price as VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  // Hàm tạo số ngẫu nhiên
  const generateRandomOrderId = () => {
    const currentTime = new Date();
    const formattedTime = currentTime
      .toISOString()
      .replace(/[-T:.Z]/g, '')
      .slice(0, 14); // yyyyMMddHHmmss
    const randomNumber = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    return parseInt(`${formattedTime}${randomNumber}`, 10); // Trả về giá trị
  };

  // Tạo orderId mỗi khi vào màn hình
  useEffect(() => {
    const newOrderId = generateRandomOrderId();
    if (newOrderId) {
      setOrderId(newOrderId.toString()); // Chỉ gọi nếu giá trị hợp lệ
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
      // amount: parseInt(totalPrice, 10), // Chuyển amount sang kiểu số
      amount: 2000,
      description: description,
    };

    try {
      const response = await axios.post('http://192.168.0.103:8000/payment', paymentData);
      if (response.data.checkoutUrl) {
        setCheckoutUrl(response.data.checkoutUrl)
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
        onNavigationStateChange={async (navState) => {
          if (navState.url.includes('/success')) {
            // Gọi API POST /bookings để lưu thông tin đặt vé
            const bookingData = {
              user_id: "LopsaIAr5mpxeEuSrw2x", // Lấy từ auth
              movie_id: movieId, // Phải truyền từ phía trước
              movie_title: movieTitle, // Tiêu đề phim, truyền từ phía trước
              cinema_name: selectedTheater, // Tên rạp, truyền từ phía trước
              showtime: originShowtime,
              seats: selectedSeats, // Mảng ghế đã chọn
              total_price: totalPrice, // Tổng giá vé, cần tính toán từ phía trước
            };
  
            try {
              await axios.post('http://192.168.0.103:8000/bookings/', bookingData);
              Alert.alert('Success', 'Thanh toán thành công và đặt vé hoàn tất');
              setCheckoutUrl(null);
              // navigation.navigate('Home'); // Điều hướng về trang chính sau khi thành công
              navigation.navigate('MovieDetail');
            } catch (error) {
              Alert.alert('Error', error.response?.data?.detail || 'Đặt vé thất bại');
              setCheckoutUrl(null);
            }
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
      <ScrollView>
        <View style={styles.section}>
          <Image source={{ uri: moviePoster }} style={styles.poster} />
        </View>
        <View style={styles.section}>
          <Text style={styles.movieTitle}>{movieTitle}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>
            Rạp chiếu phim: <Text style={styles.value}>{selectedTheater}</Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>
            Phòng chiếu: <Text style={styles.value}>{selectedHall}</Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>
            Ngày: <Text style={styles.value}>{formatDate(new Date(selectedDate))}</Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>
            Suất chiếu: <Text style={styles.value}>{selectedShowtime}</Text>
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
            Tổng tiền: <Text style={styles.value}>{formatPrice(totalPrice)}</Text>
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
    padding: 10,
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
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
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