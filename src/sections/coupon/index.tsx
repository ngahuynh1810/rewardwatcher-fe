import React, { useState, useMemo } from 'react'
import Head from 'next/head'
import utilStyles from 'styles/utils.module.css'
import Link from 'next/link'
import { Provider } from 'react-redux'
import App from 'pages/App'
import Image from 'next/image'
import { Carousel, Stack, Card, Button } from 'react-bootstrap';
// import { coupons } from 'fakeData/coupons'
import { categories } from 'fakeData/categories'
import { ScrollingCarousel } from '@trendyol-js/react-carousel';
import Slider from "react-slick";
import ModalCoupon from "sections/coupon/modalCoupon"
import {formatCouponDate, formatCashbackString} from "utils/setting"
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
export default function Coupon(props: {
  listCoupon: any,
  couponSection: any,
  router: any
}) {
  const [selectedCoupon, setSelectedCoupon] = useState<any>();
  let settings = {
    variableWidth: true,
    infinite: (props.listCoupon  || []).length > 6 ? true : false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    dots: false,
    draggable: false,
    prevArrow: <img src="images/previous_slick_icon.png" />,
    nextArrow: <img src="images/next_slick_icon.png" />,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          // variableWidth: false,
          slidesToShow: 6,
          slidesToScroll: 2,
          // arrows: false,
          draggable: false,
        }
      },
      {
        breakpoint: 1400,
        settings: {
          variableWidth: false,
          slidesToShow: 4,
          slidesToScroll: 2,
          draggable: false
          // arrows: false,
        }
      },
      {
        breakpoint: 600,
        settings: {
          variableWidth: false,
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: false,
          draggable: false
        }
      },
      {
        breakpoint: 500,
        settings: {
          variableWidth: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
        }
      }
    ]
  };
  return (
    <section className='container_coupon'>
      <div className="container">
        <ModalCoupon
          isShowDialog = {selectedCoupon ? true : false}
          handleCloseDialog = {() => setSelectedCoupon(null)}
          coupon= {selectedCoupon}
          router={props.router}
        />
        {(props.listCoupon || []).length ?
        <>
          <div className='w-75 m-auto text-center'>
            {props.couponSection?.title && <h1 className="text-center lh-1">{props.couponSection?.title || "Best coupons of the day"}</h1>}
            {props.couponSection?.description && <div className='fw-normal text_neutral_600 subtitle_section lh-base '>{props.couponSection?.description || "Use these vouchers to save more today"}</div>}
          </div>
          <Slider {...settings}>
            {(props.listCoupon || []).map((coupon: any, index: number) => {
              return <div  onClick={() => setSelectedCoupon(coupon)} key={index} className="d-flex flex-column box_coupon">
                <Image
                  priority
                  src={coupon?.image?.url || "/images/coupon.png"}
                  className="coupon_image "
                  height={160}
                  width={500}
                  alt={"Logo"}
                />
                {coupon?.expiration_date ?<div className='box_coupon_date'><Image
                  priority
                  src="/images/clock_circle.png"
                  className="me-1"
                  height={20}
                  width={20}
                  alt={"Logo"}
                />{formatCouponDate(coupon?.start_date, coupon?.expiration_date)}</div> : ""}
                <div 
              //   onClick={()=> {
              //   if(coupon.website) window && window.open(
              //     coupon.website ,
              //     '_blank' // <- This is what makes it open in a new window.
              //   );
              // }} 
              >
                <div className="gap-2 d-flex flex-column">   
                <h6 className="coupon_cashback_title my-0">{coupon?.store?.name}</h6>
                <div className="coupon_cashback_value"><strong>{formatCashbackString(coupon?.cashback).cashbackValue}</strong>{formatCashbackString(coupon?.cashback).specialString}</div>
                <span className="coupon_cashback_description">{coupon.description}</span></div>
                </div>
                
                <button className="button_coupon">Get code</button>
              </div>
            })}
          </Slider>
          {/* <div className="d-flex justify-content-center"> <button className='btn_view_more_coupon'>See All</button></div> */}
        </> : ""}
      </div>
    </section>
  )
} 
