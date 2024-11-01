import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { View, Text, TouchableOpacity, Image } from "react-native";

import { icons } from "../constants";

const TaskCard = ({ task }) => {
  return (
    <View className="bg-[#FFFFFF] flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <Text>TASKS</Text>
      </View>
    </View>
  );
};

export default TaskCard;
