import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";

export default function Discover() {
  const [destinations, setDestinations] = useState([]);
  const [visibleDestinations, setVisibleDestinations] = useState([]);
  const [trending, setTrending] = useState([]);
  const [visibleTrending, setVisibleTrending] = useState([]);
  const [search, setSearch] = useState("");
  const [destLoadCount, setDestLoadCount] = useState(5); // Number of destinations to load
  const [trendLoadCount, setTrendLoadCount] = useState(5); // Number of trending trips to load

  useEffect(() => {
    fetchDestinations();
    fetchTrendingTrips();
  }, []);

  const fetchDestinations = async () => {
    const data = [
      {
        id: 1,
        name: "Vietnam",
        image:
          "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/a3/2a/f2/big-hand-ang-golden-bridge.jpg?w=600&h=400&s=1",
        rating: 4.8,
      },
      {
        id: 2,
        name: "Thailand",
        image:
          "https://www.traveltrendstoday.in/wp-content/uploads/2024/09/grand-palace-wat-phaew-thailand-scaled-1.jpg",
        rating: 4.7,
      },
      {
        id: 3,
        name: "Japan",
        image:
          "https://admin.expatica.com/jp/wp-content/uploads/sites/18/2023/11/tokyo-skyline-fuji.jpg",
        rating: 4.9,
      },
      {
        id: 4,
        name: "Bali",
        image:
          "https://www.outlooktravelmag.com/media/bali-1-1679062958.profileImage.2x-scaled-webp.webp",
        rating: 4.6,
      },
      {
        id: 5,
        name: "India",
        image:
          "https://i.natgeofe.com/k/42e832f5-fd48-43ff-b338-091bdf4048ca/india-tajmahal_16x9.jpg?w=1200",
        rating: 4.5,
      },
      {
        id: 6,
        name: "Italy",
        image:
          "https://thumbs.dreamstime.com/b/canal-grande-venice-italy-24625738.jpg",
        rating: 4.9,
      },
      {
        id: 7,
        name: "New Zealand",
        image:
          "https://t4.ftcdn.net/jpg/02/38/21/21/360_F_238212130_nzy3PSLBqhQZzW2XXzQIQedXzkDZjDkM.jpg",
        rating: 4.8,
      },
      {
        id: 8,
        name: "Greece",
        image:
          "https://handluggageonly.co.uk/wp-content/uploads/2015/05/Hand-Luggage-Only-7.jpg",
        rating: 4.7,
      },
    ];
    setDestinations(data);
    setVisibleDestinations(data.slice(0, destLoadCount)); // Load initial destinations
  };

  const fetchTrendingTrips = async () => {
    const data = [
      {
        id: 1,
        name: "Hiking in the Alps",
        image:
          "https://www.mtsobek.com/nitropack_static/aBwthfDLsZqGYpagCyAFteriaJiDCBzD/assets/images/optimized/rev-4516bc9/mtsobek.imgix.net/2022/11/e258a098757d049a97c5f162a5e29adb.Alps-Hiking-1-scaled.jpg",
        price: "₹50,000",
      },
      {
        id: 2,
        name: "Surfing in Bali",
        image:
          "https://ik.imagekit.io/tvlk/blog/2023/10/shutterstock_196449215-2.jpg",
        price: "₹40,000",
      },
      {
        id: 3,
        name: "Cycling in Amsterdam",
        image:
          "https://www.cathaypacific.com/content/dam/focal-point/cx/inspiration/2023/06/5-ways-to-explore-Amsterdam-by-bike-cycling-route-holland-netherland-Gettyimages-HERO.renditionimage.900.600.jpg",
        price: "₹70,000",
      },
      {
        id: 4,
        name: "Skydiving in Dubai",
        image:
          "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/a4/d3/51/skydive-in-dubai-see.jpg?w=1200&h=1200&s=1",
        price: "₹85,000",
      },
      {
        id: 5,
        name: "Safari in Kenya",
        image:
          "https://imaraafricasafaris.com/wp-content/uploads/2020/11/image-147-1000x565.png.webp",
        price: "₹60,000",
      },
      {
        id: 6,
        name: "Northern Lights in Iceland",
        image:
          "https://touristjourney.com/wp-content/uploads/2021/09/shutterstock_1319416262-1024x523.jpg",
        price: "₹1,20,000",
      },
      {
        id: 7,
        name: "Wine Tasting in France",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSha9OcAaVKlgiX7tcX43KLzjtEcbMxoNfV9g&s",
        price: "₹75,000",
      },
      {
        id: 8,
        name: "Desert Safari in Morocco",
        image:
          "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/89/6f/c5/sahara-morocco.jpg?w=1200&h=-1&s=1",
        price: "₹65,000",
      },
    ];
    setTrending(data);
    setVisibleTrending(data.slice(0, trendLoadCount)); // Load initial trips
  };

  const loadMoreDestinations = () => {
    const newCount = destLoadCount + 3;
    setDestLoadCount(newCount);
    setVisibleDestinations(destinations.slice(0, newCount));
  };

  const loadMoreTrending = () => {
    const newCount = trendLoadCount + 3;
    setTrendLoadCount(newCount);
    setVisibleTrending(trending.slice(0, newCount));
  };

  const filteredDestinations = visibleDestinations.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={
        <>
          <Text style={styles.title}>Discover New Places</Text>

          <TextInput
            style={styles.searchBar}
            placeholder="Search Destinations..."
            value={search}
            onChangeText={setSearch}
          />

          <FlatList
            data={filteredDestinations}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.cardFooter}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.rating}>⭐ {item.rating}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />

          {visibleDestinations.length < destinations.length && (
            <TouchableOpacity
              style={styles.loadMoreBtn}
              onPress={loadMoreDestinations}
            >
              <Text style={styles.loadMoreText}>Load More</Text>
            </TouchableOpacity>
          )}

          <Text style={styles.title}>Trending Trips & Deals</Text>
        </>
      }
      data={visibleTrending}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.trendingCard}>
          <Image source={{ uri: item.image }} style={styles.trendingImage} />
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>{item.price}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id.toString()}
      ListFooterComponent={
        visibleTrending.length < trending.length && (
          <TouchableOpacity
            style={[styles.loadMoreBtn, { marginBottom: 50 }]}
            onPress={loadMoreTrending}
          >
            <Text style={styles.loadMoreText}>Load More</Text>
          </TouchableOpacity>
        )
      }
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 15,
    marginTop: 15,
    fontFamily: "outfit-bold",
    color: Colors.ICON_DARKER,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  card: {
    marginRight: 15,
    width: 180,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginBottom: 15,
  },
  image: {
    width: 180,
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  name: { fontSize: 16, fontWeight: "600", marginTop: 5, fontFamily: "outfit" },
  rating: { color: "#777" },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  trendingCard: {
    marginBottom: 15,
    width: "100%",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
  },
  trendingImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  price: { fontSize: 14, color: "#00A86B", marginTop: 5 },
  loadMoreBtn: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
    alignSelf: "flex-end",
  },
  loadMoreText: { color: "#fff", fontWeight: "bold", fontFamily: "outfit" },
});
