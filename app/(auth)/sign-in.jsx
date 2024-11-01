import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import { images } from "../../constants";
import { CustomButton, FormField } from "../../components";
import { getCurrentUser, signIn } from "../../lib/api";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (!form.email || !form.password ) {
      Alert.alert("Error", "Por favor preencha todos os campos");
    }

    setSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();

      console.log(`AFTER SIGN ${result}`)
      setUser(result);
      setIsLogged(true);

      Alert.alert("Sucesso", "Utilizador conectado com sucesso");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-[#FFFFFF] h-full">
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
          Faça login no Taskify
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7 "
            placeholder="Email"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            placeholder="Password"
            otherStyles="mt-7"
          />

          <CustomButton
            title="Entrar"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
            Não tem conta?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Inscrever-se
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
