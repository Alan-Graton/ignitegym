import { router } from "expo-router";

import { Center, Text, Heading, VStack, Image, ScrollView } from "native-base";

import { AppTextInput } from "@/components/AppTextInput";
import { AppButton } from "@/components/AppButton";

import LogoSvg from "@/assets/logo.svg";
import BackgroundImg from "@/assets/background.png";

export default function Login() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} bg="gray.700" px={10} pb={16}>
        <Image
          source={BackgroundImg}
          alt="Background Image"
          resizeMode="contain"
          position="absolute"
        />
        <Center my={24}>
          <LogoSvg />
          <Text color="gray.100" fontSize="sm" fontFamily="body">
            Treine sua mente e seu corpo
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Acesse sua conta
          </Heading>
          <AppTextInput
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <AppTextInput placeholder="Senha" secureTextEntry />

          <AppButton title="Acessar" />
        </Center>

        <Center mt={24}>
          <Text color="gray.100" mb={3} fontSize="sm" fontFamily="body">
            Ainda não tem acesso?
          </Text>
          <AppButton
            title="Criar conta"
            variant="outline"
            onPress={() => {
              router.push("/(signup)");
            }}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}
