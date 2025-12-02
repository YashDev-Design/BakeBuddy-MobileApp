import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import AppNavigator from "./navigation/AppNavigator";
import { account } from "./appwrite/config";
import { CartProvider } from "./contexts/CartContext";
import { OrdersProvider } from "./contexts/OrdersContext";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkSession = async () => {
    try {
      await account.get();
      setIsLoggedIn(true);
    } catch (error) {
      setIsLoggedIn(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkSession();

    const interval = setInterval(checkSession, 500);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#d17b5f" />
      </View>
    );
  }

  return (
    <OrdersProvider>
      <CartProvider>
        <AppNavigator isLoggedIn={isLoggedIn} />
      </CartProvider>
    </OrdersProvider>
  );
}
