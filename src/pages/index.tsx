import Head from 'next/head'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { store } from 'lib/store'
import { Provider } from 'react-redux'
import App from 'pages/App'
import Image from 'next/image'
import Carousel from 'react-bootstrap/Carousel';
import ModalSubscribe from 'sections/header/modalSubscribe'
import { RootState, Dispatch } from 'lib/store'
import { connect } from 'react-redux'
import * as React from 'react'
import { useRouter } from 'next/navigation'
import { 
  Header, 
  Banner,
  Store,
  FavoriteStore,
  Coupon,
  CashbackCard,
  Footer
} from "sections"
import {Auth} from "layout"
import { propTypes } from 'react-bootstrap/esm/Image'
function Home(props: any) {
  const router = useRouter()
  const [isShowDialog, setShowDialog] = React.useState<boolean>(false);
  React.useEffect(() => {
    getData();
  }, []);
  
  const getData = () => {
    props.getListCategory()
    props.getListBanner()
    props.getListCashback({popular: true, group_by: true})
    props.getListCoupon({limit: 100})
    props.getListCashbackCard({limit: 100})
    props.getCompanyInfo()
    props.getListSessionDeal()
    props.getListTopDeal()
    props.getCouponSection()
    props.getStoreSection()
    props.getTopStoreSection()
    props.getCashbackCardSection()
  }
  const getStoresByCategory  = (payload: {popular: boolean, uuid: string}) => {
    props.getListCashback(payload)
  }
  const viewMorePopularStores  = () => {
    router.push('/popular-stores')
  }
  const viewMoreStoresByCategory  = (categoryCode: string) => {
    router.push(`/${categoryCode}`)
  }
  return (
    <Auth>
      <ModalSubscribe handleCloseDialog={() => setShowDialog(false)} isShowDialog={isShowDialog} sendSubscribe={props.sendSubscribe}/>
        <Banner 
          listBanner={props.listBanner}
          showSubscribeModal = {() => setShowDialog(true)}
        />
        <Store
        storeSection={props.storeSection}
          listCategory={props.listCategory}
          getStoresByCategory={getStoresByCategory}
          getListCategory={props.getListCategory}
          loadMoreCategory = {props.loadMoreCategory}
          listCashback={props.listCashback}
          viewMorePopularStores={viewMorePopularStores}
          viewMoreStoresByCategory={viewMoreStoresByCategory}
          router={router}
        />
        <FavoriteStore
          topStoreSection={props.topStoreSection}
          listTopDeal={props.listTopDeal}
          activeSessionDeal={props.activeSessionDeal}
          listSessionDeal={props.listSessionDeal}
          router={router}

        />
        <Coupon
          couponSection={props.couponSection}
          listCoupon={props.listCoupon}
          router={router}
          />
        <CashbackCard 
          cashbackCardSection={props.cashbackCardSection}
          listCashbackCard={props.listCashbackCard}
          router={router}
        />
    </Auth>

  )
}
const mapState = (state: RootState) => ({
	listBanner: state.banner.listBanner,
	listCategory: state.category.listCategory,
  listCashback:  state.cashback.listCashback,
  loadMoreCategory:  state.category.loadMore,
  listCashbackCard: state.cashbackCard.listCashbackCard,
  listCoupon: state.coupon.listCoupon,
  detailCompany: state.company.detailCompany,
  listTopDeal: state.topDeal.listTopDeal,
  activeSessionDeal: state.seasonDeal.activeSessionDeal,
  listSessionDeal: state.seasonDeal.listSessionDeal,
  couponSection: state.sections.couponSection,
  storeSection: state.sections.storeSection,
  cashbackCardSection: state.sections.cashbackCardSection,
  topStoreSection: state.sections.topStoreSection,
})

const mapDispatch = (dispatch: Dispatch) => ({
	getListBanner: dispatch.banner.getList, 
	getListCashback: dispatch.cashback.getList, 
	getListCategory: dispatch.category.getList, 
	getCompanyInfo: dispatch.company.getDetail, 
	getListCoupon: dispatch.coupon.getList, 
	getListCashbackCard: dispatch.cashbackCard.getList, 
	getListSessionDeal: dispatch.seasonDeal.getListSessionDeal, 
	getListTopDeal: dispatch.topDeal.getList, 
  getCouponSection: dispatch.sections.getCouponSection,
  getStoreSection: dispatch.sections.getStoreSection,
  getTopStoreSection: dispatch.sections.getTopStoreSection,
  getCashbackCardSection: dispatch.sections.getCashbackCardSection,
  sendSubscribe: dispatch.subscribe.sendSubscribe,
})
export default connect(
	mapState,
	mapDispatch
)(Home)

