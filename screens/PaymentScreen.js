import React from 'react';
import { View, Text, Button } from 'react-native';
import { API_URL } from '@env';

const PaymentScreen = ({ navigation }) => {
  const handlePayment = () => {
    // Tích hợp Stripe hoặc cổng thanh toán khác
    alert('Thanh toán thành công!');
    navigation.navigate('MovieList');
  };

  return (
    <View>
      <Text>Thanh toán</Text>
      <Button title="Thanh toán" onPress={handlePayment} />
    </View>
  );
};

export default PaymentScreen;
