import * as React from 'react'
import { connect } from 'react-redux'

import { RootState, Dispatch } from 'lib/store'

type connectedProps = ReturnType<typeof mapState> &
	ReturnType<typeof mapDispatch>
type Props = connectedProps

function App(props: any) {
  return (
     <div></div>
  )
}

const mapState = (state: RootState) => ({
	company: state.company,
	category: state.category,
})

const mapDispatch = (dispatch: Dispatch) => ({
	// incrementDolphins: dispatch.dolphins.increment,
	// incrementSharksAsync2: () =>
	// 	dispatch({ type: 'sharks/incrementAsync', payload: 2 }),
})
export default connect(
	mapState,
	mapDispatch
)(App)