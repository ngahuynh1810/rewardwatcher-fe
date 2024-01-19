// import { Dispatch } from 'lib/store'
import axios from "axios";
import { API_URL, TOKEN, ACCESS_TOKEN } from "utils/setting"
import { RematchDispatch } from '@rematch/core';
import { Dispatch } from "lib/store"
import { createModel } from '@rematch/core'
import type { RootModel } from 'models'
import { IfcSampleInterface } from "typings";
import {loadCookie} from "utils/cookies"
import { createSearchParams } from 'react-router-dom';
export const category = createModel<RootModel>()({
  state: {
    listCategory: [],
    page: 0,
    loadMore: true,
  },
  reducers: {
    setState(state, payload) {
      state = { ...state, ...payload };
      return { ...state };
    },
  },
  effects: (dispatch: Dispatch) => ({
    async getList(payload: any = {}, rootState: any) {
      try {
      payload.limit = 20;
      payload.page = rootState.category?.page;
        let response = await axios.get(`${API_URL}categories/list?${createSearchParams(payload)}`, {
          headers:
          {
            Authorization: `${TOKEN}`
          },
        }) 
        let result = response.data;
        if(result?.code === 1) {
          let newListCategory =  rootState.category?.listCategory.concat(result?.data?.list)
          this.setState({
            page: result?.data?.page + 1,
            listCategory: newListCategory,
            loadMore: result?.data?.list?.length < result?.data?.limit ? false : true
        })}
      } catch (error) {
        console.log(error)
        // return returnDataError(ERROR.ERROR_UNKNOWN, error.message)
      }

    },
    async getDetail(payload: any = {}, rootState: any) {
      try {
        let filterParam = ""
        if(payload.filter) {
          filterParam = payload.filter
          delete payload.filter;
        }
        let response = await axios.get(`${API_URL}categories/list?${createSearchParams(payload)}&filter=${filterParam}`, {
          headers:
          {
            Authorization: `${TOKEN}`
          },
        }) 
        let result = response.data;
        if(result?.code === 1 && result.data?.list?.length) {
          return result.data?.list[0]
        } 
        return ""
      } catch (error) {
        console.log(error)
        return ""
        // return returnDataError(ERROR.ERROR_UNKNOWN, error.message)
      }

    },
  }),
})