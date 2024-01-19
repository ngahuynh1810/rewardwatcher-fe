// import { Dispatch } from 'lib/store'
import axios from "axios";
import { API_URL , TOKEN} from "utils/setting"
import { RematchDispatch } from '@rematch/core';
import { Dispatch } from "lib/store"
import { createModel } from '@rematch/core'
import type { RootModel } from 'models'
export const topDeal = createModel<RootModel>()({
  state: {
    listTopDeal: null
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
        let response = await axios.get(`${API_URL}cashback/list-by-top-store`, {
          headers:
          {
            Authorization: `${TOKEN}`
          }, 
        });  
        let result = response.data;
        this.setState({
          listTopDeal: result?.data?.list,
        })
      }  catch (error) {
        console.log(error)
    }
    },
  }),
})