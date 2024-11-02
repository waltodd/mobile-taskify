import React, { useState } from 'react';
import { View,Text, TouchableOpacity } from 'react-native';

const CustomDropdown = ({ selectedValue, onChange, title }) => {
  const options = [{ label: "Baixa", value: "baixa" },
    { label: "Média", value: "media" },
    { label: "Alta", value: "alta" }];
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    onChange(option);
    console.log(option) // Call the onChange handler with the selected value
    setIsOpen(false); // Close the dropdown
  };

  return (
    <View className="relative">
      <TouchableOpacity
        className="w-full py-4 bg-[#FFFFFF] rounded-[12px] text-[18px] border-[#C6CFDC] border-[1px] text-left text-[#3F3D56]"
        onPress={() => setIsOpen((prev) => !prev)} // Toggle dropdown
      >
      <Text className="text-[#3F3D56] font-psemibold text-base"> {selectedValue?.label || `${title}`}</Text> 
      </TouchableOpacity>
      {isOpen && (
        <View className="absolute z-10 w-full mt-1 bg-[#FFFFFF] border-[#C6CFDC] border-[1px] rounded-[12px] shadow-lg">
          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              className="p-2 text-[#3F3D56] hover:bg-[#1dc071] text-[#3F3D56] cursor-pointer"
              onPress={() => handleOptionClick(option)} // Select option
            >
             <Text className="text-[#3F3D56] font-psemibold text-base">{option.label}</Text> 
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default CustomDropdown;
