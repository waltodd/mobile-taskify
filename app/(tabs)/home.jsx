import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, TouchableOpacity, Text, View } from "react-native";

import { images, icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider"; // Import the context

// import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import { EmptyState, SearchInput, Trending, TaskCard } from "../../components";
// const tasks = [
//   {
//     _id:"2300",
//     title: "Initial Setup for Redux Toolkit",
//     priority: "baixa",
//     description: "Complete the initial setup for Redux Toolkit in the project.",
//     completed: false,
//   },
//   {
//     _id:"2301",
//     title: "Design Authentication Flow",
//     priority: "alta",
//     description:
//       "Plan and implement the user authentication flow using Redux Toolkit for managing state.",
//       completed: true,
//   },
//   {
//     _id:"2170",
//     title: "Add Error Handling Middleware",
//     priority: "media",
//     description:
//       "Implement middleware in Redux Toolkit to catch and handle errors from asynchronous actions.",
//       completed: true,
//   },
// ];

const Home = () => {
  const { user, tasks } = useGlobalContext();
  return (
    <SafeAreaView className="bg-[#FFFFFF] h-full">
      <FlatList
        data={tasks}
        keyExtractor={(task) => task._id}

        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        renderItem={({ item }) => <TaskCard task={item} />}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-4">
              <View className="flex flex-row justify-items items-center">
                <Image
                  source={images.logo}
                  className="w-10 h-10 rounded-[10px]"
                  resizeMode="contain "
                />
                <Text className="text-[20px] pl-2 font-bold text-[#3F3D56]">
                  Taskify
                </Text>
              </View>
              <View className="flex flex-row justify-items items-center gap-x-2">
               
              <TouchableOpacity className=" bg-[#F5F7F9] justify-center items-center w-10 h-10 rounded-full ">
                <Image source={icons.logout} className="w-5 h-5" />
              </TouchableOpacity>
              </View>
            </View>
            <View className="flex flex-row justify-items items-center gap-x-2">
              <Text className="font-pmedium text-lg text-[#3F3D56]">
              Bem vindo  
                
              </Text>
              <Text className="text-lg font-psemibold text-[#1dc071]">
                  {user?.name} {" "}👋
                </Text>
            </View>
            <View className="">
              <Text className="text-sm  text-[#8D9CB8]">Tem <Text className="text-sm font-psemibold text-[#1dc071]">{tasks.length}{" "}</Text>tarefas para fazer.</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="w-full pb-9 h-full flex flex-col justify-center items-center mt-8">
            <Image
              source={images.noresults}
              className="w-[50px] h-[50px]"
              resizeMode="contain"
            />
            <Text className="text-[14px] py-2 font-psemibold text-[#3F3D56]">
              Nenhuma tarefa encontrada
            </Text>
            <TouchableOpacity className="flex flex-row bg-[#1dc071] justify-center items-center px-3 py-2 rounded-[12px]"
            
            >
              <Image source={icons.add} className="w-4 h-4" />
              <Text className="text-[18px]  text-[#FFFFFF] pl-2">
                Nova tarefa
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
