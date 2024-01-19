import Head from 'next/head'
import utilStyles from 'styles/utils.module.css'
import { store } from 'lib/store'
import { Provider } from 'react-redux'
import App from 'pages/App'
import Image from 'next/image'
import {Carousel, Stack, Card, Button} from 'react-bootstrap';
// import { listCashbackCard } from 'fakeData/listCashbackCard'
import { categories } from 'fakeData/categories'
import { ScrollingCarousel } from '@trendyol-js/react-carousel';
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
export default function CashbackCard(props: {
  listCashbackCard: any,
  cashbackCardSection: any,
  router: any
}) {
   
  let settings = {
    variableWidth: true,
    infinite: (props.listCashbackCard  || []).length > 3 ? true : false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    draggable: false,
    prevArrow: <img src="images/previous_slick_icon.png" />,
    nextArrow: <img src="images/next_slick_icon.png" />,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          variableWidth: false,
          slidesToShow: 3,
          slidesToScroll: 1,
          draggable: false
          // arrows: true
        }
      },
      {
        breakpoint: 1000,
        settings: {
          // variableWidth: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          draggable: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          // variableWidth: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          draggable: true
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          draggable: true
        }
      }
    ]
  };
  return (
    <section>
      <div className="container_cashback_card">
        <div className='container'>  
          <div className='w-80 m-auto mb-5'>
          {props.cashbackCardSection?.title && <h1 className="text-center lh-1">{props.cashbackCardSection?.title || "More ways to earn Cash Back"}</h1>}
          {props.cashbackCardSection?.description && <div className='text-center fw-normal text_neutral_600 subtitle_section lh-base'>{props.cashbackCardSection?.description || "Enjoy’s apply."}</div>}
        </div>
        <Slider {...settings}>
          {(props.listCashbackCard  || []).map((cashbackCard: any, index: number) => {
            return  <div onClick={()=> {
              if(cashbackCard.link) window && window.open(
                cashbackCard.link ,
                '_blank' // <- This is what makes it open in a new window.
              );
            }} key={index} className="box_cashback_card">
              <div className='row'>
                <div className='col-12 col-md-6 col-lg-6'>
                  <Image
                    priority
                    src={cashbackCard.image_card ? cashbackCard.image_card[0]?.url : "/images/Logo-RW.png"}
                    className=" image_store image_cashback_card"
                    height={180}
                    width={180}
                    alt={"Logo"}
                  />
                </div>
                <div className='col-12  col-md-6 col-lg-6'>
                    <div className='d-flex flex-column justify-content-center align-items-center'> 
                      <h6 className="cashback_card_name">{cashbackCard.name}</h6>
                      <h1 className="text_primary">{`${cashbackCard.cashback}`}<span className="fs-7"> %</span></h1>
                      <div className="fs-7 fw-normal text_neutral_600">Cashback</div>
                      <div className="cashback_card_description fw-normal text_neutral_600">{`${cashbackCard.description || ""}`}</div>
                    </div>
                  </div>
              </div>
              
            
            
          </div> 
          })}
        </Slider></div>
      </div>

    </section>
  )
} 
