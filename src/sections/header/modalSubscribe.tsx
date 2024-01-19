
import  React, {useState, useEffect} from 'react'
import ModalSuccessSubscribe from 'sections/header/modalSuccessSubscribe'
import validator  from  'email-validator' ;

export default function ModalSubscribe(props: {
    isShowDialog : boolean,
    handleCloseDialog :any,
    sendSubscribe: any
}) {
  const [isShowDialogSuccess, setShowDialogSuccess] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>();
  return  (
    <> 
  <ModalSuccessSubscribe handleCloseDialog={() => setShowDialogSuccess(false)} isShowDialog={isShowDialogSuccess}  /> 
  {props.isShowDialog ?
  <div className="modal fade show" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{
    display: "block",
    backgroundColor: "#14151a94"
    }}>
  <div className="modal-dialog modal-lg modal-dialog-centered" style={{
        // maxWidth: "50%"
  }}>
    <div className="modal-content modal_subscribe">
      <div className="modal-header">
        {/* <h5 className="modal-title" id="exampleModalLabel">Don’t fall behind</h5> */}
        <button type="button" onClick={props.handleCloseDialog} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body d-flex flex-column text-center pt-4 pb-5">
        <h6 className="fs-3 text_neutral_800">Don’t fall behind</h6>
        <div className="text_neutral_600 fw-normal subtitle_section lh-base mb-3">Stay on the track with all the latest updates, news and lots more.</div> 
         
        <form>
          <div className="d-flex flex-row mt-3 justify-content-center">
          <input value={email} required type="email" onChange={(e) => setEmail(e.target.value)}  className="form-control input_subscribe" placeholder="Enter your email" aria-label="Search" />
          <button type="submit" className="button_subscribe" onClick={() =>{
            if(email && validator.validate(email)) {
              props.sendSubscribe({email: email});
              setEmail("");
              setShowDialogSuccess(true);
              props.handleCloseDialog();
            }
             }}>Subscribe</button>
          </div>       
        </form>
      </div>
    </div>
  </div>
</div> : ""}</>)
return null;
}
