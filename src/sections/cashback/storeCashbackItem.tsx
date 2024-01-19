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
import { rankingBackgroundColor, rankFontColor, ordinalFormOfNumbers } from 'utils/setting'
import { ScrollingCarousel } from '@trendyol-js/react-carousel';
import { formatDateTime, formatCashbackString } from "utils/setting"
export default function StoreCashbackItem(props: {
  actionItem: any,
  index: number,
  cashback: any,
  currentPage?: any,
  filterCharacter?: any,
  isPopularItems?:boolean,
  hightLightBestCashback?: boolean,
  pageSize?:number
}) {
  const [selectedCashback, setSelectedCashback] = useState<any>();
  const { cashback, index, currentPage, filterCharacter, actionItem, isPopularItems, hightLightBestCashback, pageSize = 0 } = props;
  const renderPopularChips = (index: number, currentPage: number, filterCharacter: string) => {
    // console.log(isPopularItems)
    if(isPopularItems) {
      if (index > 100 || index < 0  || filterCharacter !== "All") return null;
      else if (index === 0) return <div className="top_1_popular_store">
        <Image
          priority
          src={"/images/fire.png"}
          className="me-2 object-fit-contain"
          height={20}
          width={20}
          alt={"Logo"}
        />
        {ordinalFormOfNumbers[index + 1]} place</div>
      else if (index === 1) return <div className="top_2_popular_store">
        {ordinalFormOfNumbers[index + 1]} place</div>
      else if (index === 2) return <div className="top_3_popular_store">
        {ordinalFormOfNumbers[index + 1]} place</div>
    else return <div className="top_popular_store" style={{
      backgroundColor: rankingBackgroundColor[index] ,
      color: rankFontColor[index]
    }}>
        {`${ordinalFormOfNumbers[index + 1]} place`}</div>
  }
}
  return (
    <div className="d-flex flex-column container_popular_store" onClick={() => actionItem()}>
      <div className="position-relative mb-1">
        <div className='d-flex justify-content-center'>
          <Image
            priority
            src={cashback.store?.image ? cashback.store?.image.url : "/images/Logo-RW.png"}
            className="mx-2 image_store mt-5 my-3 w-100"
            height={60}
            width={120}
            alt={"Logo"}
          />
        </div>
        {renderPopularChips(index, currentPage, filterCharacter)}
      </div>


      <div className='my-2 gap-1 d-flex flex-column'>
        <h6 className='lh-1 store_name'>{cashback.store?.name}</h6>
        <div className={index === 0 && hightLightBestCashback ? 'store_top_cashback_value' : 'store_cashback_value'}><strong>{formatCashbackString(cashback?.cashback).cashbackValue}</strong>{formatCashbackString(cashback?.cashback).specialString}</div>
        <div className='store_cashback_name fst-italic'>{`Best rate fount at `} <Image
          priority
          src={cashback.cashback_website?.image?.url || "/images/Logo-RW.png"}
          className="me-2 object-fit-contain"
          height={20}
          width={50}
          alt={"Logo"}
        /></div>
      </div>
    </div>

  )
} 
