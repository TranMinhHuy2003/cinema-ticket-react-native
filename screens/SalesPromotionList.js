import React from "react";
import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const promotions = [
  {
    id: 1,
    title: "CGV khuyến mãi vé phim chỉ từ 45k",
    startTime: "2024-11-01",
    endTime: "2024-11-15",
    image: "https://stc.shopiness.vn/deal/2020/10/23/f/e/4/6/1603443370684_540.jpg",
    description: [
      "Vé xem phim chỉ từ 45,000 VND tại tất cả các rạp CGV trên toàn quốc. Áp dụng cho các suất chiếu 2D từ thứ Hai đến thứ Sáu hàng tuần.",
    ],
    termsAndConditions: [
      "Áp dụng từ ngày 01/11/2024 đến ngày 15/11/2024.",
      "Không áp dụng vào ngày lễ hoặc cuối tuần.",
      "Không áp dụng đồng thời với các chương trình khuyến mãi khác.",
    ],
  },
  {
    id: 2,
    title: "[Hot] Khuyến mãi CGV Mua 2 tặng 1 với thẻ TPBank - VTC Mastercard!",
    startTime: "2024-11-10",
    endTime: "2024-11-20",
    image: "https://vtcpay.vn/media2/upload/images/news/images/650x340(19).jpg",
    description: [
      "Chương trình khuyến mãi đặc biệt dành cho khách hàng sử dụng thẻ TPBank - VTC Mastercard. Khi mua 2 vé xem phim, bạn sẽ được tặng thêm 1 vé miễn phí.",
    ],
    termsAndConditions: [
      "Áp dụng cho khách hàng thanh toán bằng thẻ TPBank - VTC Mastercard.",
      "Không áp dụng cho các suất chiếu đặc biệt (3D, IMAX, 4DX).",
      "Mỗi khách hàng chỉ được áp dụng tối đa 1 lần/ngày.",
    ],
  },
  {
    id: 3,
    title: "CGV - Xem phim chỉ 9K khi thanh toán bằng ZaloPay",
    startTime: "2024-11-05",
    endTime: "2024-11-25",
    image: "https://simg.zalopay.com.vn/zlp-website/assets/1x_CGV_Feb_9_K_0b2c54b7e2.jpg",
    description: [
      "Xem phim chỉ với 9,000 VND khi thanh toán bằng ví ZaloPay. Áp dụng cho tất cả các suất chiếu 2D tại CGV.",
    ],
    termsAndConditions: [
      "Chỉ áp dụng khi thanh toán bằng ví ZaloPay.",
      "Mỗi khách hàng được sử dụng tối đa 2 vé khuyến mãi/ngày.",
      "Áp dụng cho các suất chiếu từ thứ Hai đến Chủ Nhật.",
    ],
  },
];

const SalesPromotionList = () => {
  const navigation = useNavigation();

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const renderPromotion = ({ item }) => (
    <TouchableOpacity
      style={styles.promotionBox}
      onPress={() =>
        navigation.navigate("SalesPromotionDetail", { promotion: item })
      }
    >
      <Image source={{ uri: item.image }} style={styles.promotionImage} />
      <View style={styles.promotionContent}>
        <Text
          style={styles.promotionTitle}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.title}
        </Text>
        <Text style={styles.promotionDate}>
          {formatDate(item.startTime)} - {formatDate(item.endTime)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={promotions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPromotion}
      />
    </View>
  );
};

export default SalesPromotionList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    padding: 10,
  },
  promotionBox: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  promotionImage: {
    width: width - 20,
    height: (width - 20) * 0.5,
    resizeMode: "cover",
    alignSelf: "center",
  },
  promotionContent: {
    padding: 10,
  },
  promotionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  promotionDate: {
    fontSize: 14,
    color: "#666",
  },
});
