import { router } from "expo-router";
import { ImageURISource } from "react-native";

import { Center, Text, Heading, VStack, Image, ScrollView } from "native-base";

import { AppTextInput } from "@/components/AppTextInput";
import { AppButton } from "@/components/AppButton";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/schemas/login";

import LogoSvg from "@/assets/logo.svg";
import BackgroundImg from "@/assets/background.png";

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  function onSubmit(data: { email: string; password: string }) {
    console.log("Login Form Data", data);
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} bg="gray.700" px={10} pb={16}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg as ImageURISource}
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

          <Controller
            control={control}
            name="email"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <AppTextInput
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <AppTextInput
                placeholder="Senha"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
              />
            )}
          />

          <AppButton title="Acessar" onPress={handleSubmit(onSubmit)} />
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
