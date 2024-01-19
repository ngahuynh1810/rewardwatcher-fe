// import { Dispatch } from 'lib/store'
import axios from "axios";
import { API_URL, TOKEN } from "utils/setting"
import { RematchDispatch } from '@rematch/core';
import { Dispatch } from "lib/store"
import { createModel } from '@rematch/core'
import type { RootModel } from 'models'
import {ACCESS_TOKEN} from "utils/setting"
import {saveCookie} from "utils/cookies"
export const auth = createModel<RootModel>()({
  state: {
    authToken: ""
  },
  reducers: {
    setState(state: any, payload: any) {
      state = { ...state, ...payload };
      return { ...state };
    },
  },
  effects: (dispatch: Dispatch) => ({
    async getToken(payload: any, rootState: any) {
      try {
        let response = await axios.post(`${API_URL}auth/section`, {
          }) 
        let result = response.data;
        saveCookie({name: ACCESS_TOKEN, data: result.access_token})
        // if(result?.code === 1)   
      } catch (error) {
        // return returnDataError(ERROR.ERROR_UNKNOWN, error.message)
      }

    },
  }),
})