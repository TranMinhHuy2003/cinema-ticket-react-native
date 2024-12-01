import { createContext, useState } from 'react';

export const AuthContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    userRole: null,
    setUserRole: () => {},
    userId: null, // Thông tin user_id
    setUserId: () => {}, // Hàm để cập nhật user_id
});