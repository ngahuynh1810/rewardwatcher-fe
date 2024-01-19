
import React, { useState, useEffect , useRef} from 'react'
import Link from 'next/link'
export default function ModalCoupon(props: {
    isShowDialog : boolean,
    handleCloseDialog :any,
    coupon: any,
    router: any
}) {
  const [isCopyCode, setCopyCode] = useState<boolean>(false);
  const codeRef = useRef(null);
  useEffect(() => {
    setCopyCode(false)
  }, [props.isShowDialog]);
  if(props.isShowDialog)
  return  <div className="modal fade show" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{
    display: "block",
    backgroundColor: "#14151a94"
    }}>
  <div className="modal-dialog modal-md modal-dialog-centered" style={{
        // maxWidth: "50%"
  }}>
    <div className="modal-content">
      <div className="modal-header">
        {/* <h5 className="modal-title" id="exampleModalLabel">Don’t fall behind</h5> */}
        <button type="button" onClick={props.handleCloseDialog} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body d-flex flex-column text-center pt-3  pb-5 px-5">
        <h3 className="text_neutral_800">{props.coupon?.store?.name}</h3>
        <div className="text_neutral_600 fw-normal fs-6">{props.coupon?.description}</div> 
        <div className="d-flex flex-column mt-3 justify-content-center align-items-center">
          <div className="text_neutral_600 fw-normal fs-8 w-75">Copy and paste the code at checkout. Terms & exclusions apply, see store for details.</div>
          <div  ref={codeRef} className="px-3 py-3 mt-3 mb-4  rounded-pill border"><h3 className="text_primary mb-0">{props.coupon?.code}</h3></div> 
         <button type="button" className="button_copy_coupon_code" onClick={() => {
              // navigator.clipboard.writeText(props.coupon?.code)
            navigator.clipboard.writeText(props.coupon?.code).then(
              () => {
                setCopyCode(true) 
                if(props.coupon?.website) {
                  window && window.open(
                      props.coupon?.website ,
                      '_blank' // <- This is what makes it open in a new window.
                    );
                }
              },
              (err) => {
                  console.log("error", err)
              },
            );
            
          }}>{isCopyCode ? "Copied" : "Copy code & shop"}</button> 
        
              {/* <button type="button" className="" onClick={() => {
                props.router.push()
              }}>{"Go to Cashback comparison"}
              </button>
              <button type="button" className="" onClick={() => {
                props.router.push(`/stores/${props.coupon?.store?.code}`)
              }}>{"Get more discount with Cashback"}
              </button> */}
            </div>       

      </div>
      {/* <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div> */}
    </div>
  </div>
</div>
return null;
}
