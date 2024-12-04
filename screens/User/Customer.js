import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../context/AuthContext';

// Import các màn hình
import HomeScreen from './HomeScreen';
import UserInfo from './UserInfo';
import YourTicket from './YourTicket';
import SalesPromotionList from '../SalesPromotionList'

const Drawer = createDrawerNavigator();

export default function Customer() {
  const { setIsAuthenticated, setUserRole } = useContext(AuthContext);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null); // Reset trạng thái người dùng
  };

  return (
    <Drawer.Navigator
      initialRouteName="HomePage"
      screenOptions={({ navigation }) => ({
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
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            style={styles.menuButton}
          >
            <Icon name="menu-outline" size={30} color="#ff0000" />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Icon name="log-out-outline" size={24} color="#ff0000" />
          </TouchableOpacity>
        ),
      })}
    >
      <Drawer.Screen name="HomePage" component={HomeScreen} options={{ title: 'Trang Chủ' }} />
      <Drawer.Screen name="SalesPromotionList" component={SalesPromotionList} options={{ title: 'Thông Tin Khuyến Mãi' }} />
      <Drawer.Screen name="UserInfo" component={UserInfo} options={{ title: 'Thông Tin Tài Khoản' }} />
      <Drawer.Screen name="YourTicket" component={YourTicket} options={{ title: 'Vé Của Bạn' }} />
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
