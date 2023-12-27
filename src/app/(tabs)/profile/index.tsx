import React, { useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";

import * as ImagePicker from "expo-image-picker";

import { TouchableOpacity } from "react-native";
import {
  Center,
  VStack,
  Heading,
  Text,
  ScrollView,
  Skeleton,
  useToast,
} from "native-base";

import { api } from "@/services/api";

import { useForm, Controller } from "react-hook-form";
import { IProfileForm, profileSchema } from "@/schemas/profile";
import { yupResolver } from "@hookform/resolvers/yup";

import { AppUserPicture } from "@/components/AppUserPicture";
import { AppTextInput } from "@/components/AppTextInput";
import { AppButton } from "@/components/AppButton";

import { AppError } from "@/utils/AppError";

import { STATIC_USER_PICTURE } from "@/constants";
const PIC_SIZE: number = 33;

export default function Profile() {
  const toast = useToast();

  const { user, updateUserProfile } = useAuthContext();

  const [isUpdatingProfile, setIsUpdatingProfile] = useState<boolean>(false);
  const [isPicLoading, setIsPicLoading] = useState<boolean>(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfileForm>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      old_password: null,
      password: null,
      confirm_password: null,
    },
  });

  const handleUserPicture = user.avatar ? user.avatar : STATIC_USER_PICTURE;

  async function handleChangePicture() {
    try {
      setIsPicLoading(true);

      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      if (response.canceled) return;

      const selectedPicture = response.assets[0];

      if (selectedPicture.uri) {
        if (
          selectedPicture.fileSize &&
          selectedPicture.fileSize / 1024 / 1024 > 5
        ) {
          return toast.show({
            title: "Essa imagem é muito grande. Escolha uma de até 5MB.",
            placement: "top",
            bg: "red.500",
          });
        }

        const fileExtension = selectedPicture.uri.split(".").pop();

        const avatarFile = {
          name: `${user.name}.${fileExtension}`.toLocaleLowerCase(),
          uri: selectedPicture.uri,
          type: `${selectedPicture.type}/${fileExtension}`,
        };

        const userPictureUploadForm = new FormData();
        userPictureUploadForm.append("avatar", avatarFile);

        await api.patch("users/avatar", userPictureUploadForm, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        toast.show({
          title: "Foto atualizada!",
          placement: "top",
          bgColor: "green.500",
        });
      }
    } catch (error) {
      console.error(
        "\n\n[Profile] Error while selecting new Profile Picture: ",
        error
      );

      return;
    } finally {
      setIsPicLoading(false);
    }
  }

  async function handleProfileUpdate(data: IProfileForm) {
    try {
      setIsUpdatingProfile(true);

      await api.put("users", data);

      const updatedUser = user;
      updatedUser.name = data.name;

      await updateUserProfile(updatedUser);

      toast.show({
        title: "Perfil atualizado com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });
    } catch (error) {
      console.error("\n\n[Profile] handleProfileUpdate FAILED: ", error);
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível salvar as alterações. Tente novamente mais tarde.";

      toast.show({ title, placement: "top", bgColor: "red.500" });
    } finally {
      setIsUpdatingProfile(false);
    }
  }

  return (
    <VStack flex={1} bg="gray.700">
      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt={6} px={10}>
          {isPicLoading && (
            <Skeleton
              w={PIC_SIZE}
              h={PIC_SIZE}
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          )}
          {!isPicLoading && (
            <AppUserPicture
              source={{ uri: handleUserPicture }}
              size={PIC_SIZE}
            />
          )}

          <TouchableOpacity onPress={handleChangePicture}>
            <Text color="green.500" fontSize="md" mt={2} mb={8} bold>
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppTextInput
                placeholder="Nome"
                bg="gray.600"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { value } }) => (
              <AppTextInput
                placeholder="E-mail"
                isDisabled
                bg="gray.600"
                value={value}
              />
            )}
          />
          <Heading
            color="gray.200"
            fontSize="md"
            fontFamily="heading"
            mt={12}
            mb={2}
            alignSelf="flex-start"
          >
            Alterar senha
          </Heading>
          <Controller
            control={control}
            name="old_password"
            render={({ field: { onChange, onBlur } }) => (
              <AppTextInput
                placeholder="Senha antiga"
                secureTextEntry
                bg="gray.600"
                onBlur={onBlur}
                onChangeText={onChange}
                errorMessage={errors.old_password?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur } }) => (
              <AppTextInput
                placeholder="Nova senha"
                secureTextEntry
                bg="gray.600"
                onBlur={onBlur}
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="confirm_password"
            render={({ field: { onChange, onBlur } }) => (
              <AppTextInput
                placeholder="Confirmar nova senha"
                secureTextEntry
                bg="gray.600"
                onBlur={onBlur}
                onChangeText={onChange}
                errorMessage={errors.confirm_password?.message}
              />
            )}
          />

          <AppButton
            title="Atualizar"
            mt={4}
            onPress={handleSubmit(handleProfileUpdate)}
            isLoading={isUpdatingProfile}
          />
        </Center>
      </ScrollView>
    </VStack>
  );
}
