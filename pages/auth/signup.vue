<script lang="ts" setup>
import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";
import type { z } from "h3-zod";
import SignupSchema from "~/schemas/Signup.schema";

useHead({
  title: "Signup",
});

const formState = ref({
  name: undefined,
  email: undefined,
  password: undefined,
  passwordConfirm: undefined,
});

const isLoading = ref(false);

async function handleSubmit(
  event: FormSubmitEvent<z.output<typeof SignupSchema>>
) {
  try {
    isLoading.value = true;
    await useFetch("/api/auth/signup", {
      method: "POST",
      body: event.data,
    });
    useToast().add({
      title: "Account created",
      description:
        "Your account has been created successfully, Redirecting you to the sign in page",
    });
    await useRouter().push({
      name: "auth-signin",
    });
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}
</script>
<template>
  <WrapperAuth title="Crie uma conta de graça">
    <template #header>
      <span class="text-sm mr-px">Já tem uma conta?</span>
      <NuxtLink to="/auth/signin" class="text-primary-500"> Entrar </NuxtLink>
    </template>

    <UForm :state="formState" :schema="SignupSchema" @submit="handleSubmit">
      <UFormGroup class="mb-4" name="name" label="Nome">
        <UInput v-model="formState.name" type="text" placeholder="seu nome" />
      </UFormGroup>

      <UFormGroup class="mb-4" name="email" label="Email">
        <UInput
          v-model="formState.email"
          type="email"
          placeholder="teste@email.com"
        />
      </UFormGroup>
      <UFormGroup class="mb-4" name="password" label="Senha">
        <UInput
          v-model="formState.password"
          type="password"
          placeholder="********"
        />
      </UFormGroup>
      <UFormGroup class="mb-4" name="passwordConfirm" label="Confirme sua senha">
        <UInput
          v-model="formState.passwordConfirm"
          type="password"
          placeholder="********"
        />
      </UFormGroup>
      <UFormGroup>
        <UButton :loading="isLoading" type="submit" color="primary" block>
          Criar Conta
        </UButton>
      </UFormGroup>
    </UForm>
  </WrapperAuth>
</template>

<style></style>
