import React from "react";
import { router } from "expo-router";
import { ImageURISource } from "react-native";

import { api } from "@/services/api";

import {
  Center,
  Text,
  Heading,
  VStack,
  Image,
  ScrollView,
  useToast,
} from "native-base";

import { AppTextInput } from "@/components/AppTextInput";
import { AppButton } from "@/components/AppButton";

import { AppError } from "@/utils/AppError";

import { useForm, Controller } from "react-hook-form";
import { signUpSchema } from "@/schemas/singup";
import { yupResolver } from "@hookform/resolvers/yup";

import LogoSvg from "@/assets/logo.svg";
import BackgroundImg from "@/assets/background.png";

interface ISignupForm {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
  picture?: string;
}

const DEFAULT_VALUES = {
  name: "",
  email: "",
  password: "",
  password_confirm: "",
  picture: "",
};

export default function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupForm>({
    resolver: yupResolver(signUpSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const toast = useToast();
  const [loading, setLoading] = React.useState<boolean>(false);

  async function onSubmit({ name, email, password }: ISignupForm) {
    console.log("\n\n[Signup] Creating account...");
    try {
      setLoading(true);

      const result = await api.post("users", { name, email, password });

      console.log("\n\nAxios Result: ", result.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível criar conta. Tente novamente mais tarde";

      toast.show({ title, placement: "top", bgColor: "red.500" });
    } finally {
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
            Crie sua conta
          </Heading>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppTextInput
                placeholder="Nome"
                onChangeText={onChange}
                onBlur={onBlur}
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
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                onBlur={onBlur}
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
                secureTextEntry
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppTextInput
                placeholder="Confirme a Senha"
                secureTextEntry
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                onSubmitEditing={handleSubmit(onSubmit)}
                returnKeyType="send"
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />

          <AppButton
            title="Criar e acessar"
            onPress={handleSubmit(onSubmit)}
            isLoading={loading}
          />
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
