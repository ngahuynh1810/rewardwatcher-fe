import React, { useState, useMemo } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import { RootState, Dispatch } from 'lib/store'
import { ScrollingCarousel } from '@trendyol-js/react-carousel';
import Image from 'next/image'
import Pagination from 'components/pagination';
import Breadcrumb from 'components/breadcrumb';
import { useSearchParams } from 'next/navigation'
import {Auth} from "layout"
import LoadMore from 'layout/loadMore'
import ModalCashback from 'sections/cashback/modalCashback'
import StoreCashbackItem from 'sections/cashback/storeCashbackItem';
import {
  Header,
  Banner,
  Store,
  FavoriteStore,
  Coupon,
  CashbackCard,
  Footer,
  CashbackItem
} from "sections"
import { String } from 'lodash'
import { filter_characters } from "utils/setting"
import { useRouter } from 'next/navigation'
// import { 

let PageSize = 30;
// } from "sections"
type connectedProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch>
type Props = connectedProps

function SearchPage(props: any) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCharacter, setFilterCharacter] = useState<string>("All");
  const router = useRouter()
  const [selectedCashback, setSelectedCashback] = useState<any>();
  const searchParams = useSearchParams()
  const keyword = searchParams.get('keyword')

  // const currentTableData = useMemo(() => {
  //   const firstPageIndex = (currentPage - 1) * PageSize;
  //   const lastPageIndex = firstPageIndex + PageSize;
  // return props.listCashback.slice(firstPageIndex, lastPageIndex);
  // }, [currentPage]);

  const loadData = async(page: number) => {
    if(keyword)
    props.getListCashback({
      // popular: true,
      sort: "DESC",
      sort_by: "cashback_value",
      page: page >= 0 ?  page : props.pageCashback,
      limit: PageSize,
      search_by_name_store: `${encodeURIComponent(keyword || "")}`
      // filter: `[{"field":"store_code","operator":"contains","value": "${encodeURIComponent(keyword || "")}"}]`
    })
  } 
  React.useEffect(() => {
    props.resetLoadMoreCashback()
    loadData(0)
  }, []); 
  React.useEffect(() => {
    props.resetLoadMoreCashback()
    loadData(0)
  }, [keyword]); 
  // const handlePageChange = (page: number) => {
  //   setCurrentPage(page)
  //   props.getListCashback({
  //     // popular: true,
  //     page: page - 1,
  //     limit: PageSize,
  //     filter: `[{"field":"store_code","operator":"contains","value": "${encodeURIComponent(keyword || "")}"}]`
  //   })
  // }
  return (
    <Auth>
      <Breadcrumb
        breadcrumbs={[
          { name: "Home", link: "/" },
        ]} 
        activeLink={"Search"}
      />
      <div className="container">
      <ModalCashback  
         isShowDialog = {selectedCashback ? true : false}
         handleCloseDialog = {() => setSelectedCashback(null)}
         cashback= {selectedCashback}
         router={router}
      />
        <h2 className="mt-5 mb-3 lh-1">{`Search results for "${props.listCashback?.length ? props.listCashback[0].store?.name: keyword}"`}</h2>
         {props.totalCashback >=1 && <div className='fs-6'>{props.totalCashback} Results</div>}
         {props.totalCashback === 0 && <div className='d-flex flex-column align-items-center' style={{margin: "10%"}}>
          <h3 className="text_neutral_800">No results found</h3>
          <div className="text_neutral_600 fs-7">It seems we can’t find any results based on your search.</div>
          </div>}
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
                    actionItem={() => 
                      setSelectedCashback(cashback)
                      // router.push(`/stores/${cashback.store?.code}`)
                    }
                    cashback={cashback} 
                    index={index}
                    hightLightBestCashback={true}
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
  resetLoadMoreCashback:  dispatch.cashback.resetLoadMoreCashback

})
export default connect(
  mapState,
  mapDispatch
)(SearchPage)