import React, { useState, useMemo } from 'react'
import Head from 'next/head'
import utilStyles from 'styles/utils.module.css'
import Link from 'next/link'
import { store } from 'lib/store'
import { Provider } from 'react-redux'
import App from 'pages/App'
import Image from 'next/image'
import Carousel from 'react-bootstrap/Carousel';
import { stores } from 'fakeData/stores'
import { categories } from 'fakeData/categories'
import { ScrollingCarousel } from '@trendyol-js/react-carousel';
import {formatDateTime, formatCashbackString} from "utils/setting"
import ModalCashback from 'sections/cashback/modalCashback'
export default function CashbackItem(props: {
  cashback: any,
  index: number,
  router: any
}) {
  const [selectedCashback, setSelectedCashback] = useState<any>();
  const {cashback, index} = props
  return (
    <>
      <ModalCashback  
         isShowDialog = {selectedCashback ? true : false}
         handleCloseDialog = {() => setSelectedCashback(null)}
         cashback= {selectedCashback}
         router={props.router}
      />
     <div className="d-flex flex-column container_cashback" onClick={() => setSelectedCashback(cashback)}>
    <div className="position-relative d-flex flex-column justify-content-center align-items-center">
      <Image
        priority
        src={cashback.cashback_website?.image ? cashback.cashback_website?.image.url : "/images/Logo-RW.png"}
        className="m-2 image_store"
        // layout='fill'
        height={72}
        width={100}
        alt={"Logo"}
      />
    <div className={index === 0 ? 'store_top_cashback_value' : 'store_cashback_value'}><strong>{formatCashbackString(cashback?.cashback).cashbackValue}</strong>{formatCashbackString(cashback?.cashback).specialString}</div>
    </div>

  </div>
    </>
    
  )
} 
