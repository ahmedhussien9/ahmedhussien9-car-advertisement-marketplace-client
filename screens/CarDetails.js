import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
import { calendarTheme } from "../constants/calanderTheme";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Calendar } from "react-native-calendars";
import { SwipeablePanel } from "rn-swipeable-panel";
import moment from "moment";
import { config } from "../config";
const CarDetails = ({ navigation, route }) => {
  const carData = route.params;
  const sellerId = route.params.seller[0]["_id"];
  const [visiblePanel, setVisiablePanel] = useState(false);
  const [slotsData, setSlots] = useState([]);
  const [markedDates, setMarkedDates] = useState({
    selectedDate: "",
    markedDates: {},
  });

  const [panelProps, setPanelProps] = useState({
    fullWidth: true,
    openLarge: false,
    showCloseButton: true,
    onClose: () => closePanel(),
    onPressCloseButton: () => closePanel(),
  });
  const [selectedSlot, setSelectedSlot] = useState({
    id: 0,
    start: "",
    end: "",
    date: "",
  });

  const _keyExtractor = (slot, index) => index.toString();

  useEffect(() => {
    fetchData();
  }, []);

  const selectSlotHandler = (slot) => {
    setSelectedSlot((prevState) => ({
      ...prevState,
      id: slot.id,
      start: slot.start,
      end: slot.end,
    }));
  };

  const selectDateHandler = (date) => {
    let markedDates = {};
    markedDates[date] = {
      selected: true,
      color: COLORS.primary,
      textColor: COLORS.white,
      selectedColor: COLORS.primary,
    };
    let serviceDate = moment(date);
    serviceDate = serviceDate.format("DD.MM.YYYY");

    setMarkedDates({
      selectedDate: serviceDate,
      markedDates: markedDates,
    });

    setSelectedSlot((prevState) => ({
      ...prevState,
      date: date,
    }));
  };

  async function fetchData() {
    try {
      const response = await fetch(`${config.baseUrl}timeslot/${sellerId}`);
      const json = await response.json();
      console.log(json);
      const slots = json.body.slots.slice(0, -1);
      setSlots(slots);
    } catch (e) {
      console.error(e);
    }
  }

  const togglePanel = () => {
    setVisiablePanel(!visiblePanel);
  };

  const closePanel = () => {
    setVisiablePanel(false);
  };

  const SlotComponent = ({ slot }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          width: "33.3%",
          marginVertical: 10,
        }}
        key={slot.id}
        onPress={() => selectSlotHandler(slot)}
      >
        <View
          style={{
            marginHorizontal: 5,
            flex: 1,
            backgroundColor: slot.id === selectedSlot.id ? COLORS.primary : "",
            color: slot.id === selectedSlot.id ? COLORS.white : "",
            borderRadius: 10,
            borderWidth: 2,
            borderRadius: 100,
            borderColor: "#f1f1f1",
          }}
        >
          <Text
            style={{
              height: 50,
              fontSize: 15,
              fontWeight: "bold",
              textAlign: "center",
              textAlignVertical: "center",
              color: slot.id === selectedSlot.id ? COLORS.white : COLORS.black,
            }}
          >
            {slot.start} - {slot.end}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView styles={styles.container}>
      <View style={styles.header}>
        <Icon
          name="arrow-back"
          size={SIZES.icons}
          style={{ color: COLORS.black }}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: carData.image }}
          style={{
            resizeMode: "contain",
            width: 300,
            height: 150,
          }}
        />
      </View>

      <View style={styles.detailsContainer}>
        <View
          style={{
            marginLeft: 20,
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <View style={styles.line} />
          <Text
            style={{ fontSize: 18, fontWeight: "bold", color: COLORS.black }}
          >
            Best choice
          </Text>
        </View>
        <View
          style={{
            marginLeft: 20,
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              color: COLORS.primary,
            }}
          >
            {carData.name}
          </Text>
          <View style={styles.priceTag}>
            <Text
              style={{
                marginLeft: 15,
                color: COLORS.white,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              ${35000}
            </Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          <Text
            style={{ fontSize: 20, fontWeight: "bold", color: COLORS.black }}
          >
            About
          </Text>
          <Text
            style={{
              color: "grey",
              fontSize: 16,
              lineHeight: 22,
              marginTop: 10,
            }}
          >
            {carData.description}
          </Text>
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.bookBtn}>
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 18,
                  fontWeight: "bold",
                }}
                onPress={togglePanel}
              >
                Book appointment
              </Text>
            </View>
          </View>
        </View>

        <View>
          <SwipeablePanel
            {...panelProps}
            isActive={visiblePanel}
            onClose={() => setVisiablePanel(false)}
          >
            <View style={{ flex: 1, marginHorizontal: 10 }}>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={[
                    FONTS.h3,
                    {
                      color: COLORS.black,
                      display: "flex",
                      justifyContent: "center",
                      marginVertical: 15,
                    },
                  ]}
                >
                  Please select date and time
                </Text>
              </View>
              <TouchableOpacity activeOpacity={0.8}>
                <Calendar
                  style={{
                    borderColor: COLORS.lightGray,
                  }}
                  theme={calendarTheme}
                  hideArrows={true}
                  markedDates={markedDates.markedDates}
                  enableSwipeMonths={false}
                  markingType={"multi-dot"}
                  minDate={"2019-05-01"}
                  onDayPress={(day) => {
                    selectDateHandler(day.dateString);
                  }}
                />
              </TouchableOpacity>
              <SafeAreaView style={{ flex: 1 }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {slotsData.map((item, index) => {
                    return <SlotComponent slot={item} />;
                  })}
                </View>

                <View
                  style={{ flex: 1, marginVertical: 20, marginHorizontal: 10 }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: COLORS.primary,
                    }}
                  >
                    Booking Date : {selectedSlot.date} - {selectedSlot.start} -{" "}
                    {selectedSlot.end}
                  </Text>
                </View>
              </SafeAreaView>

              <View style={[styles.bookBtn, { marginVertical: 20 }]}>
                <Text
                  style={{
                    color: COLORS.white,
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                  onPress={togglePanel}
                >
                  Confirm
                </Text>
              </View>
            </View>
          </SwipeablePanel>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
  },
  header: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageContainer: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    height: "20%",
  },
  detailsContainer: {
    display: "flex",
    marginHorizontal: 7,
    marginBottom: 7,
    borderRadius: 20,
    marginTop: 30,
    paddingTop: 30,
    backgroundColor: COLORS.light,
    height: "100%",
  },
  line: {
    width: 25,
    height: 2,
    backgroundColor: COLORS.black,
    marginBottom: 5,
    marginRight: 3,
  },
  borderBtn: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 40,
  },
  borderBtnText: { fontWeight: "bold", fontSize: 28 },
  bookBtn: {
    flex: 1,
    height: 50,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  priceTag: {
    backgroundColor: COLORS.primary,
    width: 80,
    height: 40,
    justifyContent: "center",
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
});
export default CarDetails;
