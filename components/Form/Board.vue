<script lang="ts" setup>
import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";
import type { z } from "h3-zod";
import BoardSchema from "~/schemas/Board.schema";
import type { BoardDocument } from "~/server/models/Board";

interface Props {
  type: "create" | "update";
  initialData?: Partial<BoardDocument>;
  onUpdate?: (data?: any) => void;
  onCreate?: (data?: any) => void;
}

const props = withDefaults(defineProps<Props>(), {
  type: "create",
});

const isLoading = ref(false);
const formState = reactive<Partial<BoardDocument>>({
  name: undefined,
  coverImage: undefined,
});

async function handleSubmit(
  event: FormSubmitEvent<z.output<typeof BoardSchema>>
) {
  try {
    isLoading.value = true;
    if (props.type === "update" && props.initialData?._id) {
      const updatedBoard = await useFetch(
        `/api/boards/${props.initialData._id}`,
        {
          method: "PUT",
          body: event.data,
          watch: false,
        }
      );
      props.onUpdate?.(updatedBoard);
      return;
    }

    const { data, error } = await useFetch("/api/boards", {
      method: "POST",
      body: event.data,
      watch: false,
    });

    if (error.value) {
      if (error.value.statusCode === 403) {
        useSubscription().showSubscriptionModal({
          title: "Múltiplos boards são um recurso premium",
          description:
            "Você pode criar apenas um board no plano gratuito. Atualize para premium para criar mais placas.",
        });
      }
    }

    props.onCreate?.(data);
  } catch (e) {
  } finally {
    isLoading.value = false;
  }
}

watchEffect(() => {
  if (props.type === "update" && props.initialData) {
    formState.name = props.initialData.name;
    formState.coverImage = props.initialData.coverImage;
  }

  if (props.type === "create") {
    formState.name = undefined;
    formState.coverImage = undefined;
  }
});
</script>
<template>
  <UForm
    :state="formState"
    :schema="BoardSchema"
    class="p-4"
    @submit="handleSubmit"
  >
    <UFormGroup class="mb-4" name="name" label="Nome do Board">
      <UInput v-model="formState.name" type="text" placeholder="Nome do Board" />
    </UFormGroup>

    <UFormGroup class="mb-4" name="coverImage" label="Selecione a imagem da capa">
      <ImagePicker v-model="formState.coverImage" />
    </UFormGroup>

    <UButton type="submit" color="primary" block :loading="isLoading">
      {{ type === "create" ? "Criar board" : "Atualizar board" }}
    </UButton>
  </UForm>
</template>

<style></style>
