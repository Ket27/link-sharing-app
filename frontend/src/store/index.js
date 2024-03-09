import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import linkSlice from "./linkSlice";

const userStore = configureStore({
  reducer: {
    user : userSlice.reducer,
    links : linkSlice.reducer,
  },
});

export default userStore;
