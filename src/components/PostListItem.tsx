import React from "react";
import { Image, Text, View, Platform } from "react-native";
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";
import { AdvancedImage } from "cloudinary-react-native";
import { cld } from "../lib/cloudinary";

// Import required actions
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";

// Applying transformations
const applyTransformation = (image) => {
  return image.resize(thumbnail().width(411).height(411)); // Resize for post image
};

const applyAvatarTransformation = (image) => {
  return image.resize(
    thumbnail().width(48).height(48).gravity(focusOn(FocusOn.face()))
  ); // Resize for avatar
};

export default function PostListItem({ post }) {
  const myImage = applyTransformation(cld.image(post.image)); // Apply transformation
  const imageUrl = myImage.toURL();

  const myAvatar = applyAvatarTransformation(cld.image(post.user.avatar_url)); // Apply transformation
  const avatarUrl = myAvatar.toURL();

  return (
    <View className="bg-white">
      {/* Header */}
      <View className="p-3 flex-row items-center gap-2">
        {Platform.OS === "ios" ? (
          <AdvancedImage
            cldImg={myAvatar}
            className="w-12 aspect-square rounded-full"
          />
        ) : (
          <Image
            source={{ uri: avatarUrl }}
            className="w-12 aspect-square rounded-full"
          />
        )}
        <Text className="font-semibold">{post.user.username}</Text>
      </View>

      {/* Content */}
      {Platform.OS === "ios" ? (
        <AdvancedImage cldImg={myImage} className="w-full aspect-[4/3]" />
      ) : (
        <Image source={{ uri: imageUrl }} className="w-full aspect-[4/3]" />
      )}

      {/* Icons */}
      <View className="flex-row justify-between gap-3 p-3">
        <View className="flex-row gap-3">
          <AntDesign name="hearto" size={20} />
          <Ionicons name="chatbubble-outline" size={20} />
          <Feather name="send" size={20} />
        </View>
        <Feather name="bookmark" size={20} />
      </View>
    </View>
  );
}
