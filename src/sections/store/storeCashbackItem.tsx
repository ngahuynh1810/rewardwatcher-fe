import React, {useEffect} from "react";
import Head from 'next/head'
import utilStyles from 'styles/utils.module.css'
import Link from 'next/link'
import { store } from 'lib/store'
import { Provider } from 'react-redux'
import App from 'pages/App'
import Image from 'next/image' 
import Carousel from 'react-bootstrap/Carousel';
import {stores} from 'fakeData/stores'
import {categories} from 'fakeData/categories'
import {ScrollingCarousel} from '@trendyol-js/react-carousel';
import { formatDateTime, formatCashbackString } from "utils/setting"
export default function StoreCashbackItem(props: any) { 
  const {cashback, actionItem} = props
  return (
    <div className="row box_store_cashback" onClick={() => actionItem(cashback)}>
      <div className="col-12 col-md-4 col-lg-4 align-items-center d-flex justify-content-center">
          <Image
            priority
            src={cashback.store?.image ? cashback.store?.image.url : "/images/Logo-RW.png"}
            className="m-auto image_store "
            height={80}
            width={100}
            alt={"Logo"}
          />
    </div>
    <div className="col-12 col-md-8 col-lg-8">
      <div className="ms-3">
      <h6 className="store_name">{cashback.store?.name}</h6>
      <div className='store_cashback_value'><strong>{formatCashbackString(cashback?.cashback).cashbackValue}</strong>{formatCashbackString(cashback?.cashback).specialString}</div>
      <div className='store_cashback_name fst-italic'>{`Best rate fount at `} <Image
         priority
         src={cashback.cashback_website?.image?.url || "/images/Logo-RW.png"}
         className="me-2"
         height={22}
         width={50}
         alt={"Logo"}
       /></div>
      </div>
    </div>
     
    </div>
  )
} 
