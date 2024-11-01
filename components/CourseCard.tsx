import { useState, useEffect } from "react";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList, Image, TouchableOpacity, Text, View } from "react-native";
import image from "@/assets/images/estadisticas.png";
import arrow from "@/assets/images/right-arrow.png";

import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

interface Course {
  course_id: string;
  course_name: string;
  created_at: string;
  description: string; // Changed from number to string
  difficulty_level: "principiante" | "intermediário" | "avançado";
  image: any; // Add this property if you want to include images in the course
  price: number; // You can include price or any other relevant fields
}

interface CourseCardItemProps {
  activeItem: string;
  item: Course;
  handleSelectedCourse: (item: Course) => void;
  isSelected: boolean;
}

const CourseCardItem = ({
  activeItem,
  item,
  handleSelectedCourse,
  isSelected,
}: CourseCardItemProps) => {
  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.course_id ? zoomIn : zoomOut}
      duration={500}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        className="relative flex justify-center items-center py-4 rounded-[30px]"
        onPress={() => handleSelectedCourse(item)}
      >
        <LinearGradient
          colors={["#FF725E", "#FFBE9D"]}
          className="relative w-full flex justify-center items-center rounded-[30px]"
        >
          <Image
            source={{ uri: item.image }} // Ensure you have an image property in the Course interface
            className="w-[180px] h-[250px] rounded-tl-[30px] rounded-tr-[30px] rounded-br-[30px]"
            resizeMode="contain"
          />

          {/* {isSelected && (
          <Image
            source={images.check2} // Ensure `images` is defined elsewhere in your code
            className="w-6 h-6 absolute top-2 right-2 border-[#F9F9FA] border-[1px]"
            resizeMode="contain"
          />
        )} */}
          <View className="rounded-[30px] flex flex-row bg-[#FFFFFF] p-6  w-full justify-between items-center py-1">
            <View className="flex flex-col justify-start p-3 items-start">
            
              <Text className="text-lg font-bold text-[#15141F]">
                {item.course_name}
              </Text>
              <Text className="text-sm font-pmedium  rounded-md  text-[#A3A5A6]">
                {item.difficulty_level}
              </Text>
            </View>
            <View className="flex flex-row justify-start items-center">
              <Image
                source={arrow} // Ensure you have an image property in the Course interface
                className="w-6 h-6 rounded-tl-[30px] rounded-tr-[30px] rounded-br-[30px]"
                resizeMode="contain"
              />
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animatable.View>
  );
};

interface CourseCardProps {
  courses: Course[];
}

const CourseCard = ({ courses }: CourseCardProps) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<Course | null>(null);

  useEffect(() => {
    if (courses.length > 0) {
      setActiveItem(courses[0].course_id); // Set initial active item
    }
  }, [courses]);

  const handleSelectedCourse = (item: Course) => {
    setSelectedItem(item);
    // Additional logic for course selection can be added here
  };

  const viewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: any[];
  }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={courses}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      l
      keyExtractor={(item) => item.course_id}
      renderItem={({ item }) => (
        <CourseCardItem
          activeItem={activeItem || ""}
          item={item}
          handleSelectedCourse={handleSelectedCourse}
          isSelected={selectedItem?.course_id === item.course_id}
        />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
    />
  );
};

export default CourseCard;
