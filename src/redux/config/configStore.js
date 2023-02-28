import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import boards from "../module/boardSlice";

const store = configureStore({
  reducer: {
    //   todos,
    boards,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
export default store;
