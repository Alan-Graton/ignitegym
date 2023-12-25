import React from "react";
import { router } from "expo-router";
import { ImageURISource } from "react-native";

import {
  Center,
  Text,
  Heading,
  VStack,
  Image,
  ScrollView,
  useToast,
} from "native-base";

import { useAuthContext } from "@/hooks/useAuthContext";

import { AppTextInput } from "@/components/AppTextInput";
import { AppButton } from "@/components/AppButton";

import { AppError } from "@/utils/AppError";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/schemas/login";

import LogoSvg from "@/assets/logo.svg";
import BackgroundImg from "@/assets/background.png";

interface ILoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const { signIn } = useAuthContext();

  const [loading, setLoading] = React.useState<boolean>(false);

  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit({ email, password }: ILoginForm) {
    try {
      setLoading(true);
      await signIn(email, password);

      router.push("/home/");
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível entrar. Tente novamente mais tarde.";

      toast.show({ title, placement: "top", bgColor: "red.500" });

      setLoading(false);
    }
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
            render={({ field: { onChange, onBlur, value } }) => (
              <AppTextInput
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppTextInput
                placeholder="Senha"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
                onSubmitEditing={handleSubmit(onSubmit)}
                returnKeyType="send"
                errorMessage={errors.password?.message}
              />
            )}
          />

          <AppButton
            title="Acessar"
            onPress={handleSubmit(onSubmit)}
            isLoading={loading}
          />
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
