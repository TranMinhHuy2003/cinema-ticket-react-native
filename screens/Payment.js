// import React from 'react';
// import { View, Text, Button, Alert } from 'react-native';

// const Payment = ({route}) => {
//   const { selectedShowtime, selectedTheater, selectedSeats, totalPrice } = route.params; // Nhận amount từ BookingSeats
//   const createPaymentLink = async () => {
//     try {
//       const response = await fetch('http://192.168.0.104:8000/create_payment_link', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           order_id: 'ORDER123', // Thay bằng mã đơn hàng thực tế
//           amount: totalPrice, // Số tiền (đơn vị: VND)
//           description: `Thanh toán vé xem phim; Rạp: ${selectedTheater}, Suất chiếu: ${selectedShowtime}, Ghế: ${selectedSeats}`,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to create payment link');
//       }

//       const data = await response.json();
//       const checkoutUrl = data.checkoutUrl;

//       // Mở liên kết thanh toán
//       Alert.alert('Thanh toán', 'Đang chuyển đến trang thanh toán...');
//       Linking.openURL(checkoutUrl);
//     } catch (error) {
//       Alert.alert('Lỗi', error.message);
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text style={{ fontSize: 18, marginBottom: 20 }}>Thanh toán</Text>
//       <Button title="Tạo liên kết thanh toán" onPress={createPaymentLink} />
//     </View>
//   );
// };

// export default Payment;


import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import axios from 'axios';

export default function Payment() {
  const handlePayment = async () => {
    try {
      const paymentData = {
        // api_key: "7795f82d-8cb6-43a0-b580-f34cf40acb5c",
        // client_id: "7ed52b8c-5313-4de3-b053-c40f9f2888f0",
        // checksum_key: "00ff461ef0d7b1ac3bc9b5bfba1eb65cdcf5bfa11450690d53bf235141205737",
        orderCode: 'order123',
        amount: 1000,
        description: 'Payment for product',
      };

      // Thay `https://api.payos.com/payment` bằng URL API thực tế của PayOS
      const response = await axios.post('http://192.168.221.150:8000/payment', paymentData);

      if (response.data.success) {
        Alert.alert(
          'Payment Success',
          `Transaction ID: ${response.data.transactionId}`
        );
      } else {
        Alert.alert('Payment Failed', response.data.errorMessage);
      }
    } catch (error) {
      console.error('Payment Error:', error);
      Alert.alert('Error', 'An error occurred during payment.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>
        PayOS Payment Integration
      </Text>
      <Button title="Pay Now" onPress={handlePayment} />
    </View>
  );
}
