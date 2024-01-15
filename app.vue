<script setup>
const todosStore = useTodosStore();
</script>

<template>
    <div>
        <h1>Todos</h1>
        <button @click="todosStore.fetchTodos" :disabled="todosStore.loading">
            {{todosStore.loading ? "Loading..." : "Load todos"}}
        </button>
        <p>{{todosStore.error}}</p>
        <table border="1">
            <tbody>
                <tr>
                    <th>id</th>
                    <th>assignee</th>
                    <th>dueDateTime</th>
                    <th>description</th>
                </tr>
                <tr v-for="todo in todosStore.todoList" :key="todo.id">
                    <td>{{ todo.id }}</td>
                    <td>{{ todo.assignee }}</td>
                    <td>{{ new Date(todo.dueDateTime).toLocaleString() }}</td>
                    <td>{{ todo.description }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
    table {
        border-collapse: collapse;
    }
    th,
    td {
        padding: 0.5rem;
    }
    th {
        background-color: #eee;
    }
    tr:nth-child(even) {
        background-color: #eee;
    }
    tr:nth-child(odd) {
        background-color: #fff;
    }
    tr:hover {
        background-color: #ccc;
    }
</style>