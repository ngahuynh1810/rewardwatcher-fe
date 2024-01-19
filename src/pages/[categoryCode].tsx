import React, { useState, useMemo } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import { RootState, Dispatch } from 'lib/store'
import Image from 'next/image'
import Pagination from 'components/pagination';
import Breadcrumb from 'components/breadcrumb';
import StoreCashbackItem from 'sections/cashback/storeCashbackItem';
import { useRouter } from 'next/navigation'
import LoadMore from 'layout/loadMore'
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
import {Auth} from "layout"
import { String } from 'lodash'
import { filter_characters } from "utils/setting"
import id from 'date-fns/esm/locale/id/index.js';
import { useSearchParams } from 'next/navigation'
import { FALSE } from 'sass';
// import { 

let PageSize = 120;
// } from "sections"
type connectedProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch>
type Props = connectedProps

function PopularStore(props: any) {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryUuid, setCategoryUuid] = useState();
  const [categoryName, setCategoryName] = useState();
  const [selectedCashback, setSelectedCashback] = useState<any>();
  const [filterCharacter, setFilterCharacter] = useState<string>("All");
  const searchParams = useSearchParams()
  const categoryCode = searchParams.get('categoryCode')
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return props.listCashback.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);
  React.useEffect(() => {
    getCategoryDetail(categoryCode || "");
  }, [categoryCode]);
  React.useEffect(() => {
    props.resetLoadMoreCashback()
    loadData(0)
  }, [categoryUuid]);
  const loadData = async(page: number) => {
    if(categoryUuid)
    await props.getListCashback({
      page: page >= 0 ?  page : props.pageCashback,
      limit: PageSize,
      categories: JSON.stringify([categoryUuid]),
      group_by: true,
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

  // const handlePageChange = (page: number) => {
  //   setCurrentPage(page)
  //   props.getListCashback({
  //     page: page - 1,
  //     limit: PageSize,
  //     categories: JSON.stringify([categoryUuid])
  //   })
  // }
  return (
    <Auth> 
     
      <Breadcrumb
        breadcrumbs={[
          { name: "Home", link: "/" },
        ]} 
        activeLink={categoryName  || ""}
      />
      <div className="container">
      {categoryName ? <h2 className="mt-5 mb-3 lh-1">{categoryName}</h2>
        :   <h2 className="mt-5 mb-3 lh-1"><SkeletonTheme baseColor="#e0e2e6" highlightColor="#bfc1c5" width="200px">
        <p>
          <Skeleton count={1} />
        </p>
      </SkeletonTheme></h2> }
         <div>{`${props.totalCashback} ${props.totalCashback >= 2 ? 'cashbacks' : 'cashback'}`}</div>
         <LoadMore
          loadData={loadData}
          loadMore={props.loadMore}
        >
        <div className="row my-5">
          <div className="col-12 col-lg-12">
            <div className="row">
            {props.listCashback.map((cashback: any, index: number) => {
                return <div className="col-6 col-md-2 mb-3">
                  <StoreCashbackItem
                    actionItem={() => router.push(`/${categoryCode}/${cashback.store?.code}`)}
                    index={index}
                    cashback={cashback}
                    currentPage={currentPage}
                    filterCharacter={filterCharacter}
              />
                </div>
              })}
              </div> 
          </div>
        </div>
        </LoadMore>
        {/* <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={props.totalCashback}
          pageSize={PageSize}
          onPageChange={(page: number) => handlePageChange(page)}
        /> */}
      </div>

    </Auth>
  )
}

const mapState = (state: RootState) => ({
  listCashback: state.cashback.listCashback,
  totalCashback: state.cashback.totalCashback,
  company: state.company,
  loadMore: state.cashback.loadMore,
  pageCashback: state.cashback.pageCashback
})

const mapDispatch = (dispatch: Dispatch) => ({
  getListCashback: dispatch.cashback.getList,
  getCategoryDetail: dispatch.category.getDetail,
  resetLoadMoreCashback:  dispatch.cashback.resetLoadMoreCashback
})
export default connect(
  mapState,
  mapDispatch
)(PopularStore)