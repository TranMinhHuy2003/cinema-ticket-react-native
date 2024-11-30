import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import YoutubeIframe from "react-native-youtube-iframe";
import { API_URL } from "@env";

const { width } = Dimensions.get("window");

const MovieDetail = ({ route, navigation }) => {
  const { movieId } = route.params; // Nhận movieId từ route
  const [movie, setMovie] = useState(null); // Dữ liệu phim
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [showFullDescription, setShowFullDescription] = useState(false); // Hiển thị toàn bộ nội dung mô tả

  // Gọi API để lấy dữ liệu phim
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${API_URL}/movies/${movieId}`);
        setMovie(response.data);
      } catch (error) {
        console.error(error);
        Alert.alert("Lỗi", "Không thể tải thông tin phim!");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF0000" />
      </View>
    );
  }

  if (!movie) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Không tìm thấy thông tin phim!</Text>
      </View>
    );
  }

  // Định dạng dữ liệu
  const formattedDuration = `${Math.floor(movie.duration / 60)} giờ ${
    movie.duration % 60
  } phút`;
  const formattedReleaseDate = new Date(movie.releaseDate).toLocaleDateString(
    "en-GB"
  );
  const displayDescription = showFullDescription
    ? movie.description
    : movie.description.split(" ").slice(0, 25).join(" ") + "...";

  const isRotten = movie.rottenTomatoesRating < 60;
  const rottenTomatoesIcon = isRotten
    ? "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Rotten_Tomatoes_rotten.svg/1200px-Rotten_Tomatoes_rotten.svg.png"
    : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Rotten_Tomatoes.svg/757px-Rotten_Tomatoes.svg.png";

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <YoutubeIframe
          height={width * 0.55}
          videoId={movie.trailerUrl}
          onError={(e) => console.log(e)}
          onReady={() => console.log("Video is ready")}
        />
        <View style={styles.contentContainer}>
          <Image source={{ uri: movie.posterUrl }} style={styles.poster} />
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{movie.title}</Text>
            <View style={styles.genresContainer}>
              {movie.genres.map((genre, index) => (
                <View key={index} style={styles.genreBox}>
                  <Text style={styles.text}>{genre}</Text>
                </View>
              ))}
            </View>
            <View style={styles.dateTimeContainer}>
              <View style={[styles.borderBox, { marginRight: 10 }]}>
                <MaterialIcons name="event" size={16} color="#FFF" />
                <Text style={styles.text}>{formattedReleaseDate}</Text>
              </View>
              <View style={styles.borderBox}>
                <MaterialIcons name="access-time" size={16} color="#FFF" />
                <Text style={styles.text}>{formattedDuration}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.line}></View>
        <Text style={styles.contentTitle}>Đánh giá</Text>
        <View style={styles.ratingContainer}>
          <View style={[styles.ratingBox, { flex: 1 }]}>
            <Image
              source={{
                uri: "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/171_Imdb_logo_logos-512.png",
              }}
              style={styles.ratingIcon}
            />
            <Text style={styles.ratingText}>IMDb: {movie.imdbRating}</Text>
          </View>
          <View style={[styles.ratingBox, { flex: 2 }]}>
            <Image source={{ uri: rottenTomatoesIcon }} style={styles.ratingIcon} />
            <Text style={styles.ratingText}>
              Rotten Tomatoes: {movie.rottenTomatoesRating}%
            </Text>
          </View>
        </View>

        <View style={styles.line}></View>
        <Text style={styles.contentTitle}>Nội dung</Text>
        <Text style={styles.description}>
          {displayDescription}
          <TouchableOpacity
            onPress={() => setShowFullDescription(!showFullDescription)}
          >
            <Text style={styles.readMoreText}>
              {showFullDescription ? "Thu gọn" : "Xem thêm"}
            </Text>
          </TouchableOpacity>
        </Text>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button
          title="Đặt Vé Ngay"
          onPress={() =>
            navigation.navigate("BookingTheater", { movieTitle: movie.title })
          }
          color="#FF0000"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
  },
  scrollContainer: {
    flex: 1,
    padding: 10,
  },
  contentContainer: {
    flexDirection: "row",
  },
  poster: {
    width: width * 0.3,
    height: width * 0.5,
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  genresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 5,
  },
  genreBox: {
    borderWidth: 1,
    borderColor: "#FFF",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 5,
    marginBottom: 5,
  },
  text: {
    color: "#fff",
    fontSize: 12,
    paddingVertical: 2,
  },
  dateTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  borderBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFF",
    borderRadius: 5,
    padding: 5,
    marginVertical: 5,
  },
  line: {
    borderTopColor: "#FFF",
    borderWidth: 1,
    marginVertical: 10,
  },
  contentTitle: {
    color: "#fff",
    fontSize: 25,
  },
  ratingContainer: {
    marginVertical: 10,
    flexDirection: "row",
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingIcon: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  ratingText: {
    color: "#fff",
    fontSize: 16,
  },
  description: {
    color: "#fff",
    marginVertical: 10,
    fontSize: 16,
  },
  readMoreText: {
    color: "#FFD700",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
  },
  errorText: {
    color: "#FF0000",
    fontSize: 18,
  },
});

export default MovieDetail;
