import React from "react";
import { View, Text, Image, StyleSheet, Dimensions, SectionList } from "react-native";

const { width } = Dimensions.get("window");

const SalesPromotionDetail = ({ route, navigation }) => {
  const { promotion } = route.params;

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const sections = [
    { title: "Nội dung khuyến mãi: ", data: promotion.description },
    { title: "Điều khoản và điều kiện: ", data: promotion.termsAndConditions },
  ];

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={
        <>
          <Image source={{ uri: promotion.image }} style={styles.promotionImage} />
          <View style={styles.headerContent}>
            <Text style={styles.title}>{promotion.title}</Text>
            <Text style={styles.date}>
              {formatDate(promotion.startTime)} - {formatDate(promotion.endTime)}
            </Text>
          </View>
        </>
      }
      renderSectionHeader={({ section }) => (
        <Text style={styles.sectionTitle}>{section.title}</Text>
      )}
      renderItem={({ item }) => (
        <Text style={styles.text}>{item}</Text>
      )}
      style={styles.container}
    />
  );
};

export default SalesPromotionDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
  },
  promotionImage: {
    width: width,
    height: width * 0.5,
    resizeMode: "cover",
  },
  headerContent: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffcc00",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
