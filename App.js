import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import MovieListScreen from './screens/MovieListScreen';
import BookingTheater from './screens/BookingTheater';
import MovieDetail from './screens/MovieDetail';
import BookingSeats from './screens/BookingSeats';
import Payment from './screens/Payment';
import SalesPromotionList from './screens/SalesPromotionList';
import SalesPromotionDetail from './screens/SalesPromotionDetail';
// import AdminScreen from './screens/AdminScreen';
// import Admin from './screens/Admin/Admin'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="MovieList"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1f1f1f',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        {/* <Stack.Screen
          name="MovieList"
          component={MovieListScreen}
          options={{ title: 'Movie Listings' }}
        /> */}
        <Stack.Screen
          name="MovieDetail"
          component={MovieDetail}
          options={{ title: 'Chi tiết phim' }}
        />
        <Stack.Screen
          name="BookingTheater"
          component={BookingTheater}
          options={{ title: 'Đặt vé' }}
        />
        <Stack.Screen
          name="BookingSeats"
          component={BookingSeats}
          options={{ title: 'Chọn ghế ngồi' }}
        />
        <Stack.Screen
          name="Payment"
          component={Payment}
          options={{ title: 'Thanh toán' }}
        />
        <Stack.Screen
          name="SalesPromotionList"
          component={SalesPromotionList}
          options={{ title: 'Danh sách chương trình khuyến mãi' }}
        />
        <Stack.Screen
          name="SalesPromotionDetail"
          component={SalesPromotionDetail}
          options={{ title: 'Chi tiết chương trình khuyến mãi' }}
        />
        {/* <Stack.Screen
          name="Admin"
          component={AdminScreen}
          options={{ title: 'Admin Panel' }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
    // <Admin />
  );
}
