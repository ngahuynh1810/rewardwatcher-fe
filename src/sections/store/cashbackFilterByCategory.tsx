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
import StoreCashbackItem from "sections/store/storeCashbackItem"
export default function Store(props: any) { 
  const [selectedCategoryUuid, setSelectedCategoryUuid] = React.useState<string>();
  const [selectedCategory, setSelectedCategory] = React.useState<any>();
  const handleClickCategory = (payload: {
    uuid?: string,
    category?: any,
    popular?: boolean,
    group_by?: boolean,
  }) => {
    props.getStoresByCategory(payload)
    setSelectedCategoryUuid(payload.uuid || "");
    setSelectedCategory(payload.category)
  }
  return (
   <section className='mt-5'>
    <div className='container container_categories pt-5'>
    <div className='section_title gap-3'>
    {props.storeSection?.title && <h1  className="text-center lh-1">{props.storeSection?.title || "Huge savings on 1000s  of top UK brands"}</h1>}
    {props.storeSection?.description && <div className='subtitle_section text-center  lh-1 text_neutral_600'>{props.storeSection?.description || "Voluptas deserunt assumenda quidem et aliquid quaerat alias. Et expedita tenetur ut sit ut dolorem minima aut molestias."}</div>}
    </div>
   
    <ScrollingCarousel className="scrolling-carousel">
    <div   className={!selectedCategoryUuid  ? "background_chip_category_active" : "background_chip_category"} onClick={() => handleClickCategory({popular: true, group_by: true})}>
    <Image
              priority
              src={`images/popular.png`}
              // src={!selectedCategoryUuid  ? `images/popular_hover.png`  : `images/popular.png`}
              // className="me-2"
              height={24}
              width={24}
              alt={"Logo"}
            />
      <div className="category_text">
      Popular store</div> </div> 
    <>
    {(props.listCategory || []).map((category: any, i: any) => 
     {return (<div 
      key={i}
      className={selectedCategoryUuid === category.uuid ? "background_chip_category_active" : "background_chip_category"}
      onClick={() => handleClickCategory({uuid: category.uuid, category, group_by: true})}
         >
           <Image
              priority
              // src={selectedCategoryUuid === category.uuid ? (category?.image_hover?.url || `images/${category?.code}_hover.png`) : (category?.image?.url || `images/${category?.code}.png`)}
              src={category?.image?.url || `images/${category?.code}.png`}
              // className="me-2"
              height={24}
              width={24}
              alt={"Logo"}
            />
        <div className="category_text">{category.name}</div>
      </div>)}
    ) }
    </>
     
    {props.loadMoreCategory ? <div className={ "background_chip_category"}  onClick={() => props.getListCategory()} > 
    <Image
              priority
              src={"/images/all_categories.png"}
              height={24}
              width={24}
              alt={"Logo"}
            />
            <div  className="category_text">All category</div>
    </div> : <div></div>}
</ScrollingCarousel>
    <div className="row my-3">
      {(props.listCashback || []).map((cashback: any, index: number) => (
        <div key={index} className="col-lg-3 col-md-4 col-6 mb-3">
           <StoreCashbackItem cashback={cashback} actionItem={() => selectedCategoryUuid ? props.router.push(`stores/${cashback.store?.code}`): props.router.push(`popular-stores/${cashback.store?.code}`)}/>
      </div>
      ))}
  </div>
  <div className="d-flex justify-content-center"> <button className='btn_view_more_store' onClick={() => {
    selectedCategoryUuid ? props.viewMoreStoresByCategory(selectedCategory?.code) : props.viewMorePopularStores()
    }}>View More {selectedCategoryUuid ? selectedCategory?.name : "Popular stores"}</button></div>
    </div>
   
  
   </section>
  )
} 
