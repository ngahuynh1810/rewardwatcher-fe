// import { Dispatch } from 'lib/store'
import axios from "axios";
import { API_URL, TOKEN, ACCESS_TOKEN } from "utils/setting"
import { RematchDispatch } from '@rematch/core';
import { Dispatch } from "lib/store"
import { createModel } from '@rematch/core'
import type { RootModel } from 'models'
import {loadCookie} from "utils/cookies"
export const subscribe = createModel<RootModel>()({
  state: {
    listBanner: []
  },
  reducers: {
    setState(state: any, payload: any) {
      state = { ...state, ...payload };
      return { ...state };
    },
  },
  effects: (dispatch: Dispatch) => ({
    async sendSubscribe(payload: any, rootState: any) {
      try {
        let response = await axios.post(`${API_URL}subscribe/create`, payload, {
          headers:
          {
            Authorization: `${TOKEN}`
          }, 
        }) 
        let result = response.data;
         
      } catch (error) {
        // return returnDataError(ERROR.ERROR_UNKNOWN, error.message)
      }

    },
  }),
})