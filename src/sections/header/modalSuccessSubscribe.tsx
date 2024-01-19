
import  React, {useState, useEffect} from 'react'
import Image from 'next/image'
export default function ModalSuccessSubscribe(props: {
    isShowDialog : boolean,
    handleCloseDialog :any,
}) {
  const [email, setEmail] = React.useState<string>();
  if(props.isShowDialog)
  return  <div className="modal fade show" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{
    display: "block",
    backgroundColor: "#14151a94"
    }}>
  <div className="modal-dialog modal-lg modal-dialog-centered" style={{
        // maxWidth: "50%"
  }}>
    <div className="modal-content modal_success_subscribe">
      {/* <div className="modal-header">
        <button type="button" onClick={props.handleCloseDialog} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div> */}
      <div className="modal-body d-flex flex-column text-center   pb-5">
        <Image
              priority
              src="/images/success_subscribe.png"
              className={`object-fit-contain position-relative`}
              layout="fill"
              // height={144}
              // width={144}
              alt={"success_subscribe"}
            />
            <div className="w-100 mt-4">
              <h6 className="fs-3 text_neutral_800">Subscribing successful!</h6>
              <div className="text_neutral_600 w-75 fw-normal subtitle_section m-auto mt-0 lh-base mb-0">Thank you for subscribing to our newsletter </div> 
              <div className="text_neutral_600 w-75 fw-normal subtitle_section m-auto mt-0 lh-base mb-3">We will keep you informed about any updates we have.</div> 
              <button type="button" onClick={props.handleCloseDialog}  className="button_success_subscribe">Close</button>
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
