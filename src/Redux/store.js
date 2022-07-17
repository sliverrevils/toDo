import { configureStore} from "@reduxjs/toolkit";
import { appReducer } from "./appSlice.js";
import {todoReducer} from './todoSlice.js';



export const Store = configureStore({
    reducer:{tasks:todoReducer,app:appReducer},
   //middleware:getDefaultMiddleware=>getDefaultMiddleware().concat(stringMiddleware),
    devTools:process.env.NODE_ENV!=='production'
})

