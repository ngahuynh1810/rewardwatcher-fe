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
import {formatDateTime} from "utils/setting"
export default function RealTimeCashback(props: {
  listCashback: any
}) {

  return (
    <div className='rounded border'>
      <div className='bg-light pt-2 pb-2 px-3 d-flex rounded align-items-center'>
        <Image
         priority
         src={"/images/real_time_clock.png"}
         className="me-2 object-fit-contain"
         height={20}
         width={20}
         alt={"real_time_clock"}
        />
        <h6 className='mb-0 lh-base fw-bold fs-8 text-primary'>Real-time update time</h6> </div>
      <div className='p-3'>
        {props.listCashback.map((cashback: any, index: number) => 
          <>
          <div className='d-flex flex-row justify-content-between '>
            <div className='d-flex align-items-center fw-bold'>
              <Image
                priority
                src={cashback.cashback_website?.image?.url}
                className="me-2 object-fit-contain"
                height={20}
                width={48}
                alt={"cashback_website"}
                />
              <div className='fs-8'>{cashback.cashback_website?.name}</div> 
            </div>
            <div className='fw-normal text_neutral_600 fs-9 lh-base'>{formatDateTime(cashback.updated)}</div> 
            {/* <hr/> */}
           
          </div>
          {index !== props.listCashback.length - 1 && <hr className="w-100"/>}
          </>)}
      </div>
    </div>
  )
} 
