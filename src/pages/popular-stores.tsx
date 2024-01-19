import React, { useState, useMemo } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import { RootState, Dispatch } from 'lib/store'
import { ScrollingCarousel } from '@trendyol-js/react-carousel';
import Image from 'next/image'
import Pagination from 'components/pagination';
import Breadcrumb from 'components/breadcrumb';
import StoreCashbackItem from 'sections/cashback/storeCashbackItem';
import LoadMore from 'layout/loadMore'
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
import { String } from 'lodash'
import { filter_characters } from "utils/setting"
import { useRouter } from 'next/navigation'
// import { 

let PageSize = 30;
// } from "sections"
type connectedProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch>
type Props = connectedProps

function PopularStore(props: any) {
  const [loading, setLoading] = useState(false);
  const [filterCharacter, setFilterCharacter] = useState<string>("All");
  const router = useRouter()

     
  const loadData = async(page: number) => {
    let filterObj;
    filterObj = {
      group_by: true,
      popular: true,
      page: page >= 0 ?  page : props.pageCashback,
      limit: PageSize
    }
    if (filterCharacter !== "All") filterObj = {
      group_by: true,
      popular: true,
      filter: JSON.stringify([
        {
          field: "store",
          operator: "startsWith",
          value: filterCharacter
        }
      ])
    }
    if (filterCharacter === "123") filterObj = {
      group_by: true,
      popular: true,
      filter: `[{"field":"store","operator":"startsWith","value":"%23"}]`
    }
    await props.getListCashback(filterObj)

  }  
  React.useEffect(() => {
    props.resetLoadMoreCashback()
    loadData(0);
  }, [filterCharacter]);
  const handleFilterCashback = (filter_characters: string) => {
    setFilterCharacter(filter_characters)
  }  
  return (
    <Auth>
     
      <Breadcrumb
        breadcrumbs={[
          { name: "Home", link: "/" },
        ]} 
        activeLink={"Popular Stores"}
      />
      <div className="container">
        <h2 className="mt-5 mb-3 lh-1">Popular Stores</h2>
        <div className="d-flex ">
          <ScrollingCarousel className="scrolling_carousel_charaters">
            {filter_characters.map((e: string, index: number) => <div onClick={() => handleFilterCashback(e)} key={index} role="button" className={filterCharacter === e ? "selected_character" : "character"}>{e}</div>)}
          </ScrollingCarousel>
        </div>
        <LoadMore
          loadData={loadData}
          loadMore={props.loadMore}
        >
        <div className="row my-5">
          {props.listCashback.map((cashback: any, index: number) => {
            return <div className="col-6 col-md-2 mb-3">
              <StoreCashbackItem
                actionItem={() => router.push(`/popular-stores/${cashback.store?.code}`)}
                index={index}
                cashback={cashback}
                isPopularItems={true}
                currentPage={0}
                filterCharacter={filterCharacter}
                pageSize={PageSize}
             />
            </div>
          })}
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
)(PopularStore)