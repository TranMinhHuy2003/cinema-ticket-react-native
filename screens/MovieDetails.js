import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, Button, StyleSheet, Dimensions,TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import YoutubeIframe from "react-native-youtube-iframe";
import { API_URL, VID_API } from "@env";

const { width } = Dimensions.get("window");

const MovieDetails = ({ route, navigation }) => {
  // const { movieId } = route.params;
  // const [movie, setMovie] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // useEffect(() => {
  //   axios
  //   .get(http://192.168.0.107:8000/movies/${movieId})
  //   .then((response) => setMovie(response.data))
  //   .catch((error) => console.error(error))
  // }, []);

  // if (!movie) {
  //   return <Text>Loading...</Text>;
  // }

  const movies = [
    {
      posterUrl: "https://i.ebayimg.com/images/g/B8oAAOSw2fdg5A-h/s-l1200.jpg",
      title: "INCEPTION",
      genres: ["Action", "Sci-Fi", "Thriller"],
      duration: 148,
      releaseDate: "2010-07-16",
      imdbRating: 8.8,
      rottenTomatoesRating: 87,
      description:
      "A skilled thief, the absolute best in the dangerous art of extraction, steals valuable secrets from deep within the subconscious during the dream state.",
      trailerUrl: "LifqWf0BAOA",
    },
  ];
  
  const movie = movies[0];

  const fetchYoutubeMeta = async (videoId) => {
    const apiKey = VID_API;
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${movie.trailerUrl}&key=${apiKey}&part=snippet,contentDetails,statistics`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        return data.items.snippet;
      }
    } catch (error) {
      console.error("Error fetching video metadata:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const metadata = await fetchYoutubeMeta(movie.trailerUrl);
      if (metadata) {
        setVideoTitle(metadata.title);
        setVideoDescription(metadata.description);
      }
    };

    fetchData();
  }, [movie.trailerUrl]);

  const formattedDuration = `${Math.floor(movie.duration / 60)} giờ ${movie.duration % 60} phút`;
  const formattedReleaseDate = new Date(movie.releaseDate).toLocaleDateString("en-GB");

  const displayDescription = showFullDescription ? movie.description : movie.description.split(" ").slice(0, 25).join(" ") + "...";
  const isRotten = movie.rottenTomatoesRating < 60;
  const rottenTomatoesIcon = isRotten ? 
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Rotten_Tomatoes_rotten.svg/1200px-Rotten_Tomatoes_rotten.svg.png" :
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Rotten_Tomatoes.svg/757px-Rotten_Tomatoes.svg.png" ; 

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <YoutubeIframe
          height={width * 0.55}
          videoId={movie.trailerUrl}
          // videoId={movieId}
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
          <View style={[styles.ratingBox, {flex: 1}]}>
            <Image
              source={{ uri: "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/171_Imdb_logo_logos-512.png" }}
              style={styles.ratingIcon}
            />
            <Text style={styles.ratingText}>IMDb: {movie.imdbRating}</Text>
          </View>
          <View style={[styles.ratingBox, {flex: 2}]}>
            <Image source={{ uri: rottenTomatoesIcon }} style={styles.ratingIcon} />
            <Text style={styles.ratingText}>Rotten Tomatoes: {movie.rottenTomatoesRating}%</Text>
          </View>
        </View>

        <View style={styles.line}></View>
        <Text style={styles.contentTitle}>Nội dung</Text>
        <Text style={styles.description}>
          {displayDescription}
          <TouchableOpacity onPress={() => setShowFullDescription(!showFullDescription)}>
            <Text style={styles.readMoreText}>
              {showFullDescription ? "Thu gọn" : "Xem thêm"}
            </Text>
          </TouchableOpacity>
        </Text>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button
          title="Đặt Vé Ngay"
          onPress={() => navigation.navigate("BookingTheater", { movieTitle: movie.title, moviePoster: movie.posterUrl })}
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
    borderTopColor: '#FFF',
    borderWidth: 1,
    marginVertical: 10
  },
  contentTitle: {
    color: "#fff",
    fontSize: 25,
  },
  ratingContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    gap: 20,
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
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
    marginBottom: 70,
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
});

export default MovieDetails;
