import { configureStore } from '@reduxjs/toolkit'
import { playingMusicSlice } from './playingMusic/playingMusicSlice'

export const store = configureStore({
    reducer: {
        playingMusic : playingMusicSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
