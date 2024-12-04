import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import { API_URL } from "@env";
import { format, toZonedTime } from 'date-fns-tz';

const DashboardScreen = () => {
  const [startDate, setStartDate] = useState(new Date);
  const [endDate, setEndDate] = useState(new Date);
  const [userStats, setUserStats] = useState([]);
  const [movieRevenue, setMovieRevenue] = useState([]);
  const [movieTickets, setMovieTickets] = useState([]);

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  useEffect(() => {
    fetchUserStats();
    fetchMovieStats(); // Cập nhật dữ liệu khi quay lại màn hình
  }, [startDate, endDate]);

  const fetchUserStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/stats/users`, {
        params: {
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
        },
      });
      setUserStats(response.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMovieStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/stats/movies`, {
        params: {
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
        },
      });
      const data = response.data.stats;
      setMovieRevenue(data.map(item => ({ label: item.movie_title, value: item.revenue })) || []);
      setMovieTickets(data.map(item => ({ name: item.movie_title, population: item.tickets_sold, color: `#${Math.floor(Math.random()*16777215).toString(16)}`, legendFontColor: "#7F7F7F", legendFontSize: 15 })) || []);
    } catch (error) {
      console.error(error);
    }
  };

  const onStartTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setStartDate(currentDate)
    setShowStartPicker(false)
  };

  const onEndTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setEndDate(currentDate)
    setShowEndPicker(false)
  };

  const formatDate = (dateString) => { // Chuyển chuỗi thành đối tượng Date
    const date = toZonedTime(new Date(dateString), 'Asia/Bangkok');
    const timeZone = "Asia/Bangkok"; // Múi giờ mong muốn (UTC+7)
  
    return format(date, "dd-MM-yyyy", {timeZone: timeZone}); // Định dạng lại ngày (hoặc kiểu định dạng bạn muốn)
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <Text style={styles.label}>Chọn ngày bắt đầu:</Text>
          <TouchableOpacity
            style={styles.datePicker}
            onPress={() => setShowStartPicker(!showStartPicker)}
          >
            <Text style={styles.dateText}>
              {formatDate(startDate)}
            </Text>
          </TouchableOpacity>
          {showStartPicker && (
            <DateTimePicker
              mode="date"
              value={startDate}
              style={{backgroundColor: '#808080'}}
              onChange={onStartTimeChange}
            />
          )}
        </View>
        <View>
          <Text style={styles.label}>Chọn ngày kết thúc:</Text>
          <TouchableOpacity
            style={styles.datePicker}
            onPress={() => setShowEndPicker(!showEndPicker)}
          >
            <Text style={styles.dateText}>
              {formatDate(endDate)}
            </Text>
          </TouchableOpacity>
          {showEndPicker && (
            <DateTimePicker
              mode="date"
              value={endDate}
              style={{backgroundColor: '#808080'}}
              onChange={onEndTimeChange}
            />
          )}
        </View>
      </View>
      <Text style={styles.title}>Lượng người dùng đăng ký mới</Text>
      {userStats.length > 0 && (
        <LineChart
          data={{
            labels: userStats.map(stat => formatDate(stat.date)),
            datasets: [{ data: userStats.map(stat => stat.count) }],
          }}
          width={Dimensions.get("window").width - 32}
          height={250}
          chartConfig={chartConfig}
          bezier
          style={{borderRadius: 14}}
        />
      )}
      {userStats.length <= 0 && (
        <View>
          <Text style={{color: '#ff0000', textAlign: 'center', fontWeight: 'bold', marginVertical: 30, fontSize: 16}}>Không có dữ liệu</Text>
        </View>
      )}

      <Text style={styles.title}>Doanh thu theo phim (vnd)</Text>
      {movieRevenue.length > 0 && (
        <BarChart
          data={{
            labels: movieRevenue.map(item => item.label),
            datasets: [{ data: movieRevenue.map(item => item.value) }],
          }}
          width={Dimensions.get("window").width - 32}
          height={300}
          style={{borderRadius: 14}}
          chartConfig={chartConfig}
        />
      )}
      {movieRevenue.length <= 0 && (
        <View>
          <Text style={{color: '#ff0000', textAlign: 'center', fontWeight: 'bold', marginVertical: 30, fontSize: 16}}>Không có dữ liệu</Text>
        </View>
      )}

      <Text style={styles.title}>Lượng vé bán ra</Text>
      {movieTickets.length > 0 && (
        <PieChart
          data={movieTickets}
          width={Dimensions.get("window").width - 32}
          height={220}
          chartConfig={chartConfig}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          absolute
        />
      )}
      {movieTickets.length <= 0 && (
        <View>
          <Text style={{color: '#ff0000', textAlign: 'center', fontWeight: 'bold', marginVertical: 30, fontSize: 16}}>Không có dữ liệu</Text>
        </View>
      )}
    </ScrollView>
  );
};

const chartConfig = {
  backgroundGradientFrom: "#D31027",
  backgroundGradientTo: "#EA384D",
  decimalPlaces: 0,
  strokeWidth: 5,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1e1e1e'
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 16,
    color: '#fff'
  },
  label: {
    fontSize: 16,
    color: '#fff',
  },
  dateText: {
    fontSize: 15,
    color: '#fff',
    marginVertical: 10
  },
  datePicker: {
    backgroundColor: '#333',
    padding: 5,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
  },
});

export default DashboardScreen;
