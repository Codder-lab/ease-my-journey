import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";

export default function Discover() {
  const [destinations, setDestinations] = useState([]);
  const [visibleDestinations, setVisibleDestinations] = useState([]);
  const [trending, setTrending] = useState([]);
  const [visibleTrending, setVisibleTrending] = useState([]);
  const [search, setSearch] = useState("");
  const [destLoadCount, setDestLoadCount] = useState(20); // Number of destinations to load
  const [trendLoadCount, setTrendLoadCount] = useState(5); // Number of trending trips to load
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDestinations();
    fetchTrendingTrips();
  }, []);

  const fetchDestinations = async () => {
    setLoading(true);
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
        {
          id: 9,
          name: "France",
          image:
            "https://cdn.britannica.com/41/9441-050-809E2CBE/Eiffel-Tower-Paris.jpg",
          rating: 4.8,
        },
        {
          id: 10,
          name: "Spain",
          image:
            "https://static.toiimg.com/thumb/112547424/Top-5-tourist-destinations-in-Spain.jpg?width=1200&height=900",
          rating: 4.7,
        },
        {
          id: 11,
          name: "Australia",
          image:
            "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXVzdHJhbGlhfGVufDB8fDB8fHww",
          rating: 4.9,
        },
        {
          id: 12,
          name: "Canada",
          image:
            "https://www.avanse.com/blogs/images/28-mar-2023-blog.jpg",
          rating: 4.8,
        },
        {
          id: 13,
          name: "Brazil",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Cidade_Maravilhosa.jpg/800px-Cidade_Maravilhosa.jpg",
          rating: 4.6,
        },
        {
          id: 14,
          name: "South Africa",
          image:
            "https://www.planetware.com/wpimages/2019/09/south-africa-in-pictures-most-beautiful-places-to-visit-cape-town.jpg",
          rating: 4.7,
        },
        {
          id: 15,
          name: "Egypt",
          image:
            "https://t3.ftcdn.net/jpg/01/01/14/12/360_F_101141241_KuMSNHvZaXQL2yQFWbLQwxMwdUozduzo.jpg",
          rating: 4.5,
        },
        {
          id: 16,
          name: "Turkey",
          image:
            "https://smileytrips.com/uploads/blog/1702363260_turle.jpeg",
          rating: 4.8,
        },
        {
          id: 17,
          name: "Mexico",
          image:
            "https://static.toiimg.com/photo/44971199.cms",
          rating: 4.6,
        },
        {
          id: 18,
          name: "Argentina",
          image:
            "https://cdn.britannica.com/40/195440-050-B3859318/Congressional-Plaza-building-National-Congress-Buenos-Aires.jpg",
          rating: 4.7,
        },
        {
          id: 19,
          name: "Switzerland",
          image:
            "https://www.routeperfect.com/blog/wp-content/uploads/2023/06/swiss_first_timer_top_5_cities_to_visit_in_switzerland.jpeg",
          rating: 4.9,
        },
        {
          id: 20,
          name: "Maldives",
          image:
            "https://www.travelandleisure.com/thmb/N_r_xMvHfYjCHgZE-9bAWNiVAwU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-conrad-maldives-rangali-island-MALDIVESHOTELS1024-6dfdeac00fec4f69893e7576b5896da9.jpg",
          rating: 4.8,
        },
    ];
    setDestinations(data);
    setVisibleDestinations(data.slice(0, destLoadCount)); // Load initial destinations
    setLoading(false);
  };

  const fetchTrendingTrips = async () => {
    setLoading(true);
    const data = [
      {
        id: 1,
        name: "Hiking in the Alps",
        image: "https://www.mtsobek.com/nitropack_static/aBwthfDLsZqGYpagCyAFteriaJiDCBzD/assets/images/optimized/rev-4516bc9/mtsobek.imgix.net/2022/11/e258a098757d049a97c5f162a5e29adb.Alps-Hiking-1-scaled.jpg",
        price: "₹50,000",
      },
      {
        id: 2,
        name: "Surfing in Bali",
        image: "https://ik.imagekit.io/tvlk/blog/2023/10/shutterstock_196449215-2.jpg",
        price: "₹40,000",
      },
      {
        id: 3,
        name: "Cycling in Amsterdam",
        image: "https://www.cathaypacific.com/content/dam/focal-point/cx/inspiration/2023/06/5-ways-to-explore-Amsterdam-by-bike-cycling-route-holland-netherland-Gettyimages-HERO.renditionimage.900.600.jpg",
        price: "₹70,000",
      },
      {
        id: 4,
        name: "Skydiving in Dubai",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/a4/d3/51/skydive-in-dubai-see.jpg?w=1200&h=1200&s=1",
        price: "₹85,000",
      },
      {
        id: 5,
        name: "Safari in Kenya",
        image: "https://imaraafricasafaris.com/wp-content/uploads/2020/11/image-147-1000x565.png.webp",
        price: "₹60,000",
      },
      {
        id: 6,
        name: "Northern Lights in Iceland",
        image: "https://touristjourney.com/wp-content/uploads/2021/09/shutterstock_1319416262-1024x523.jpg",
        price: "₹1,20,000",
      },
      {
        id: 7,
        name: "Wine Tasting in France",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSha9OcAaVKlgiX7tcX43KLzjtEcbMxoNfV9g&s",
        price: "₹75,000",
      },
      {
        id: 8,
        name: "Desert Safari in Morocco",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/89/6f/c5/sahara-morocco.jpg?w=1200&h=-1&s=1",
        price: "₹65,000",
      },
      {
        id: 9,
        name: "Snorkeling in Maldives",
        image: "https://www.baros.com/wp-content/uploads/2023/08/Baros-Maldives_Underwater_Lifestyle-13.jpg",
        price: "₹55,000",
      },
      {
        id: 10,
        name: "Hot Air Balloon in Cappadocia",
        image: "https://www.freetworoam.com/wp-content/uploads/2023/11/IMG_1836.jpeg",
        price: "₹80,000",
      },
      {
        id: 11,
        name: "Temple Tour in Kyoto",
        image: "https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2024/06/28143121/kyoto-1.jpeg?tr=w-1200,q-60",
        price: "₹90,000",
      },
      {
        id: 12,
        name: "Wildlife Tour in Amazon",
        image: "https://www.bnesim.com/wp-content/uploads/2024/01/amazon-1024x681.webp",
        price: "₹1,00,000",
      },
      {
        id: 13,
        name: "Paragliding in Switzerland",
        image: "https://paragliding.ch/wp-content/uploads/2023/02/WhatsApp-Image-2021-07-11-at-14.45.44-900x675.jpeg",
        price: "₹95,000",
      },
      {
        id: 14,
        name: "Scuba Diving in Great Barrier Reef",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrEbM2A0r6VA58rkpsNtOPVjy8NUoft5IDaQ&s",
        price: "₹1,10,000",
      },
      {
        id: 15,
        name: "Aurora Watching in Norway",
        image: "https://res.cloudinary.com/simpleview/image/upload/v1638884119/clients/norway/alex_conu_reine_561c80b9-9ebc-4221-afbd-c12f259725a1.jpg",
        price: "₹1,30,000",
      },
      {
        id: 16,
        name: "Skiing in Canada",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX04IZhkK3Y1oGspyttxW6zt3RBB-pOgC10Q&s",
        price: "₹1,40,000",
      },
      {
        id: 17,
        name: "Kayaking in New Zealand",
        image: "https://socialnaturemovement.nz/wp-content/uploads/2021/06/IMG_E0703-scaled.jpg",
        price: "₹85,000",
      },
      {
        id: 18,
        name: "Whale Watching in South Africa",
        image: "https://triballionsafaris.com/wp-content/uploads/2023/12/Boat-whale-watching.jpg",
        price: "₹70,000",
      },
      {
        id: 19,
        name: "Jungle Trekking in Borneo",
        image: "https://www.placesofjuma.com/kinabatangan-river-cruise-wildlife-safari-borneo/kinabatangan-river-11/",
        price: "₹95,000",
      },
      {
        id: 20,
        name: "Island Hopping in Philippines",
        image: "https://thumbs.dreamstime.com/b/el-nido-philippines-nov-tourist-boat-tropical-island-lagoon-hopping-tour-mountain-sea-landscape-mountains-big-palawan-138123837.jpg",
        price: "₹60,000",
      }
    ];
    setTrending(data);
    setVisibleTrending(data.slice(0, trendLoadCount)); // Load initial trips
    setLoading(false);
  };

  // const loadMoreDestinations = () => {
  //   const newCount = destLoadCount + 3;
  //   setDestLoadCount(newCount);
  //   setVisibleDestinations(destinations.slice(0, newCount));
  // };

  const loadMoreTrending = () => {
    const newCount = trendLoadCount + 3;
    setTrendLoadCount(newCount);
    setVisibleTrending(trending.slice(0, newCount));
  };

  const filteredDestinations = visibleDestinations.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={{flex: 1}}>
      {loading && <ActivityIndicator size={"large"} color={Colors.PRIMARY} style={styles.loadingIndicator} />}
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

          {/* {visibleDestinations.length < destinations.length && (
            <TouchableOpacity
              style={styles.loadMoreBtn}
              onPress={loadMoreDestinations}
            >
              <Text style={styles.loadMoreText}>Load More</Text>
            </TouchableOpacity>
          )} */}

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: {
    fontSize: 30,
    //fontWeight: "bold",
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
    marginBottom: 25,
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
  name: { fontSize: 16, fontWeight: "600", marginTop: 2, marginBottom: 2, fontFamily: "outfit" },
  rating: { color: Colors.PRIMARY, marginTop: 2, marginBottom: 2, fontFamily: "outfit" },
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
  price: { fontSize: 14, color: "#00A86B", marginTop: 5, fontFamily: "outfit" },
  loadMoreBtn: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
    alignSelf: "flex-end",
  },
  loadMoreText: { color: "#fff", fontFamily: "outfit" },
  loadingIndicator: {
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: 999,
  },  
});