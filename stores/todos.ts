import { defineStore } from "pinia";

type Todo = {
    id: string;
    assignee: string;
    dueDateTime: string;
    description: string;
};
export const useTodosStore = defineStore("todosStore", () => {
    const config = useRuntimeConfig();
    let todoList = ref<Todo[]>([]);
    const loading = ref(false);
    const error = ref('');

    const fetchTodos = async () => {
        loading.value = true;

        try {
            const response = await fetch(
                "https://86a4h9y007.execute-api.eu-west-1.amazonaws.com/development/nulmeting/todo",
                {
                    headers: {
                        "x-api-key": config.public.apiKey as string,
                    },
                }
            );

            const data = await response.json();

            if (todoList.value.some((todo) => todo.id === data.todo.id)) {
                error.value = "Todo already exists";
                return;
            }

            error.value =  '';
            todoList.value.push(data.todo);

            // console.log(data.todo);
        } catch (error) {
            console.error(error);
        } finally {
            loading.value = false;
        }
    };

    return {
        todoList,
        fetchTodos,
        loading,
        error
    };
});
