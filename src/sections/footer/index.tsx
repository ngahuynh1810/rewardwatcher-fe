import React, { useEffect, useRef } from 'react'
import Head from 'next/head'
import utilStyles from 'styles/utils.module.css'
import Link from 'next/link'
import { store } from 'lib/store'
import { Provider } from 'react-redux'
import App from 'pages/App'
import Image from 'next/image'
import { Carousel, Stack, Card, Button } from 'react-bootstrap';
import { cashbackCards } from 'fakeData/cashbackCards'
import { categories } from 'fakeData/categories'
import { ScrollingCarousel } from '@trendyol-js/react-carousel';
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
export default function Footer(props: {
  detailCompany?: any,
  listCategory?: any,
  router: any,
  setFooterHeight: any,
  footerHeight: number,
}) { 
  const ref = useRef(null)
  useEffect(() => {
    window.addEventListener("resize", () =>  handleResizeFooter());
    return () => {
      window.removeEventListener("resize", () =>  handleResizeFooter());
    };
  }, []);
  
  const handleResizeFooter = () => {
    if(ref?.current && (ref?.current["clientHeight"] !== props.footerHeight)) {
      props.setFooterHeight(ref?.current && ref?.current["clientHeight"])
    }
  }
  useEffect(() => {
    handleResizeFooter()
  }, [ref, ref?.current, ref?.current && ref?.current["clientHeight"]])
  return (
    <section ref={ref} className='primary_section  w-100 bottom-0 position-absolute'>
      <div className="container pt-5 pb-2"> 
        <div className="row ">
          <div className="col-lg-4 col-md-12 mb-3" style={{marginRight: "1rem"}}>
            <div className="container_section_company_footer">
              <Image
                priority
                src={props.detailCompany?.image?.url || "/images/Logo-RW_footer.png"}
                className="logo_company me-3 object-fit-contain"
                height={80}
                width={100}
                alt={"Logo"}
              />
            <div> 
              <div className="description_footer">{props.detailCompany?.introduce}</div>
              <div className="d-flex align-items-center">
              <Image
                priority
                src="/images/envelope.png"
                className="me-2 object-fit-contain"
                height={20}
                width={20}
                alt={"Logo"}
              />
                <span>{props.detailCompany?.email}</span>
                </div>
            </div>
             
            </div>
          
            
          </div>
          <div className="col-lg-2 col-md-12 mb-3">
            <h6 className='mb-3'>Resource</h6>
            <div className='title_footer'><Link href="/general-help-support">General Help & Support</Link></div>
            <div className='title_footer'><Link href="/term-of-service">Terms of Service</Link></div>
            <div className='title_footer'><Link href="/private-and-policy">Privacy Policy</Link></div>
          </div>
          <div className="col-lg-2 col-md-12 mb-3">
            <h6 className='mb-3'>About us</h6>
            <div className='title_footer'><Link href="/what-is-rewardwatcher">What is RewardsWatchers?</Link>
              <div className='title_footer'><Link href="/the-news">In the News </Link></div>
              <div className='title_footer'><Link href="/contact-us">Contact Us </Link></div>
              </div>
            </div>
            <div className="col-lg-2 col-md-12 mb-3">
              <h6 className='mb-3'>Popular categories</h6>
              {(props.listCategory || []).map((category: any, index: number) => {
                if(index <= 6)
                return    <div className='title_footer' onClick={() => props.router.push(`/${category.code}`)}>{category?.name} </div>
              })}
            </div>
          </div>
          <hr className="divider_footer"/>
          <div className="copyright">Copyright © {props.detailCompany?.copyright}</div>
        </div>
        {/* <hr className="dropdown-divider"/> */}
    </section>
  )
} 
