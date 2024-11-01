import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Done = () => {
  return (
    <SafeAreaView className="px-4 my-6 bg-primary h-full">
      <Text className="text-2xl text-black font-psemibold">Done</Text>
    </SafeAreaView>
  );
};

export default Done;
