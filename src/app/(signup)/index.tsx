import { router } from "expo-router";
import { ImageURISource } from "react-native";

import { Center, Text, Heading, VStack, Image, ScrollView } from "native-base";

import { AppTextInput } from "@/components/AppTextInput";
import { AppButton } from "@/components/AppButton";

import { useForm, Controller } from "react-hook-form";
import { signUpSchema } from "@/schemas/singup";
import { yupResolver } from "@hookform/resolvers/yup";

import LogoSvg from "@/assets/logo.svg";
import BackgroundImg from "@/assets/background.png";

export default function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  function onSubmit(data: { name: string; email: string; password: string }) {
    console.log("Signup Form Data: ", data);
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
            Crie sua conta
          </Heading>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <AppTextInput
                placeholder="Nome"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="name"
          />

          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <AppTextInput
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="email"
          />

          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <AppTextInput
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="password"
          />

          <AppButton title="Criar e acessar" onPress={handleSubmit(onSubmit)} />
        </Center>

        <AppButton
          title="Voltar para o login"
          variant="outline"
          onPress={() => {
            router.push("/(login)");
          }}
          mt={16}
        />
      </VStack>
    </ScrollView>
  );
}
