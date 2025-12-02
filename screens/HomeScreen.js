import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { playSound } from "../utils/sound";

const PRODUCTS = [
  {
    id: 1,
    name: "Chocolate Cake",
    price: "$12.99",
    image: require("../assets/images/cake.jpg"),
    category: "Cakes",
  },
  {
    id: 2,
    name: "Strawberry Pastry",
    price: "$4.99",
    image: require("../assets/images/pastry.jpg"),
    category: "Pastries",
  },
  {
    id: 3,
    name: "Butter Cookies",
    price: "$6.99",
    image: require("../assets/images/cookies.jpg"),
    category: "Cookies",
  },
  {
    id: 4,
    name: "Chocolate Cupcake",
    price: "$3.50",
    image: require("../assets/images/chocolate cupcake.jpg"),
    category: "Cupcakes",
  },
  {
    id: 5,
    name: "Vanilla Cupcake",
    price: "$3.50",
    image: require("../assets/images/vanilla cupcake.jpg"),
    category: "Cupcakes",
  },
  {
    id: 6,
    name: "Carrot Cupcake",
    price: "$3.50",
    image: require("../assets/images/carrot cupcake.jpg"),
    category: "Cupcakes",
  },
  {
    id: 7,
    name: "Chocolate Croissant",
    price: "$3.50",
    image: require("../assets/images/chocolate croissant.jpg"),
    category: "Croissants",
  },
  {
    id: 8,
    name: "Butter Croissant",
    price: "$3.50",
    image: require("../assets/images/butter croissant.jpg"),
    category: "Croissants",
  },
  {
    id: 9,
    name: "Sugar Cookie",
    price: "$3.50",
    image: require("../assets/images/vanilla cupcake.jpg"),
    category: "Cookies",
  },
  {
    id: 10,
    name: "Chocolate Chip Cookie",
    price: "$3.50",
    image: require("../assets/images/carrot cupcake.jpg"),
    category: "Cookies",
  },
];

const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_WIDTH = (SCREEN_WIDTH - 50) / 2; // perfect spacing for 2-column grid

export default function HomeScreen() {
  const { addToCart } = useContext(CartContext);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((item) => item.category === selectedCategory);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BakeBuddy</Text>
      <Text style={styles.subTitle}>Fresh & Delicious Every Day 🍰</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <Text style={styles.searchText}>Search for cakes, pastries...</Text>
      </View>

      {/* Categories */}
      <View style={styles.categoryContainer}>
        {["All", "Cakes", "Pastries", "Cookies", "Cupcakes", "Croissants"].map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryButton,
              selectedCategory === cat && styles.activeCategory,
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat && styles.activeCategoryText,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredProducts}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.card, { width: CARD_WIDTH }]}>
            <Image source={item.image} style={styles.image} />

            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                addToCart(item);
                playSound(require("../assets/sounds/ui-click-43196.mp3"));
              }}
            >
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff7f2",
    paddingTop: 40,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#d17b5f",
    textAlign: "center",
  },
  subTitle: {
    fontSize: 16,
    color: "#a6785a",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 15,
  },
  productName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#6e4a30",
    marginTop: 10,
    textAlign: "center",
  },
  price: {
    fontSize: 14,
    color: "#a6785a",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#d17b5f",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  searchContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  searchText: {
    color: "#999",
    fontSize: 15,
  },

  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: "#ffefe3",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#d17b5f",
  },
  activeCategory: {
    backgroundColor: "#d17b5f",
  },
  activeCategoryText: {
    color: "#fff",
  },
});
