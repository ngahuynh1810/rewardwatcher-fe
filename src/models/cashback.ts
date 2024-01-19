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
export const cashback = createModel<RootModel>()({
  state: {
    listCashbacksOfStore: [],
    listCashback: [],
    listSearchCashback: [],
    totalCashback: 0,
    loadMore: true,
    pageCashback: 0,
  },
  reducers: {
    setState(state, payload) {
      state = { ...state, ...payload };
      return { ...state };
    },
    resetLoadMoreCashback(state, payload) {
      state = { ...state,  pageCashback: 0, loadMore: true, listCashback: []};
      return { ...state };
    },
    resetSearchState(state, payload) {
      state = { ...state,  listSearchCashback: []};
      return { ...state };
    },
  },
  effects: (dispatch: Dispatch) => ({
    async getList(payload: any, rootState: any) {
      try {
        if(payload.uuid) {
          payload.categories = JSON.stringify([payload.uuid])
        }
        payload.limit = payload.limit || 12;
        let filterParam = ""
        if(payload.filter) {
          filterParam = payload.filter
          delete payload.filter;
        }
        let response = await axios.get(`${API_URL}cashback/list?${createSearchParams(payload)}&filter=${filterParam}`, {
          headers:
          {
            Authorization: `${TOKEN}`
          },
        }) 
        let result = response.data;
        if(result?.code === 1) {
          const {listCashback, pageCashback} =  rootState.cashback
          let newListCashback =  result?.data?.page === 0 ? result?.data?.list : listCashback.concat(result?.data?.list)
          // this.setState((pageCashback: any) =>({pageCashback: pageCashback+1}))
          this.setState({
            listCashback: newListCashback,
            totalCashback: result?.data?.total,
            pageCashback: pageCashback + 1,
            loadMore: result?.data?.list?.length < result?.data?.limit ? false : true
        })
        return result?.data?.list;
        } else  this.setState({
          listCashback:  [],
          totalCashback: 0,
          pageCashback: 0
      })
      return  []
      } catch (error) {
        this.setState({
          listCashback:  [],
          totalCashback: 0,
          pageCashback: 0
      })
        return  []
        // return returnDataError(ERROR.ERROR_UNKNOWN, error.message)
      }

    },
    async getListCashbacksOfStore(payload: any, rootState: any) {
      try {
        this.setState({
          listCashbacksOfStore: [],
          totalCashback: 0,
      })
        if(payload.uuid) {
          payload.categories = JSON.stringify([payload.uuid])
        }
        payload.limit = payload.limit || 12;
        let filterParam = ""
        if(payload.filter) {
          filterParam = payload.filter
          delete payload.filter;
        }
        let response = await axios.get(`${API_URL}cashback/list?${createSearchParams(payload)}&filter=${filterParam}`, {
          headers:
          {
            Authorization: `${TOKEN}`
          },
        }) 
        let result = response.data;
        if(result?.code === 1) {
          const {listCashback, pageCashback} =  rootState.cashback
          this.setState({
            listCashbacksOfStore: result?.data?.list,
            totalCashback: result?.data?.total,
        })
        return result?.data?.list;
        } else  this.setState({
          listCashbacksOfStore:  [],
          totalCashback: 0, 
      })
      return  []
      } catch (error) {
        this.setState({
          listCashbacksOfStore:  [],
          totalCashback: 0, 
      })
        return  []
        // return returnDataError(ERROR.ERROR_UNKNOWN, error.message)
      }

    },
      
    async getSearchList(payload: any, rootState: any) {
      try {
        if(payload.uuid) {
          payload.categories = JSON.stringify([payload.uuid])
        }
        let filterParam = ""
        if(payload.filter) {
          filterParam = payload.filter
          delete payload.filter;
        }
        let response = await axios.get(`${API_URL}cashback/list?${createSearchParams(payload)}&filter=${filterParam}`, {
          headers:
          {
            Authorization: `${TOKEN}`
          },
        }) 
        let result = response.data;
        if(result?.code === 1) {
          this.setState({
            listSearchCashback: result?.data?.list,
        })
        } else  this.setState({
          listSearchCashback:  [],
      })
      } catch (error) {
        this.setState({
          listSearchCashback:  [],
      })
        // return returnDataError(ERROR.ERROR_UNKNOWN, error.message)
      }

    },
  }),
})