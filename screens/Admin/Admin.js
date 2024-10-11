import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Import các màn hình
import Dashboard from './Dashboard';
import MoviesManagement from './MoviesManagement';
// import TicketsManagement from './TicketsManagement';
// import SeatsManagement from './SeatsManagement';

// Tạo Drawer Navigator
const Drawer = createDrawerNavigator();

export default function Admin() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Dashboard">
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen name="Movies Management" component={MoviesManagement} />
        {/* <Drawer.Screen name="Tickets Management" component={TicketsManagement} /> */}
        {/* <Drawer.Screen name="Seats Management" component={SeatsManagement} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
