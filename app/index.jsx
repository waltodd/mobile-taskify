import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import { CustomButton, Loader } from "../components";
import { useGlobalContext } from "../context/GlobalProvider";

const Welcome = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-[#FFFFFF] h-full">
      <Loader isLoading={loading} />

      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          <Image
            source={images.logo}
            className="w-[50px] h-[50px]"
            resizeMode="contain rounded-lg"
          />
          <Text className="text-sm font-bold text-[28px] py-4 text-[#3F3D56] mt-2 text-center">
            Taskify
          </Text>

          <Image
            source={images.onboarding}
            className="max-w-[360px] w-full h-[298px]"
            resizeMode="contain"
          />

          <View className="relative mt-0">
          <Text className="text-sm font-bold text-[24px] py-4 text-[#3F3D56] mt-2 text-center">
          Bem-vindo ao Taskify! 🎉
          </Text>
            
          </View>

          <Text className="text-[14px] font-pregular text-[#8D9CB8] mt-7 text-center">
          Simplifique sua rotina, organize suas tarefas e conquiste seus objetivos com eficiência.
          </Text>

          <CustomButton
            title="começar"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#FFFFFF" style="dark" />
    </SafeAreaView>
  );
};

export default Welcome;
