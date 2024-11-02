import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { View, Text, TouchableOpacity, Image,Alert, ScrollView, } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { icons } from "../constants";
import { useGlobalContext } from "../context/GlobalProvider";
import { getCurrentUser, deleteTask } from "../lib/api";
import { Link, router } from "expo-router";

const TaskCard = ({ task }) => {
  const { user, setTask, setIsLogged,setUser } = useGlobalContext();
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

  const handleEditTask = async () => {
    if (!form.title || !form.description || !form.priority) {
      return Alert.alert("Forneça todos os campos");
    }

    // setSubmitting(true);

    const {value} = form.priority
    try {
      const response = await createTask({
        title: form.title,
        description: form.description,
        priority:  value,
      });

   

      if (response.ok) {

        const token = await AsyncStorage.getItem("authToken");
        const {tasks} = await getCurrentUser({token});
        setTask(tasks);
        Alert.alert("Success", "Tarefa criada com sucesso");
        // setIsLogged(true)
        router.replace("/home"); // Navigate to home screen
      } else {
        // If the response has a non-2xx status code
        // console.error("Sign-up failed:", data.message);
        Alert.alert("Error", "Algo correu mal, tente novamente");
       
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        description: "",
        priority: "",
      });

      setSubmitting(false);
    }
  };

  const handleDeleteTask = async () => {
    if (!task) {
      return Alert.alert("Forneça todos os campos");
    }
    const id  = task._id;
    try {
      const response = await deleteTask({
        id
      });

   

      if (response.ok) {

        const token = await AsyncStorage.getItem("authToken");
        const {tasks} = await getCurrentUser({token});
        setTask(tasks);
        Alert.alert("Success", "Tarefa apagada com sucesso");
        // setIsLogged(true)
        router.replace("/home"); // Navigate to home screen
      } else {
        // If the response has a non-2xx status code
        // console.error("Sign-up failed:", data.message);
        Alert.alert("Error", "Algo correu mal, tente novamente");
       
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      
    }
  };
  return (
    <ScrollView>
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
              onPress={() => handleToggleCompleted(task)}
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
          <TouchableOpacity className=" bg-[#333333] justify-center items-center w-8 h-8 rounded-[12px] "
          onPress={() => handleEditTask()}
          >
            <Image source={icons.edit} className="w-4 h-4" />
          </TouchableOpacity>
          <TouchableOpacity className=" bg-[#333333] justify-center items-center w-8 h-8 rounded-[12px] "
          onPress={() => handleDeleteTask(task)}
          >
            <Image source={icons.trash} className="w-4 h-4" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </ScrollView>
  );
};

export default TaskCard;
