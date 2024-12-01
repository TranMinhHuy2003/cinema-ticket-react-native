import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from './context/AuthContext';
import LoginScreen from './screens/User/LoginScreen';
import RegisterScreen from './screens/User/RegisterScreen';
import Customer from './screens/User/Customer';
import Admin from './screens/Admin/Admin';

const Stack = createNativeStackNavigator();

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null); 
    const [userId, setUserId] = useState(null);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userRole, setUserRole, userId, setUserId }}>
            <NavigationContainer>
                <Stack.Navigator>
                    {isAuthenticated ? (
                        userRole === 'admin' ? (
                            <Stack.Screen
                                name="Admin"
                                component={Admin}
                                options={{ headerShown: false }}
                            />
                        ) : (
                            <Stack.Screen
                                name="Customer"
                                component={Customer}
                                options={{ headerShown: false }}
                            />
                        )
                    ) : (
                        <>
                            <Stack.Screen
                                name="Login"
                                component={LoginScreen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Register"
                                component={RegisterScreen}
                                options={{ headerShown: false }}
                            />
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
}
