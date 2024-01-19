// import { Dispatch } from 'lib/store'
import axios from "axios";
import { API_URL , TOKEN} from "utils/setting"
import { RematchDispatch } from '@rematch/core';
import { Dispatch } from "lib/store"
import { createModel } from '@rematch/core'
import type { RootModel } from 'models'
export const company = createModel<RootModel>()({
  state: {
    detailCompany: null,
    footerHeight: 0
  },
  reducers: {
    setState(state: any, payload: any) {
      state = { ...state, ...payload };
      return { ...state };
    },
    setFooterHeight(state: any, payload: any) {
      state = { ...state, footerHeight: payload };
      return { ...state };
    },
  },
  effects: (dispatch: Dispatch) => ({
    async getDetail(payload: any, rootState: any) {
      try {
        let response = await axios.get(`${API_URL}company/detail`, {
          headers:
          {
            Authorization: `${TOKEN}`
          }, 
        });  
        let result = response.data;
        this.setState({
          detailCompany: result?.data,
        })
      }  catch (error) {
        console.log(error)
    }
    },
  }),
})