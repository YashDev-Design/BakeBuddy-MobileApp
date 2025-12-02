import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { OrdersContext } from "../contexts/OrdersContext";

export default function OrdersScreen() {
  const { orders } = useContext(OrdersContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Orders</Text>

      {orders.length === 0 ? (
        <Text style={styles.empty}>No orders placed yet 😴</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.orderCard}>
              <Text style={styles.date}>{item.date}</Text>

              {item.items.map((p) => (
                <Text key={p.id} style={styles.itemText}>
                  • {p.name} × {p.qty}
                </Text>
              ))}

              <Text style={styles.total}>Total: ${item.total}</Text>
            </View>
          )}
        />
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
    textAlign: "center",
    color: "#d17b5f",
    marginBottom: 20,
  },
  empty: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 40,
    color: "#a6785a",
  },
  orderCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
  },
  date: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6e4a30",
    marginBottom: 8,
  },
  itemText: {
    fontSize: 15,
    color: "#6e4a30",
  },
  total: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#d17b5f",
  },
});
