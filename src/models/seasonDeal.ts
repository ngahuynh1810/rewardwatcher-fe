// import { Dispatch } from 'lib/store'
import axios from "axios";
import { API_URL , TOKEN} from "utils/setting"
import { RematchDispatch } from '@rematch/core';
import { Dispatch } from "lib/store"
import { createModel } from '@rematch/core'
import type { RootModel } from 'models'
import { createSearchParams } from 'react-router-dom';
export const seasonDeal = createModel<RootModel>()({
  state: {
    listSessionDeal: null,
    activeSessionDeal: null,
  },
  reducers: {
    setState(state: any, payload: any) {
      state = { ...state, ...payload };
      return { ...state };
    },
  },
  effects: (dispatch: Dispatch) => ({
    async getListSessionStore(payload: any, rootState: any) {
      try {
        let response = await axios.get(`${API_URL}cashback/list-by-season-store?${createSearchParams(payload)}`, {
          headers:
          {
            Authorization: `${TOKEN}`
          }, 
        });  
        let result = response.data;
        this.setState({
          listSessionDeal: result?.data?.list,
        })
      }  catch (error) {
        console.log(error)
    }
    },
    async getListSessionDeal(payload: any, rootState: any) {
      try {
        let response = await axios.get(`${API_URL}season-deal/list?filter=[{"field":"active","operator":"equals","value":"1"}]`, {
          headers:
          {
            Authorization: `${TOKEN}`
          }, 
        });  
        let result = response.data;
          console.log(result)
          if(result?.code === 1 && result?.data?.total === 1) {
          this.setState({
            activeSessionDeal: result?.data?.list[0]
          })
          dispatch.seasonDeal.getListSessionStore({
            limit: 12
          })
        }
      }  catch (error) {
        console.log(error)
    }
    },
  }),
})