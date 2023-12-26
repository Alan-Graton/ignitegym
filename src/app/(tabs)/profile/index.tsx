import React from "react";
import { UserContext } from "@/contexts/UserContext";

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

import { useForm, Controller } from "react-hook-form";
import { profileSchema } from "@/schemas/profile";
import { yupResolver } from "@hookform/resolvers/yup";

import { AppUserPicture } from "@/components/AppUserPicture";
import { AppTextInput } from "@/components/AppTextInput";
import { AppButton } from "@/components/AppButton";

import { STATIC_USER_PICTURE } from "@/constants";
import { useAuthContext } from "@/hooks/useAuthContext";
const PIC_SIZE: number = 33;

interface IProfileForm {
  name?: string;
  email?: string;
  old_password?: string;
  new_password?: string;
  confirm_new_password?: string;
}

export default function Profile() {
  const toast = useToast();

  const { user } = useAuthContext();

  const { setUser } = React.useContext(UserContext);

  const [isPicLoading, setIsPicLoading] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfileForm>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const handleUserPicture = user.picture ? user.picture : STATIC_USER_PICTURE;

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

      if (response.assets[0].uri) {
        if (
          response.assets[0].fileSize &&
          response.assets[0].fileSize / 1024 / 1024 > 5
        ) {
          return toast.show({
            title: "Essa imagem é muito grande. Escolha uma de até 5MB.",
            placement: "top",
            bg: "red.500",
          });
        }

        setUser((prevState) => ({
          ...prevState,
          picture: response.assets[0].uri,
        }));
      }
    } catch (e) {
      console.error(
        "\n\n[Profile] Error while selecting new Profile Picture: ",
        e
      );

      return;
    } finally {
      setIsPicLoading(false);
    }
  }

  async function handleProfileUpdate(data: IProfileForm) {
    console.log("\n\n[Profile] Form Data: ", data);
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
            render={({ field: { onChange, onBlur, value } }) => (
              <AppTextInput
                placeholder="E-mail"
                isDisabled
                bg="gray.600"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
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
            render={({ field: { onChange, onBlur, value } }) => (
              <AppTextInput
                placeholder="Senha antiga"
                secureTextEntry
                bg="gray.600"
                onBlur={onBlur}
                onChangeText={onChange}
                errorMessage={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="new_password"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppTextInput
                placeholder="Nova senha"
                secureTextEntry
                bg="gray.600"
                onBlur={onBlur}
                onChangeText={onChange}
                errorMessage={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="confirm_new_password"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppTextInput
                placeholder="Confirmar nova senha"
                secureTextEntry
                bg="gray.600"
                onBlur={onBlur}
                onChangeText={onChange}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <AppButton
            title="Atualizar"
            mt={4}
            onPress={handleSubmit(handleProfileUpdate)}
          />
        </Center>
      </ScrollView>
    </VStack>
  );
}
