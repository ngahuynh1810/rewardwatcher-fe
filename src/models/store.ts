// import { Dispatch } from 'lib/store'
import axios from "axios";
import { API_URL , TOKEN} from "utils/setting"
import { RematchDispatch } from '@rematch/core';
import { Dispatch } from "lib/store"
import { createModel } from '@rematch/core'
import type { RootModel } from 'models'
export const store = createModel<RootModel>()({
  state: {
    listSearchStore: []
  },
  reducers: {
    setState(state: any, payload: any) {
      state = { ...state, ...payload };
      return { ...state };
    },
  },
  effects: (dispatch: Dispatch) => ({
    async getSearchList(payload: any, rootState: any) {
      try {
        let response = await axios.get(`${API_URL}stores/list?filter=${JSON.stringify(payload.filter)}` ,{
          headers:
          {
            Authorization: `${TOKEN}`
          }, 
        });  
        let result = response.data;
        this.setState({
          listSearchStore: result?.data?.list,
        })
      }  catch (error) {
        console.log(error)
    }
    },
  }),
})