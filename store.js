// store.js
import { configureStore } from "@reduxjs/toolkit";
import api from "./../lib/redux/services/api";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
