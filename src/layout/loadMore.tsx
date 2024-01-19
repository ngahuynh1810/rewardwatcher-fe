import React, { useState, useMemo } from 'react'
import { connect } from 'react-redux'
import ReactLoading from 'react-loading';
import { RootState, Dispatch } from 'lib/store'
function LoadMore(props: any) {
    const [loading, setLoading] = useState(false);
    const handleScroll = () => {
        if (0.5 + window.innerHeight + document.documentElement.scrollTop + props?.footerHeight >= document.documentElement.offsetHeight) {
            if (props.loadMore && !loading) {
                setLoading(true);
            }
        }
    };
    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [props.loadMore, props?.footerHeight]); 
    React.useEffect(() => {
        loadData();
    }, [loading]);
    const loadData = async () => {
    if (!loading) return;
        await props.loadData();
        setLoading(false);
    }
    return (
        <div>
            {props.children}
            {props.loadMore && loading &&
                <div className="d-flex justify-content-center my-5">
                    {/* <ReactLoading type={"spin"} color={"#000"} height={'50px'} width={'50px'} /> */}
                </div>
            }
        </div>
    )
}
const mapState = (state: RootState) => ({
    footerHeight: state.company.footerHeight,
})

const mapDispatch = (dispatch: Dispatch) => ({

})
export default connect(
    mapState,
    mapDispatch
)(LoadMore)