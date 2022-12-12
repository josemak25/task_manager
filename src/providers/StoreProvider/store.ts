import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FLUSH,
  PAUSE,
  PURGE,
  PERSIST,
  REGISTER,
  REHYDRATE,
  persistStore,
  persistReducer,
} from "redux-persist";
import { TASK_REDUCER_SLICE_NAME, taskReducer } from "./reducers/task/reducer";

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
};

const reactotronEnhancer = (): any => {
  const enhancers = [];

  if (__DEV__) {
    const { reactotron } = require("../../config/reactotron");

    enhancers.push(reactotron.createEnhancer());
  }

  return enhancers;
};

const rootReducer = combineReducers({
  [TASK_REDUCER_SLICE_NAME]: taskReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  devTools: __DEV__,
  reducer: persistedReducer,
  enhancers: [...reactotronEnhancer()],
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
