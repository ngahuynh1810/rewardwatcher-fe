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
import { formatDateTime, formatCashbackString } from "utils/setting"
export default function FavoriteStore(props: {
  listSessionDeal: any,
  listTopDeal: any,
  activeSessionDeal: any,
  router: any,
  topStoreSection: any
}) {
  const { activeSessionDeal, listTopDeal = [], listSessionDeal, router } = props; 
  return (
    <section className='mt-5 primary_section position-relative overflow-hidden'>
       <Image
              priority
              src="/images/image_favorite_left.png"
              className={`object-fit-contain image_favorite_left ${utilStyles.borderCircle}`}
              height={144}
              width={144}
              alt=""
            />
             <Image
              priority
              src="/images/image_favorite_right.png"
              className={`object-fit-contain image_favorite_right ${utilStyles.borderCircle}`}
              height={144}
              width={144}
              alt=""
            />
      <div className="container container_favorite  position-relative z-index-2">
        <div className='w-75 m-auto mb-5 text-center'>
          {props.topStoreSection?.title && <h1 className="text-center   lh-1">{props.topStoreSection?.title || "Stores our members love"}</h1>}
          {props.topStoreSection?.description && <div className='text_neutral_300 fw-normal subtitle_section lh-base'>{props.topStoreSection?.description}</div>}
        </div>
        <div className="row justify-content-center">
          {(listTopDeal || []).map((cashback: any, index: number) => {
            if (index <= 5) return (
              <div key={index}  onClick={() => router.push(`/stores/${cashback?.store?.code}`)} className="col-lg-2 col-md-3 col-6 mb-3">
                <div className="box_favorite_store">
                  <Image
                    priority
                    src={cashback?.store?.image ? cashback.store?.image?.url : "/images/Logo-RW.png"}
                    className="image_store object-fit-contain"
                    height={72}
                    width={208}
                    alt={"Logo"}
                  />
                  {/* <h6>{store.name}</h6> */}
                  <div className='store_cashback_value'><strong>{formatCashbackString(cashback?.cashback).cashbackValue}</strong>{formatCashbackString(cashback?.cashback).specialString}</div>
                </div>
              </div>
            )
          })}
        </div>
        {activeSessionDeal && listSessionDeal?.length && <div className="container_session_stores">
          <div className='w-75 m-auto mt-5 mb-5 text-center'>
            <h1 className="text-center lh-1">{activeSessionDeal.title}</h1>
            <div className='text_neutral_300 fw-normal subtitle_section lh-base'>{activeSessionDeal.description}</div>
          </div>
          <div className="row ">
            {(listSessionDeal || []).map((cashback: any, index: number) => (
              <div key={index} onClick={() => router.push(`/stores/${cashback?.store?.code}`)} className="col-lg-2 col-md-3 col-sm-6 col-6 mb-3">
                <div className="box_session_store">
                  <Image
                    priority
                    src={cashback?.store?.image ? cashback?.store.image?.url : "/images/Logo-RW.png"}
                    className=" image_store object-fit-contain"
                    height={72}
                    width={208}
                    alt={"Logo"}
                  />
                  <div className="d-flex flex-column align-items-start text-start gap-1">
                    <h6 className="text_neutral_800 store_name mb-0">{cashback?.store.name}</h6>
                    <div className='store_cashback_value'><strong>{formatCashbackString(cashback?.cashback).cashbackValue}</strong>{formatCashbackString(cashback?.cashback).specialString}</div>
                    <div className='text_neutral_800 fw-normal fs-9 text-start gap-1 d-flex fst-italic'>{`Best rate fount at `} <Image
                      priority
                      src={cashback.cashback_website?.image?.url || "/images/Logo-RW.png"}
                      className="me-2 object-fit-contain"
                      height={22}
                      width={50}
                      alt={"Logo"}
                    /></div>
                  </div>

                </div>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-center"> <button className='btn_view_more_store' onClick={() => router.push('/stores')}>See All</button></div>
        </div>}

      </div>

    </section>
  )
} 
