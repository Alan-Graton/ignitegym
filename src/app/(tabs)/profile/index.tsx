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

import { AppUserPicture } from "@/components/AppUserPicture";
import { AppTextInput } from "@/components/AppTextInput";
import { AppButton } from "@/components/AppButton";

import { STATIC_USER_PICTURE } from "@/constants";
import { Alert } from "react-native";
const PIC_SIZE: number = 33;

export default function Profile() {
  const { user, setUser } = React.useContext(UserContext);

  const [isPicLoading, setIsPicLoading] = React.useState<boolean>(false);

  const toast = useToast();

  // TODO: Apply D.R.Y
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
          (response.assets[0].fileSize / 1024 / 1024 > 5)
        ) {
          return toast.show({
            title: "Essa imagem é muito grande. Escolha uma de até 5MB.",
            placement: "top",
            bg: 'red.500'
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

          <AppTextInput placeholder="Nome" bg="gray.600" />
          <AppTextInput
            value="graton.alan@gmail.com"
            placeholder="E-mail"
            isDisabled
            bg="gray.600"
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
          <AppTextInput
            placeholder="Senha antiga"
            secureTextEntry
            bg="gray.600"
          />
          <AppTextInput
            placeholder="Nova senha"
            secureTextEntry
            bg="gray.600"
          />
          <AppTextInput
            placeholder="Confirmar nova senha"
            secureTextEntry
            bg="gray.600"
          />
          <AppButton title="Atualizar" mt={4} />
        </Center>
      </ScrollView>
    </VStack>
  );
}
