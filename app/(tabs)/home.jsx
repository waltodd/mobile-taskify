import React, { useState } from 'react';
import { SafeAreaView, FlatList, Image, TouchableOpacity, Text, View } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { images, icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from "expo-router";
import { PriorityTabs, TaskCard } from "../../components";

const Home = () => {
  const { user, tasks, setIsLogged, setUser } = useGlobalContext();

  // State to store selected priority for filtering
  const [selectedPriority, setSelectedPriority] = useState(null);

  // Filter pending tasks by selected priority
  const filteredTasks = tasks.filter(task => 
    !task.completed && (!selectedPriority || task.priority === selectedPriority.value)
  );

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      setIsLogged(false);
      setUser(null);
      router.replace("/sign-in");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <SafeAreaView className="bg-[#FFFFFF] h-full">
      <FlatList
        data={filteredTasks}
        keyExtractor={(task) => task._id}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => <TaskCard task={item} />}
        className="mt-8"
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6 mt-6">
            <View className="flex justify-between items-start flex-row mb-4">
              <View className="flex flex-row items-center">
                <Image source={images.logo} className="w-10 h-10 rounded-[10px]" resizeMode="contain" />
                <Text className="text-[20px] pl-2 font-bold text-[#3F3D56]">Taskify</Text>
              </View>
              <TouchableOpacity className="bg-[#F5F7F9] w-10 h-10 rounded-full justify-center items-center" onPress={handleLogout}>
                <Image source={icons.logout} className="w-5 h-5" />
              </TouchableOpacity>
            </View>
            <View className="flex flex-row items-center gap-x-2">
              <Text className="font-pmedium text-lg text-[#3F3D56]">Bem vindo</Text>
              <Text className="text-lg font-psemibold text-[#1dc071]">{user?.name} 👋</Text>
            </View>
            <View className="flex flex-row items-center gap-x-2">
              <Text className="text-sm text-[#8D9CB8]">
                Tem <Text className="text-sm font-psemibold text-[#1dc071]">{filteredTasks.length} </Text>tarefas para fazer.
              </Text>
            </View>
            <PriorityTabs 
            className=""
              title="Select Priority"
              selectedValue={selectedPriority} 
              onChange={setSelectedPriority} 
            />
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="w-full pb-9 h-full flex flex-col justify-center items-center ">
            <Image source={images.noresults} className="w-[50px] h-[50px]" resizeMode="contain" />
            <Text className="text-[14px] py-2 font-psemibold text-[#3F3D56]">Nenhuma tarefa encontrada</Text>
            <TouchableOpacity className="bg-[#1dc071] flex flex-row justify-center items-center px-3 py-2 rounded-[12px]">
              <Image source={icons.add} className="w-4 h-4" />
              <Text className="text-[18px] text-[#FFFFFF] pl-2">Nova tarefa</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
