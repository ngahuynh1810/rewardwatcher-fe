// import { Dispatch } from 'lib/store'
import axios from "axios";
import { API_URL, TOKEN, ACCESS_TOKEN } from "utils/setting"
import { RematchDispatch } from '@rematch/core';
import { Dispatch } from "lib/store"
import { createModel } from '@rematch/core'
import type { RootModel } from 'models'
import {loadCookie} from "utils/cookies"
import { createSearchParams } from 'react-router-dom';
export const coupon = createModel<RootModel>()({
  state: {
    listCoupon: []
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
        let response = await axios.get(`${API_URL}coupon/list-unexpired?${createSearchParams(payload)}`, {
          headers:
          {
            Authorization: `${TOKEN}`
          }, 
        }) 
        let result = response.data;
        if(result?.code === 1) this.setState({
          listCoupon: result?.data?.list
        })
      } catch (error) {
        // return returnDataError(ERROR.ERROR_UNKNOWN, error.message)
      }

    },
  }),
})