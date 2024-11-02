import { useState } from "react";
import { router } from "expo-router";
import { ResizeMode, Video } from "expo-av";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { icons } from "../../constants";
// import { createVideoPost } from "../../lib/appwrite";
import {
  CustomButton,
  FormField,
  FormFieldTextArea,
  CustomDropdown,
} from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [taskComplted, setTaskComplted] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "",
  });
 

  const submit = async () => {
    if (!title || !description || !priority) {
      return Alert.alert("Forneça todos os campos");
    }

    setUploading(true);
    // try {
    //   await createVideoPost({
    //     ...form,
    //     userId: user.$id,
    //   });

    //   Alert.alert("Success", "Post uploaded successfully");
    //   router.push("/home");
    // } catch (error) {
    //   Alert.alert("Error", error.message);
    // } finally {
    //   setForm({
    //     title: "",
    //     description: "",
    //     priority: "",
    //   });

    //   setUploading(false);
    // }
  };

  return (
    <SafeAreaView className="bg-[#FFFFFF] h-full pb-[100px]">
      <View className=" flex flex-col px-4 pt-6 my-6">
        <Text className="text-2xl text-[#3F3D56] font-psemibold">
          Criar Tarefa
        </Text>
        <View className="mb-2 w-full">
          <FormField
            title="Titulo"
            value={form.title}
            placeholder="O que está na sua mente?"
            handleChangeText={(e) => setForm({ ...form, title: e })}
            otherStyles="mt-2"
          />
        </View>
        <View className="mb-2 w-full">
          <FormFieldTextArea
            title="Descrição"
            value={form.description}
            placeholder="Adicione uma descrição..."
            handleChangeText={(e) => setForm({ ...form, description: e })}
            otherStyles="mt-2"
          />
        </View>
        <View className="mt-2 w-full">
          <Text className="text-[#3F3D56] font-psemibold text-base">
            {" "}
            Selecione Prioridade
          </Text>
          <CustomDropdown
            title="Selecione Prioridade"
            selectedValue={form.priority}
            onChange={(value) =>
              setForm((prev) => ({ ...prev, priority: value }))
            } // Update priority
          />
        </View>
        <View className="flex flex-row justify-cneter items-center mt-4">
          <TouchableOpacity
            className={`w-[34px] h-[34px]  cursor-pointer flex justify-center items-center rounded-md border-[#C6CFDC] border-[2px] ${
              taskComplted ? "bg-[#1dc071] border-[#1dc071]" : ""
            }`}
            onPress={() => setTaskComplted(!taskComplted)}
          >
            {taskComplted && (
              <Image
                source={icons.check}
                resizeMode="contain"
                className="w-4 h-4 rounded-lg "
              />
            )}
          </TouchableOpacity>
          <Text className="text-[#3F3D56] font-psemibold text-base">
            {" "}
            Marcar como Concluida
          </Text>
        </View>
        <View className="mt-2 w-full">
          <CustomButton
            title="Salvar tarefa"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={uploading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Create;
