// import { Dispatch } from 'lib/store'
import axios from "axios";
import { API_URL, TOKEN } from "utils/setting"
import { RematchDispatch } from '@rematch/core';
import { Dispatch } from "lib/store"
import { createModel } from '@rematch/core'
import type { RootModel } from 'models'
export const sections = createModel<RootModel>()({
    state: {
        couponSection: null,
        storeSection: null,
        cashbackCardSection: null,
        topStoreSection: null,
    },
    reducers: {
        setState(state: any, payload: any) {
            state = { ...state, ...payload };
            return { ...state };
        },
    },
    effects: (dispatch: Dispatch) => ({
        async getCouponSection(payload: any, rootState: any) {
            try {
                let response = await axios.get(`${API_URL}coupon-section/list?filter=[{"field":"active","operator":"equals","value":"1"}]`, {
                    headers:
                    {
                        Authorization: `${TOKEN}`
                    },
                });
                let result = response.data;
                if (result?.code === 1 && result?.data?.total === 1) {
                    this.setState({
                        couponSection: result?.data?.list[0]
                    })
                }
            } catch (error) {
                console.log(error)
            }
        },
        async getStoreSection(payload: any, rootState: any) {
            try {
                let response = await axios.get(`${API_URL}store-section/list?filter=[{"field":"active","operator":"equals","value":"1"}]`, {
                    headers:
                    {
                        Authorization: `${TOKEN}`
                    },
                });
                let result = response.data;
                if (result?.code === 1 && result?.data?.total === 1) {
                    this.setState({
                        storeSection: result?.data?.list[0]
                    })
                }
            } catch (error) {
                console.log(error)
            }
        },
        async getTopStoreSection(payload: any, rootState: any) {
            try {
                let response = await axios.get(`${API_URL}top-store-section/list?filter=[{"field":"active","operator":"equals","value":"1"}]`, {
                    headers:
                    {
                        Authorization: `${TOKEN}`
                    },
                });
                let result = response.data;
                if (result?.code === 1 && result?.data?.total === 1) {
                    this.setState({
                        topStoreSection: result?.data?.list[0]
                    })
                }
            } catch (error) {
                console.log(error)
            }
        },
        async getCashbackCardSection(payload: any, rootState: any) {
            try {
                let response = await axios.get(`${API_URL}cashback-card-section/list?filter=[{"field":"active","operator":"equals","value":"1"}]`, {
                    headers:
                    {
                        Authorization: `${TOKEN}`
                    },
                });
                let result = response.data;
                if (result?.code === 1 && result?.data?.total === 1) {
                    this.setState({
                        cashbackCardSection: result?.data?.list[0]
                    })
                }
            } catch (error) {
                console.log(error)
            }
        },
    }),
})