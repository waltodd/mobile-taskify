import { useUser } from "@clerk/clerk-expo";
import { useAuth } from "@clerk/clerk-expo";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import GoogleTextInput from "@/components/GoogleTextInput";
import Map from "@/components/Map";
import CourseCard from "@/components/CourseCard";
import { icons, images } from "@/constants";
// import { useFetch } from "@/lib/fetch";
// import { useLocationStore } from "@/store";
// import { Course } from "@/types/type";

const Home = () => {
  // const { user } = useUser();
  // const { signOut } = useAuth();


  const handleSignOut = () => {
    // signOut();
    // router.replace("/(auth)/sign-in");
  };

  const [hasPermission, setHasPermission] = useState<boolean>(false);

  // const {
  //   data: courses,
  //   loading,
  //   error,
  // } = useFetch<Course[]>(`/(api)/course`);

  // console.log(`HOMEEE${courses}`)

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       setHasPermission(false);
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});

  //     const address = await Location.reverseGeocodeAsync({
  //       latitude: location.coords?.latitude!,
  //       longitude: location.coords?.longitude!,
  //     });

  //     setUserLocation({
  //       latitude: location.coords?.latitude,
  //       longitude: location.coords?.longitude,
  //       address: `${address[0].name}, ${address[0].region}`,
  //     });
  //   })();
  // }, []);

  // const handleDestinationPress = (location: {
  //   latitude: number;
  //   longitude: number;
  //   address: string;
  // }) => {
  //   setDestinationLocation(location);

  //   router.push("/(root)/find-ride");
  // };

  return (
    <SafeAreaView className="bg-general-500">
      Home
      
    </SafeAreaView>
  );
};

export default Home;
