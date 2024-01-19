// import { Dispatch } from 'lib/store'
import axios from "axios";
import { API_URL, TOKEN, ACCESS_TOKEN } from "utils/setting"
import { RematchDispatch } from '@rematch/core';
import { Dispatch } from "lib/store"
import { createModel } from '@rematch/core'
import type { RootModel } from 'models'
import {loadCookie} from "utils/cookies"
export const banner = createModel<RootModel>()({
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
    async getList(payload: any, rootState: any) {
      try {
        let response = await axios.get(`${API_URL}banner/list?filter=[{"field":"active","operator":"contains","id":46060,"value":"1"}]`, {
          headers:
          {
            Authorization: `${TOKEN}`
          }, 
        }) 
        let result = response.data;
        if(result?.code === 1) this.setState({
          listBanner: result?.data?.list
        })
      } catch (error) {
        this.setState({
          listBanner: []
        }) 
        // return returnDataError(ERROR.ERROR_UNKNOWN, error.message)
      }

    },
  }),
})