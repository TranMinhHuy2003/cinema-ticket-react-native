import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MovieListScreen from './screens/MovieListScreen';
import BookingScreen from './screens/BookingScreen';
import MovieDetailScreen from './screens/MovieDetailScreen';
import PaymentScreen from './screens/PaymentScreen';
import AdminScreen from './screens/AdminScreen';
import Admin from './screens/Admin/Admin'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator 
    //     initialRouteName="MovieList"
    //     screenOptions={{
    //       headerStyle: {
    //         backgroundColor: '#1f1f1f',
    //       },
    //       headerTintColor: '#fff',
    //       headerTitleStyle: {
    //         fontWeight: 'bold',
    //       },
    //     }}
    //   >
    //     <Stack.Screen
    //       name="MovieList"
    //       component={MovieListScreen}
    //       options={{ title: 'Movie Listings' }}
    //     />
    //     <Stack.Screen
    //       name="MovieDetail"
    //       component={MovieDetailScreen}
    //       options={{ title: 'Movie Details' }}
    //     />
    //     <Stack.Screen
    //       name="Booking"
    //       component={BookingScreen}
    //       options={{ title: 'Book Your Ticket' }}
    //     />
    //     <Stack.Screen
    //       name="Payment"
    //       component={PaymentScreen}
    //       options={{ title: 'Payment' }}
    //     />
    //     <Stack.Screen
    //       name="Admin"
    //       component={AdminScreen}
    //       options={{ title: 'Admin Panel' }}
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <Admin />
  );
}
