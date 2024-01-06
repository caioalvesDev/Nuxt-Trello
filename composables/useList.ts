export const useList = () => {
  async function destroy(id: string, onDestroy?: () => void) {
    try {
      useToast().add({
        title: "Deletar lista",
        description: "Tem certeza de que deseja excluir esta lista?",
        actions: [
          {
            label: "Cancelar",
            click: () => {},
          },
          {
            label: "Sim",
            color: "red",
            click: async () => {
              await useFetch(`/api/lists/${id}`, {
                method: "DELETE",
              });
              onDestroy?.();
            },
          },
        ],
        timeout: 5000,
        color: "red",
      });
    } catch (e: any) {
      useToast().add({
        title: "Error",
        description: e.message || "Algo deu errado",
      });
    }
  }

  async function update(id: string, data: Record<string, unknown>) {
    await useFetch(`/api/lists/${id}`, {
      body: data,
      method: "PUT",
      watch: false,
    });
  }

  return {
    destroy,
    update,
  };
};
