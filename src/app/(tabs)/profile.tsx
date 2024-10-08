import { Image, Text, TextInput, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import Button from "@/src/components/Button";

export default function PofileScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [username, setUsername] = useState("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View className="p-3 flex-1">
      {/* Avatar image picker */}
      {image ? (
        <Image
          source={{
            uri: image,
          }}
          className="w-52 self-center aspect-square rounded-full bg-slate-300"
        />
      ) : (
        <View className="w-52 self-center aspect-square rounded-full bg-slate-300" />
      )}

      <Text
        onPress={pickImage}
        className="text-blue-500 font-semibold m-5 self-center"
      >
        Change
      </Text>

      {/* Form */}
      <Text className="mb-2 text-gray-500 font-semibold">Username</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChange={setUsername}
        className="border border-gray-300 p-3 rounded-md"
      />

      {/* Button */}
      <View className="flex-grow justify-end gap-2 mt-auto">
        <Button title="Update profile" />
        <Button title="Sign out" />
      </View>
    </View>
  );
}
