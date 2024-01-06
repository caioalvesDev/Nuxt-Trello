export const useBoard = () => {
  async function destroy(id: string, onDestroy?: () => void) {
    try {
      useToast().add({
        title: "Deletar board",
        description: "Tem certeza de que deseja excluir este board?",
        actions: [
          {
            label: "Cancelar",
            click: () => {},
          },
          {
            label: "Sim",
            color: "red",
            click: async () => {
              await useFetch(`/api/boards/${id}`, {
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

  return {
    destroy,
  };
};
