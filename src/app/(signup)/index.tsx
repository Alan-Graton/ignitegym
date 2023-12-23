import { router } from "expo-router";
import { ImageURISource } from "react-native";

import { Center, Text, Heading, VStack, Image, ScrollView } from "native-base";

import { AppTextInput } from "@/components/AppTextInput";
import { AppButton } from "@/components/AppButton";
import { AppTextError } from "@/components/AppTextError";

import { useForm, Controller } from "react-hook-form";
import { signUpSchema } from "@/schemas/singup";
import { yupResolver } from "@hookform/resolvers/yup";

import LogoSvg from "@/assets/logo.svg";
import BackgroundImg from "@/assets/background.png";

import { STATIC_USER_PICTURE } from "@/constants";

interface ISignupForm {
  name: string;
  email: string;
  password: string;
  picture?: string;
}

export default function SignUp() {
  // TODO: Move this inside a Context (UserContext)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupForm>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      picture: STATIC_USER_PICTURE,
    },
  });

  function onSubmit(data: ISignupForm) {
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

          <AppTextError error={errors.name} message={errors.name?.message} />

          <Controller
            control={control}
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

          <AppTextError error={errors.email} message={errors.email?.message} />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <AppTextInput
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                onSubmitEditing={handleSubmit(onSubmit)}
                returnKeyType="send"
              />
            )}
            name="password"
          />

          <AppTextError
            error={errors.password}
            message={errors.password?.message}
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
