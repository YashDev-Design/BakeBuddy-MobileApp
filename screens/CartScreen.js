import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { CartContext } from "../contexts/CartContext";
import { OrdersContext } from "../contexts/OrdersContext";
import { playSound } from "../utils/sound";

export default function CartScreen({ navigation }) {
  const { cart, removeFromCart, totalPrice, clearCart } =
    useContext(CartContext);
  const { addOrder } = useContext(OrdersContext);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    const newOrder = {
      id: Date.now(),
      items: cart,
      total: totalPrice.toFixed(2),
      date: new Date().toLocaleString(),
    };

    addOrder(newOrder);
    playSound(require("../assets/sounds/success-340660.mp3"));
    clearCart();
    alert("Order placed successfully!");
    navigation.navigate("Orders");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>

      {cart.length === 0 ? (
        <Text style={styles.empty}>Your cart is empty 🛒</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.name}>
                  {item.name} × {item.qty}
                </Text>
                <Text style={styles.price}>{item.price}</Text>

                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => {
                    removeFromCart(item.id);
                    playSound(require("../assets/sounds/pop-402324.mp3"));
                  }}
                >
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <Text style={styles.total}>Total: ${totalPrice.toFixed(2)}</Text>

          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={handleCheckout}
          >
            <Text style={styles.checkoutText}>Place Order</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff7f2",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#d17b5f",
    textAlign: "center",
  },
  empty: {
    fontSize: 18,
    marginTop: 30,
    color: "#a6785a",
    textAlign: "center",
  },
  item: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6e4a30",
  },
  price: {
    fontSize: 15,
    color: "#a6785a",
    marginBottom: 10,
  },
  removeButton: {
    backgroundColor: "#d17b5f",
    padding: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  removeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  total: {
    fontSize: 22,
    textAlign: "center",
    marginTop: 10,
    color: "#6e4a30",
  },
  checkoutButton: {
    backgroundColor: "#6e4a30",
    padding: 14,
    borderRadius: 10,
    marginTop: 15,
  },
  checkoutText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});
