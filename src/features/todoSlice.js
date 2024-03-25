import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [{ id: 1, title: "Test todo", status: false }],
};

export const todoSlice = createSlice({
  name: "todoSlice",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: nanoid(),
        title: action.payload,
        status: false,
      };
      state.todos.push(newTodo);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    markTodoDone: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, status: !todo.status };
        }
        return todo;
      });
    },
    updateTodo: (state, action) => {
      state.todos = state.todos.map((todo) => ({
        ...todo,
        title:
          todo.id === action.payload.id
            ? action.payload.data.title
            : todo.title,
      }));
    },
  },
});

// this export will be used in components
export const { addTodo, removeTodo, markTodoDone, updateTodo } =
  todoSlice.actions;

// this export will be used in store
export default todoSlice.reducer;
