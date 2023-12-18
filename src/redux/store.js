import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import modelReducer from "./modelsRedux";
import agentReducer from "./agencyRedux";
import clientReducer from "./clientsRedux";
import processReducer from "./processRedux";
import notificationReducer from "./notificationRedux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  process: processReducer,
  model: modelReducer,
  agency: agentReducer,
  client: clientReducer,
  notification: notificationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
