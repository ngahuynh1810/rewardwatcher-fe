import { init, RematchRootState, RematchDispatch } from '@rematch/core'
import { models, RootModel  } from "../models"

export const store = init({
	models, redux: {
		devtoolOptions: {},
		rootReducers: { RESET_APP: () => undefined }
}});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel>