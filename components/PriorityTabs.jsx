import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const PriorityTabs = ({ selectedValue, onChange }) => {
  const options = [
    { label: "Baixa", value: "baixa" },
    { label: "Média", value: "media" },
    { label: "Alta", value: "alta" },
  ];

  const [selectedTab, setSelectedTab] = useState(selectedValue || options[0]);

  const handleTabClick = (option) => {
    setSelectedTab(option);
    onChange(option);
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 16, marginBottom: 16 }}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={{
            flex: 1,
            paddingVertical: 8,
            borderRadius: 8,
            backgroundColor: selectedTab.value === option.value ? '#1dc071' : '#FFFFFF',
            marginHorizontal: 4,
          }}
          onPress={() => handleTabClick(option)}
        >
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '600',
              color: selectedTab.value === option.value ? '#FFFFFF' : '#3F3D56',
            }}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default PriorityTabs;
