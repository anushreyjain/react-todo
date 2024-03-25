import { configureStore } from "@reduxjs/toolkit";
import todoReucer from "../features/todoSlice";

export const store = configureStore({ reducer: todoReucer });
