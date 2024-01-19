import * as React from 'react'
import { connect } from 'react-redux'

import { useRouter } from 'next/navigation'
import { RootState, Dispatch } from 'lib/store'
import {
    Header, 
    Footer, 
  } from "sections"
type connectedProps = ReturnType<typeof mapState> &
	ReturnType<typeof mapDispatch>
type Props = connectedProps

function Auth(props:any) {
    const [footerHeight, setFooterHeight] = React.useState(0);
    const router = useRouter()
  React.useEffect(() => {
        props.getToken();
        getData()
      }, []);
      const getData = () => {
        props.getListCategory()
        props.getCompanyInfo()
      }
      const handleSetFooterHeight = (value: number) => {
        setFooterHeight(value);
        props.setFooterHeight(value);
      }
  return (
     <div className='position-relative' style={{minHeight: "100vh"}}>  
      <Header 
        listCategory={props.listCategory}
        detailCompany={props.detailCompany}
        getListStore={props.getListStore}
        listSearchStore={props.listSearchStore}
        resetSearchState={props.resetSearchState}
        sendSubscribe={props.sendSubscribe}
      />
      <div style={{
        paddingBottom: `${footerHeight}px`
      }}>{props.children}</div>
     <Footer 
        detailCompany={props.detailCompany} 
        listCategory={props.listCategory}
        router={router}    
        setFooterHeight={(e: number) => handleSetFooterHeight(e)}
        footerHeight={footerHeight}
    />
     </div>
  )
}

const mapState = (state: RootState) => ({ 
	listCategory: state.category.listCategory,
    detailCompany: state.company.detailCompany,
    listSearchStore: state.store.listSearchStore,
    footerHeight: state.company.footerHeight,
})

const mapDispatch = (dispatch: Dispatch) => ({ 
    getListStore: dispatch.store.getSearchList,
	getListCategory: dispatch.category.getList, 
	getCompanyInfo: dispatch.company.getDetail, 
    getToken: dispatch.auth.getToken,
    resetSearchState: dispatch.cashback.resetSearchState,
    setFooterHeight: dispatch.company.setFooterHeight,
    sendSubscribe: dispatch.subscribe.sendSubscribe,
})
export default connect(
	mapState,
	mapDispatch
)(Auth)