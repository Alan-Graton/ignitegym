import React from "react";

import { TouchableOpacity } from "react-native";
import {
  Center,
  VStack,
  Heading,
  Text,
  ScrollView,
  Skeleton,
} from "native-base";

import { AppUserPicture } from "@/components/AppUserPicture";
import { AppTextInput } from "@/components/AppTextInput";
import { AppButton } from "@/components/AppButton";

const PIC_SIZE: number = 33;

export default function Profile() {
  return (
    <VStack flex={1} bg="gray.700">
      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt={6} px={10}>
          {/* <Skeleton
            w={PIC_SIZE}
            h={PIC_SIZE}
            rounded="full"
            startColor="gray.500"
            endColor="gray.400"
          /> */}
          <AppUserPicture size={PIC_SIZE} />
          <TouchableOpacity>
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
