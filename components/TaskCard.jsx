import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { View, Text, TouchableOpacity, Image } from "react-native";

import { icons } from "../constants";

const TaskCard = ({ task }) => {
  console.log("TESTE TASK", task);
  const priorityColor = (priority) => {
    switch (priority) {
      case "alta":
        return "bg-[#fe5f55]"; // Red for high priority
      case "media":
        return "bg-[#edb54e]"; // Yellow for medium priority
      case "baixa":
        return "bg-[#1dc071]"; // Green for low priority
      default:
        return ""; // Default color for undefined priority
    }
  };
  const handleToggleCompleted = () => {};
  return (
    <View className="bg-[#FFFFFF] flex flex-col items-center px-4 mb-4">
      <View className="w-full flex flex-row gap-1 py-2 items-start justify-center bg-[#F5F7F9] rounded-[16px]">
        <View
          className=""
          style={{
            flex: 0.1,
          }}
        >
          <View className="flex flex-row  items-center">
            <View
              className={`w-[34px] h-[34px]  cursor-pointer flex justify-center items-center rounded-md border-[#C6CFDC] border-[2px] ${
                task?.completed ? "bg-[#1dc071] border-[#1dc071]" : ""
              }`}
              onClick={() => handleToggleCompleted(task)}
            >
              {task?.completed && (
                <Image
                  source={icons.check}
                  resizeMode="contain"
                  className="w-4 h-4 rounded-lg "
                />
              )}
            </View>
            
          </View>
        </View>
        <View
          style={{
            flex: 0.6,
          }}
          className=" flex flex-col gap-y-1 justify-center items-start"
        >
          <Text
            className={`text-[#FFFFFF] p-1  ml-1 rounded-md font-epilogue ${priorityColor(
              task.priority
            )}`}
          >
            {task.priority}
          </Text>
          <Text
              className={`font-epilogue ${
                task?.completed ? "line-through" : ""
              } font-bold text-[16px] px-1  leading-[30px] text-[#818183]`}
            >
              {task?.title}
            </Text>
          <Text className="text-[14px] pl-2 font-bold text-[#8D9CB8]">{task?.description}</Text>
        </View>
        <View
          className="flex flex-row justify-between gap-x-1 items-center pr-1"
          style={{
            flex: 0.2,
          }}
        >
          <TouchableOpacity className=" bg-[#FFFFFF] justify-center items-center w-8 h-8 rounded-[12px] ">
            <Image source={icons.edit} className="w-4 h-4" />
          </TouchableOpacity>
          <TouchableOpacity className=" bg-[#FFFFFF] justify-center items-center w-8 h-8 rounded-[12px] ">
            <Image source={icons.trash} className="w-4 h-4" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TaskCard;
