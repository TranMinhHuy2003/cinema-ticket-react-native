import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

// Import các màn hình
import Dashboard from './Dashboard';
import MoviesManagement from './MoviesManagement';
import EditMovie from './EditMovie';
import AddMovie from './AddMovie';
import TicketsManagement from './TicketsManagement';
import TicketDetail from './TicketDetail';
import MoviesShowtime from './MoviesShowtime'
import ShowtimeManagement from './ShowtimeManagement'
import AddShowtimeScreen from './AddShowtimeScreen';
import EditShowtimeScreen from './EditShowtimeScreen';
// import TicketsManagement from './TicketsManagement';
// import SeatsManagement from './SeatsManagement';

// Tạo Drawer Navigator
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function getHiddenDrawer(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'MoviesManagement';

  switch (routeName) {
    case 'MoviesManagement':
      return true;
    case 'EditMovie':
      return false;
    case 'AddMovie':
      return false;
    case 'TicketDetail':
      return false;
    case 'ShowtimeManagement':
      return false;
    case 'AddShowtimeScreen':
      return false;
    case 'EditShowtimeScreen':
      return false;
  }
}

function AdminMovie() {
  return (
    <Stack.Navigator initialRouteName="MoviesManagement">
      <Stack.Screen 
        name="MoviesManagement" 
        component={MoviesManagement} 
        options={{ 
          title: 'Quản lý phim', 
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="EditMovie" 
        component={EditMovie} 
        options={({ navigation }) => ({
          title: 'Chỉnh sửa phim',
          headerLeft: () => (
            <Icon
              name="arrow-back-outline"
              size={30}
              onPress={() => navigation.goBack()}
              style={{ marginLeft: 15, color: '#ff0000' }}
            />
          ),
          headerShown: true,
          headerStyle: {
            backgroundColor: '#1e1e1e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        })}
      />
      <Stack.Screen 
        name="AddMovie" 
        component={AddMovie} 
        options={({ navigation }) => ({
          title: 'Thêm phim mới',
          headerLeft: () => (
            <Icon
              name="arrow-back-outline"
              size={30}
              onPress={() => navigation.goBack()}
              style={{ marginLeft: 15, color: '#ff0000' }}
            />
          ),
          headerShown: true,
          headerStyle: {
            backgroundColor: '#1e1e1e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        })}
      />
    </Stack.Navigator>
  );
}

function AdminTicket() {
  return (
    <Stack.Navigator initialRouteName="TicketsManagement">
      <Stack.Screen 
        name="TicketsManagement" 
        component={TicketsManagement} 
        options={{ 
          title: 'Quản lý vé', 
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="TicketDetail" 
        component={TicketDetail} 
        options={({ navigation }) => ({
          title: 'Chi tiết vé',
          headerLeft: () => (
            <Icon
              name="arrow-back-outline"
              size={30}
              onPress={() => navigation.goBack()}
              style={{ marginLeft: 15, color: '#ff0000' }}
            />
          ),
          headerShown: true,
          headerStyle: {
            backgroundColor: '#1e1e1e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        })}
      />
    </Stack.Navigator>
  );
}

function AdminShowtime() {
  return (
    <Stack.Navigator initialRouteName="MoviesShowtime">
      <Stack.Screen 
        name="MoviesShowtime" 
        component={MoviesShowtime} 
        options={{ 
          title: 'Quản lý suất chiếu', 
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="ShowtimeManagement" 
        component={ShowtimeManagement} 
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              name="arrow-back-outline"
              size={30}
              onPress={() => navigation.goBack()}
              style={{ marginLeft: 15, color: '#ff0000' }}
            />
          ),
          headerShown: true,
          headerStyle: {
            backgroundColor: '#1e1e1e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        })}
      />
      <Stack.Screen 
        name="AddShowtimeScreen" 
        component={AddShowtimeScreen} 
        options={({ navigation }) => ({
          title: 'Thêm suất chiếu',
          headerLeft: () => (
            <Icon
              name="arrow-back-outline"
              size={30}
              onPress={() => navigation.goBack()}
              style={{ marginLeft: 15, color: '#ff0000' }}
            />
          ),
          headerShown: true,
          headerStyle: {
            backgroundColor: '#1e1e1e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        })}
      />
      <Stack.Screen 
        name="EditShowtimeScreen" 
        component={EditShowtimeScreen} 
        options={({ navigation }) => ({
          title: 'Sửa suất chiếu',
          headerLeft: () => (
            <Icon
              name="arrow-back-outline"
              size={30}
              onPress={() => navigation.goBack()}
              style={{ marginLeft: 15, color: '#ff0000' }}
            />
          ),
          headerShown: true,
          headerStyle: {
            backgroundColor: '#1e1e1e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        })}
      />
    </Stack.Navigator>
  );
}

export default function Admin() {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        initialRouteName="Dashboard"
        screenOptions={({ route }) => ({
          headerStyle: {
            backgroundColor: '#1e1e1e',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#fff'
          },
          drawerStyle: {
            backgroundColor: '#1e1e1e',
          },
          drawerActiveTintColor: '#ff0000',
          drawerInactiveTintColor: '#fff',
          headerTintColor: '#ff0000',
          headerShown: getHiddenDrawer(route)
        })}
      >
        <Drawer.Screen name="Bảng điều khiển" component={Dashboard} />
        <Drawer.Screen name="Quản lý phim" component={AdminMovie} />
        <Drawer.Screen name="Quản lý vé" component={AdminTicket} />
        <Drawer.Screen name="Quản lý suất chiếu" component={AdminShowtime} />
        {/* <Drawer.Screen name="Seats Management" component={SeatsManagement} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
