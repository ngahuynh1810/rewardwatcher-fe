import React, { useState, useMemo } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import { RootState, Dispatch } from 'lib/store'
import { ScrollingCarousel } from '@trendyol-js/react-carousel';
import Image from 'next/image'
import Pagination from 'components/pagination';
import Breadcrumb from 'components/breadcrumb';
import {Auth} from "layout"
import { useRouter } from 'next/navigation'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {
  Header,
  Banner,
  Store,
  FavoriteStore,
  Coupon,
  CashbackCard,
  Footer,
  RealTimeCashback,
  CashbackItem
} from "sections"
import { String } from 'lodash'
import { filter_characters } from "utils/setting"
import id from 'date-fns/esm/locale/id/index.js';
import { useSearchParams } from 'next/navigation'
import { FALSE } from 'sass';
// import { 

let PageSize = 30;
// } from "sections"
type connectedProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch>
type Props = connectedProps

function PopularStore(props: any) {
  const router = useRouter()
  const [fetching, setIsFetching] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCashback, setSelectedCashback] = useState<any>();
  const [filterCharacter, setFilterCharacter] = useState<string>("All");
  const searchParams = useSearchParams() 
  const categoryCode = searchParams.get('categoryCode')
  const storeCode = searchParams.get('storeCode')
  const [categoryUuid, setCategoryUuid] = useState();
  const [categoryName, setCategoryName] = useState();
  // const currentTableData = useMemo(() => {
  //   const firstPageIndex = (currentPage - 1) * PageSize;
  //   const lastPageIndex = firstPageIndex + PageSize;
  //   return props.listCashback.slice(firstPageIndex, lastPageIndex);
  // }, [currentPage]);

  React.useEffect(() => {
    getCategoryDetail(categoryCode || "");
  }, [categoryCode]);
  React.useEffect(() => {
    if(storeCode)
    props.getListCashback({
      sort: "DESC",
      sort_by: "cashback_value",
      page: currentPage - 1,
      limit: PageSize,
      filter: JSON.stringify([{"field":"store_code","operator":"equals","value": encodeURIComponent(storeCode)}])
    })
  }, [storeCode]);
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    props.getListCashback({
      sort: "DESC",
      sort_by: "cashback_value",
      page: page - 1,
      limit: PageSize
    })
  }
  const getCategoryDetail = async(categoryCode: string) => {
    if(categoryCode) {
      let response = await props.getCategoryDetail({
        filter: JSON.stringify([{"field":"code","operator":"equals","value": encodeURIComponent(categoryCode)}])
      })
      setCategoryUuid(response?.uuid)
      setCategoryName(response?.name)
    }
  }
  let storeName = props.listCashback?.length ? props.listCashback[0]?.store.name :  ""
  return (
    <Auth>
     
      <Breadcrumb
        breadcrumbs={[
          { name: "Home", link: "/" },
          { name: categoryName  || "", link: `/${categoryCode}` },
        ]} 
        activeLink={storeName}
      />
      <div className="container">
        {storeName ? <h2 className="mt-5 mb-3 lh-1">{storeName}</h2>
        :   <h2 className="mt-5 mb-3 lh-1"><SkeletonTheme baseColor="#e0e2e6" highlightColor="#bfc1c5" width="200px">
        <p>
          <Skeleton count={1} />
        </p>
      </SkeletonTheme></h2> }
         <div className='fs-8 lh-base text_neutral_600'>{`${props.listCashback?.length} ${props.listCashback?.length >= 2 ? 'cashbacks' : 'cashback'}`}</div>
        <div className="row my-5">
        <div className="col-12 col-lg-8">
          <div className="row">
          {props.listCashback.map((cashback: any, index: number) => {
              return <div className="col-6 col-md-3 mb-3">
                <CashbackItem cashback={cashback} index={index}   router={router}/>
              </div>
            })}
            </div> 
        </div>
        <div className="col-12 col-lg-4">
          <RealTimeCashback listCashback={props.listCashback}/>
        </div>
       
        </div>
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={props.totalCashback}
          pageSize={PageSize}
          onPageChange={(page: number) => handlePageChange(page)}
        />
      </div>

    </Auth>
  )
}

const mapState = (state: RootState) => ({
  listCashback: state.cashback.listCashbacksOfStore,
  totalCashback: state.cashback.totalCashback,
  company: state.company,
})

const mapDispatch = (dispatch: Dispatch) => ({
  getListCashback: dispatch.cashback.getListCashbacksOfStore,
  getCategoryDetail: dispatch.category.getDetail,

})
export default connect(
  mapState,
  mapDispatch
)(PopularStore)