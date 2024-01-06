<script lang="ts" setup>
import { useSignin } from "~/composables/useSignin";

useHead({
  title: "Signin",
});

const { formState, isLoading, validationSchema, handleSubmit } = useSignin();
</script>
<template>
  <WrapperAuth title="Faça login em sua conta">
    <template #header>
      <span class="text-sm mr-px">Não tem uma conta?</span>
      <NuxtLink to="/auth/signup" class="text-primary-500"> Inscrever-se </NuxtLink>
    </template>

    <UForm :state="formState" :schema="validationSchema" @submit="handleSubmit">
      <UFormGroup class="mb-4" name="email" label="Email">
        <UInput
          v-model="formState.email"
          type="email"
          placeholder="john@email.com"
        />
      </UFormGroup>
      <UFormGroup class="mb-4" name="password" label="Senha">
        <UInput
          v-model="formState.password"
          type="password"
          placeholder="********"
        />
      </UFormGroup>
      <UFormGroup>
        <UButton :loading="isLoading" type="submit" color="primary" block>
          Entrar
        </UButton>
      </UFormGroup>
    </UForm>
  </WrapperAuth>
</template>

<style></style>
