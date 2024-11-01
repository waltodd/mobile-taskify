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
import CourseCard from "@/components/CourseCard";
import { icons, images } from "@/constants";

const Courses = () => {
  // Fetch courses from the API
  // const { data: courses, loading, error } = useFetch<Course[]>(`/(api)/course`);

  const handleDestinationPress = () => {
    // Handle destination press logic here
  };

  // If loading, show an activity indicator
  // if (loading) {
  //   return (
  //     <SafeAreaView className="flex-1 bg-white px-4">
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </SafeAreaView>
  //   );
  // }

  // // If there's an error, show an error message
  // if (error) {
  //   return (
  //     <SafeAreaView className="flex-1 bg-white px-4">
  //       <Text className="text-red-500">Error fetching courses: {error.message}</Text>
  //     </SafeAreaView>
  //   );
  // }

  return <SafeAreaView className="flex-1 bg-[#F8F7F7] px-4"></SafeAreaView>;
};

export default Courses;
