import * as React from 'react'
import { connect } from 'react-redux'
import { RootState, Dispatch } from 'lib/store'
import {Auth} from "layout" 
import Breadcrumb from 'components/breadcrumb';

type connectedProps = ReturnType<typeof mapState> &
	ReturnType<typeof mapDispatch>
type Props = connectedProps

function GeneralHelpSupport(props: any) {
  React.useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    props.getCompanyInfo()
  }
  return (
     <Auth>
       <Breadcrumb
        breadcrumbs={[
          { name: "Home", link: "/" },
        ]} 
        activeLink={"General Help Support"}
      />
      <div className='container min_height_25vh mt-3'>
        <span dangerouslySetInnerHTML={{__html: props.detailCompany?.general_help_support}} />
      </div>
    </Auth>
  )
}

const mapState = (state: RootState) => ({
	detailCompany: state.company.detailCompany,
})

const mapDispatch = (dispatch: Dispatch) => ({
	getCompanyInfo: dispatch.company.getDetail, 

})
export default connect(
	mapState,
	mapDispatch
)(GeneralHelpSupport)