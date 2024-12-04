import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../context/AuthContext';

// Import các màn hình
import HomeScreen from './HomeScreen';
import UserInfo from './UserInfo';
import YourTicket from './YourTicket';
import SalesPromotionList from '../SalesPromotionList';
import SalesPromotionDetail from '../SalesPromotionDetail';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const SalesPromotionStack = () => (
  <Stack.Navigator>
    {/* Ẩn header cho SalesPromotionList */}
    <Stack.Screen
      name="SalesPromotionList"
      component={SalesPromotionList}
      options={{
        headerShown: false, // Ẩn header cho màn hình SalesPromotionList
      }}
    />
    {/* Tùy chỉnh header cho SalesPromotionDetail */}
    <Stack.Screen
      name="SalesPromotionDetail"
      component={SalesPromotionDetail}
      options={{
        title: 'Chi Tiết Khuyến Mãi', // Tiêu đề màn hình
        headerStyle: {
          backgroundColor: '#1e1e1e', // Màu nền header
        },
        headerTintColor: '#ff0000', // Màu nút back
        headerTitleStyle: {
          color: '#fff', // Màu chữ header
        },
      }}
    />
  </Stack.Navigator>
);

export default function Customer() {
  const { setIsAuthenticated, setUserRole } = useContext(AuthContext);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null); // Reset trạng thái người dùng
  };

  // Kiểm tra các route để ẩn hoặc hiện header của Drawer
  function getHiddenDrawer(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Homepage';

    switch (routeName) {
      case 'MovieList':
        return false;
      case 'MovieDetails':
        return true;
      case 'BookingTheater':
        return true;
      case 'BookingSeats':
        return true;
      case 'Payment':
        return true;
      case 'SalesPromotionList':
        return false;
      case 'SalesPromotionDetail':
        return true;
    }
  }

  return (
    <Drawer.Navigator
      initialRouteName="HomePage"
      screenOptions={({ navigation, route }) => ({
        headerStyle: {
          backgroundColor: '#1e1e1e',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color: '#fff',
        },
        drawerStyle: {
          backgroundColor: '#1e1e1e',
        },
        drawerActiveTintColor: '#ff0000',
        drawerInactiveTintColor: '#fff',
        headerTintColor: '#ff0000',
        headerLeft: getHiddenDrawer(route)
          ? null
          : () => (
              <TouchableOpacity
                onPress={() => navigation.toggleDrawer()}
                style={styles.menuButton}
              >
                <Icon name="menu-outline" size={30} color="#ff0000" />
              </TouchableOpacity>
            ),
        headerRight: getHiddenDrawer(route)
          ? null
          : () => (
              <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                <Icon name="log-out-outline" size={24} color="#ff0000" />
              </TouchableOpacity>
            ),
        headerShown: !getHiddenDrawer(route), // Ẩn header nếu ở màn hình cần ẩn
      })}
    >
      <Drawer.Screen name="HomePage" component={HomeScreen} options={{ title: 'Trang Chủ' }} />
      <Drawer.Screen name="UserInfo" component={UserInfo} options={{ title: 'Thông Tin Tài Khoản' }} />
      <Drawer.Screen name="YourTicket" component={YourTicket} options={{ title: 'Vé Của Bạn' }} />
      <Drawer.Screen
        name="SalesPromotionStack"
        component={SalesPromotionStack}
        options={{ title: 'Ưu đãi và thông báo' }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    marginLeft: 15,
  },
  logoutButton: {
    marginRight: 15,
  },
});
