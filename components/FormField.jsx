import { useState } from "react";
import { View, Text, TextInput,Platform,Keyboard, TouchableOpacity, Image,KeyboardAvoidingView,TouchableWithoutFeedback } from "react-native";

import { icons } from "../constants";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-[#3F3D56] font-psemibold text-base">{title}</Text>

      <View className="w-full h-16 px-4 bg-[#F5F7F9] rounded-2xl border-2 border-[#C6CFDC] focus:border-[#1dc071]  flex flex-row items-center">
        <TextInput
          className="flex-1 text-[#3F3D56] font-psemibold text-[14px]"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default FormField;
