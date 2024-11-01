import { useSignUp } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";

import { icons, images } from "@/constants";


const SignUp = () => {

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const onSignUpPress = async () => {
  //   if (!isLoaded) return;
  //   try {
  //     await signUp.create({
  //       emailAddress: form.email,
  //       password: form.password,
  //     });
  //     await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
  //     setVerification({
  //       ...verification,
  //       state: "pending",
  //     });
  //   } catch (err: any) {
  //     // See https://clerk.com/docs/custom-flows/error-handling
  //     // for more info on error handling
  //     console.log(JSON.stringify(err, null, 2));
  //     Alert.alert("Error", err.errors[0].longMessage);
  //   }
  };


  const onPressVerify = async () => {
  //   if (!isLoaded) return;
  //   try {
  //     const completeSignUp = await signUp.attemptEmailAddressVerification({
  //       code: verification.code,
  //     });
  //     if (completeSignUp.status === "complete") {
  //       await fetchAPI("/(api)/user", {
  //         method: "POST",
  //         body: JSON.stringify({
  //           name: form.name,
  //           email: form.email,
  //           clerkId: completeSignUp.createdUserId,
  //         }),
  //       });
  //       await setActive({ session: completeSignUp.createdSessionId });
  //       setVerification({
  //         ...verification,
  //         state: "success",
  //       });
  //     } else {
  //       setVerification({
  //         ...verification,
  //         error: "Falha na verificação. Por favor, tente novamente.",
  //         state: "failed",
  //       });
  //     }
  //   } catch (err: any) {
  //     // See https://clerk.com/docs/custom-flows/error-handling
  //     // for more info on error handling
  //     setVerification({
  //       ...verification,
  //       error: err.errors[0].longMessage,
  //       state: "failed",
  //     });
  //   }
  };
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-3 left-5">
          Crie a Sua Conta
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Nome"
            placeholder="Introduza o nome"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
          <InputField
            label="Email"
            placeholder="Introduza o email"
            icon={icons.email}
            textContentType="emailAddress"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Senha"
            placeholder="Introduza a senha"
            icon={icons.lock}
            secureTextEntry={true}
            textContentType="password"
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
          <CustomButton
            title="Inscrever-se"
            onPress={onSignUpPress}
            className="mt-6 bg-[#FF725E]"
          />
         
          <Link
            href="/sign-in"
            className="text-lg text-center text-general-200 mt-10"
          >
            Já tem conta?{" "}
            <Text className="text-[#FF725E]">Conecte-se</Text>
          </Link>
        </View>
        <ReactNativeModal
          isVisible={verification.state === "pending"}
          // onBackdropPress={() =>
          //   setVerification({ ...verification, state: "default" })
          // }
          onModalHide={() => {
            if (verification.state === "success") {
              setShowSuccessModal(true);
            }
          }}
        >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="font-JakartaExtraBold text-2xl mb-2">
            Verificação
            </Text>
            <Text className="font-Jakarta mb-5">
            Enviamos um código de verificação para {form.email}.
            </Text>
            <InputField
              label={"Código"}
              icon={icons.lock}
              placeholder={"12345"}
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code) =>
                setVerification({ ...verification, code })
              }
            />
            {verification.error && (
              <Text className="text-red-500 text-sm mt-1">
                {verification.error}
              </Text>
            )}
            <CustomButton
              title="Verificar e-mail"
              onPress={onPressVerify}
              className="mt-5 bg-success-500"
            />
          </View>
        </ReactNativeModal>
        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] mx-auto my-5"
            />
            <Text className="text-3xl font-JakartaBold text-center">
            Verificado
            </Text>
            <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
            Verificou a sua conta com sucesso.
            </Text>
            <CustomButton
              title="Navegar na página inicial"
              onPress={() => router.push(`/(root)/(tabs)/home`)}
              className="mt-5"
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};
export default SignUp;
