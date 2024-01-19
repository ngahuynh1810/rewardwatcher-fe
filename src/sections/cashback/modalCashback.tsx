
import Image from 'next/image'
import Link from 'next/link'
import { formatCashbackString} from "utils/setting"
export default function ModalCashback(props: {
    isShowDialog : boolean,
    handleCloseDialog :any,
    cashback: any,
    router: any
}) {
    if(props.isShowDialog)
  return  <div className="modal fade show" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{
    display: "block",
    backgroundColor: "#14151a94"
    }}>
  <div className="modal-dialog modal-lg modal-dialog-centered justify-content-center" style={{
        // maxWidth: "50%"
  }}>
    <div className="modal-content modal_cashback">
      <div className="modal-header">
        {/* <h5 className="modal-title" id="exampleModalLabel">Don’t fall behind</h5> */}
        <button type="button" onClick={props.handleCloseDialog} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body d-flex flex-column text-center pb-5 justify-content-center">
        <div className='d-flex flex-column align-items-center'>
          <h4 className="text_neutral_800">{props.cashback?.store?.name}</h4>
          {props.cashback?.store?.image?.url && <Image
            priority
            src={props.cashback?.store?.image?.url}
            className="me-2 object-fit-contain"
            height={100}
            width={100}
            alt={props.cashback?.store?.name}
            />}
        </div>
        <hr className='w-100'></hr>
        <div className='row mt-3'>
          <div className='col-12 col-lg-6'>
            <div className='d-flex flex-column align-items-start mx-3 mb-3'>
              <div className='row'>
                <div className='col-5 col-lg-12'>
                  {props.cashback?.cashback_website?.image?.url && <Image
                    priority
                    src={props.cashback?.cashback_website?.image?.url}
                    className="me-2 object-fit-contain"
                    height={88}
                    width={145}
                    alt={"cashback_website"}
                  />}
                </div>
                <div className='col-5 col-lg-12 text-start'>
                  <div className="text_neutral_600 fw-bold fs-5 lh-base mb-2">{props.cashback?.cashback_website?.name}</div> 
                  <div className="text_neutral_600 fs-8 lh-1 text-danger"><strong>{formatCashbackString(props.cashback?.cashback).cashbackValue}</strong>{formatCashbackString(props.cashback?.cashback).specialString}</div> 
                </div>
              </div>
            </div>
           
          </div>
          <div className='col-12 col-lg-6'>
            <div className='d-flex flex-column justify-content-center h-100'>
              <div className='fs-9 mb-1 text_neutral_600'> {props.cashback?.cashback_website?.code === "rakuten" ? "Sign up via below link you get $35" : "Sign up via below link you get $5"}</div>
              <Link href={props.cashback?.cashback_website?.referral_link || "/"} rel="noopener noreferrer" target="_blank"><button type="button" className="button_registration w-100" > Join as a new member </button></Link>
              <Link href={props.cashback?.website || "/"} rel="noopener noreferrer" target="_blank"><button type="button" className="button_login w-100">  I have an existing account </button></Link>

            </div>
          </div>
          
         

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
