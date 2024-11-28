import {
  configureStore,
  Middleware,
  MiddlewareAPI,
  isRejectedWithValue,
  combineReducers,
  Reducer,
  AnyAction,
} from "@reduxjs/toolkit";
import { TOKEN_STORAGE_KEY } from "@/config/constants";
import authReducer, { logoutUser } from "@/store/slice/auth.slice";
import { api } from "@/store/slice/api.slice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import toast from "react-hot-toast";
import Capitalize from "@/helpers/capitalize";

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    if (action?.payload?.data?.message?.toLowerCase() === "jwt expired") {
      api.dispatch(logoutUser());
      return;
    } else if (action?.payload?.status === 500) {
      toast.error("Something went wrong");
    } else if (action?.payload?.status === 401) {
      // api.dispatch(logoutUser());
      toast.error(Capitalize(action?.payload?.data?.message as string) ?? "Something went wrong");
      return;
    } else if(action?.payload?.data?.message === "Taxpayer not found"){
      console.log("None")
    } else if(action?.payload?.data?.message === "transaction not found. please contact our customer service!"){
      console.log("None")
    }else {
      toast.error(Capitalize(action?.payload?.data?.message as string) ?? "Something went wrong");
    }
  } else {
    if (action?.type === "api/executeMutation/fulfilled") {
      toast.success(Capitalize(action?.payload?.message as string) ?? "Success");
    }
  }

  return next(action);
};

const appReducer = combineReducers({
  auth: authReducer,
  [api.reducerPath]: api.reducer,
});

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === "auth/logoutUser") {
    if (typeof window !== undefined) {
      sessionStorage.removeItem(TOKEN_STORAGE_KEY as string);
      localStorage.removeItem(TOKEN_STORAGE_KEY as string);
    }
    api.util.resetApiState();
    window.location.replace("/");

    state = {} as RootState;
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
      },
    })
      .concat(api.middleware)
      .concat(rtkQueryErrorLogger),
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof appReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
