import React, { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import { images } from "../../constants";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider"; // Import the context

const SignUp = () => {
  const { setUser, setIsLogged, signUp } = useGlobalContext(); // Destructure signUp from context
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (!form.name || !form.email || !form.password) {
      Alert.alert("Error", "Por favor preencha todos os campos");
      return;
    }
    // console.log(`Before send to api ${form.name}, ${form.email}, ${form.password}}`)
    setSubmitting(true);
    try {
      const response = await signUp({ name:form.name, email:form.email, password:form.password,}); // Call signUp function from context

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Sucesso", "Utilizador criado com sucesso");
        // If the response is successful (status code 200–299)
        console.log("Sign-up successful:", data.message);
        router.replace("/sign-in"); // Navigate to home screen
      } else {
        // If the response has a non-2xx status code
        console.error("Sign-up failed:", data);
       
      }

      
    } catch (error) {
      Alert.alert("Error", error.message || "Falha ao inscrever-se.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
        >
          <View className="w-full flex justify-center items-center py-2">
          <Image
            source={images.logo}
            className="w-[50px] h-[50px]"
            resizeMode="contain rounded-lg"
          />
          <Text className="text-sm font-bold text-[28px] py-4 text-[#3F3D56] mt-2 text-center">
            Taskify
          </Text>
          </View>
          <Text className="text-[18px] font-semibold text-[#3F3D56] mt-10 font-psemibold">
            Inscreva-se na Taskify
          </Text>

          <FormField
            title="Nome"
            placeholder="Nome"
            value={form.name}
            handleChangeText={(e) => setForm({ ...form, name: e })}
            otherStyles="mt-10"
          />

          <FormField
            title="Email"
            placeholder="abc@taskify.ao"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            placeholder="Password"
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Inscrever-se"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Já tem conta?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Conecte-se
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
