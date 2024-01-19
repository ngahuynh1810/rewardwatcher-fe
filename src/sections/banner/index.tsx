import React, { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import utilStyles from 'styles/utils.module.css'
import Link from 'next/link'
import { store } from 'lib/store'
import { Provider } from 'react-redux'
import App from 'pages/App'
import Image from 'next/image'
import Carousel from 'react-bootstrap/Carousel';
import { RootState, Dispatch } from 'lib/store'
import { connect } from 'react-redux'
import { banners } from "fakeData/banner"
const BANNER_MOBILE_HEIGHT = 481
const BANNER_DESKTOP_HEIGHT = 413
const RESPONSIVE_MOBILE_WIDTH = 600
export default function Banner(props: any) {
  const [heightBanner, setHeightBanner] = useState<number>();
  const [marginLeftImage, setMarginLeftImage] = useState<number>();
  const captionRef = useRef(null);
  const ref = useRef(null);
  const bannerRef = useRef(null);
   const handleChangeItemBanner  = () => {
    let bannerWidth = bannerRef?.current ? bannerRef?.current["clientWidth"] : 0
    let captionWidth = captionRef?.current ? captionRef?.current["clientWidth"] : 0
    // 116 by margin design 
    if(bannerWidth)
      setMarginLeftImage( bannerWidth * 0.05 + captionWidth + 116)
   }
  useEffect(() => {
    handleResizeBanner()
  }, [ref?.current]);
  const handleResizeBanner = () => {
    let widthScreen = ref?.current ? ref.current["offsetWidth"] : 0;
    if (widthScreen <= RESPONSIVE_MOBILE_WIDTH) {
      setHeightBanner(BANNER_MOBILE_HEIGHT)
    } else setHeightBanner(BANNER_DESKTOP_HEIGHT)
    handleChangeItemBanner()
  }
  useEffect(() => {
    window.addEventListener("resize", () => handleResizeBanner());
    return () => {
      window.removeEventListener("resize", () => handleResizeBanner());
    };
  }, []);
  if (props.listBanner?.length)
    return (
      <div className="container container_banner" ref={ref}>
        <Carousel
          prevIcon={<img className="icon" src="images/previous_caurosel_icon.png" />}
          nextIcon={<img className="icon" src="images/next_caurosel_icon.png" />}
          indicators={props.listBanner?.length === 1 ? false : true}
          controls={props.listBanner?.length === 1 ? false : true}
          onSlid={() => handleChangeItemBanner()}
       >
          {props.listBanner.map((banner: any) => {
            if (!banner.title && !banner.content && !banner.description)
              return <Carousel.Item className='banner_only_image' style={{
                height: `${heightBanner}px`,
                cursor: "pointer"
              }}    onClick={() => {
                if(banner?.link)   window && window.open(
                  banner?.link,
                  '_blank' // <- This is what makes it open in a new window.
                );
              }}>
                <div   >
                  <Image
                    priority
                    src={heightBanner === BANNER_MOBILE_HEIGHT ? banner.image_mobile_banner?.url : banner.image_banner?.url}
                    className=""
                    layout="fill"
                    // height={100}
                    // width={100}
                    alt={"Logo"}
                  />
                </div>
              </Carousel.Item>
            return <Carousel.Item style={{
              height: `${heightBanner}px`,
              cursor: "pointer"
            }} onClick={() => {
              if(banner?.link)   window && window.open(
                banner?.link,
                '_blank' // <- This is what makes it open in a new window.
              );
            }}>
              <div ref={bannerRef}   className='banner_background'>
                <Image
                style={{
                  left: marginLeftImage ? marginLeftImage : "unset"
                }}
                  priority
                  src={banner.image_banner?.url || "/images/banner.png"}
                  className="banner_image"
                  height={400}
                  width={500}
                  alt={"Logo"}
                />
              </div>
              <Carousel.Caption>
                <div ref={captionRef}>
                  <h1 className="title_banner">{banner.title}</h1>
                  <div className="description_banner">{banner.content}</div>
                  <p className="hightlight_banner">{banner.description}</p>
                  {banner.active_button ? <button type="button" className="button_banner" >JOIN now for FREE</button> : ""}
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          })}
        </Carousel>
      </div>
    )
  else return null;
}  
