import Head from 'next/head'
import utilStyles from 'styles/utils.module.css'
import Link from 'next/link'
import { store } from 'lib/store'
import { Provider } from 'react-redux'
import App from 'pages/App'
import Image from 'next/image' 
import { RootState, Dispatch } from 'lib/store'
import { connect } from 'react-redux'
import  React, {useState, useEffect} from 'react'
import ModalSubscribe from 'sections/header/modalSubscribe'
 
import { useRouter } from 'next/navigation'
export  default function Header(props: any) {
  const [isShowDialogSubscribe, setShowDialogSubscribe] = React.useState<boolean>(false);
  const router = useRouter()
  const [search, setSearch] = React.useState<string>();
  const [sticky, setSticky] = useState("");
   // on render, set listener
   useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);
  const isSticky = () => {
    /* Method that will fix header after a specific scrollable */
    const scrollTop = window.scrollY;
    const stickyClass = scrollTop >= 250 ? "is-sticky" : "";
    setSticky(stickyClass);
  };
   const handleChangeSearch = async(search: string) => {
    setSearch(search)
    let filterObj = {
      filter: [
        {
          field: "name",
          operator: "startsWith",
          value: search
        }
      ]
    }
    props.getListStore(filterObj);
   }
   const handleClickItemSearch = (store: any) => {
    // router.push(`/stores/${store?.code}`)
    router.push(`/search/${store?.code}`)
    setSearch("");
    props.resetSearchState();
   }
   const handleClickIconSearch = (search?: string) => {
    if(search) {
      router.push(`/search/${search}`)
      setSearch("");
      props.resetSearchState();
    }
   }
   const handleKeyDown = (event: any) => {
    if (event?.key === 'Enter') {
      event.preventDefault();
      router.push(`/search/${search}`)
      setSearch("");
      props.resetSearchState();
    }
   }
  return (
    <header className={`py-3 mb-3 header ${sticky}`}>
      <ModalSubscribe handleCloseDialog={() => setShowDialogSubscribe(false)} isShowDialog={isShowDialogSubscribe} sendSubscribe={props.sendSubscribe}/>
    <div className="row align-items-center  container m-auto">
      <div className="d-flex flex-row align-items-center justify-content-start gap-4  col-md-7 col-lg-4 col-8">
        <Image
          priority
          src={props.detailCompany?.avatar?.url || "/images/Logo-RW.png"}
          className="logo_header object-fit-contain"
          height={84}
          width={68}
          alt={"Logo"}
          onClick={() => router.push(`/`)}
        />
        <div className="dropdown ">
          <button className="dropdow_header dropdow_header py-2 ps-3 pe-5 border border-light-subtle bg-white text_neutral_700 rounded-pill dropdown-toggle d-flex align-items-center " type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <Image
              priority
              src="/images/categories_icon.png"
              className="mx-2 object-fit-contain"
              height={16}
              width={16}
              alt={"Logo"}
            />Categories
             <Image
              priority
              src="/images/arrow-down.png"
              className="mx-2 object-fit-contain"
              height={16}
              width={16}
              alt={"Logo"}
            />
          </button>
          <ul className="dropdown-menu">
            {(props.listCategory || []).map((category: any, index: number) => {
              if(index <= 10)
              return  <li  onClick={() => router.push(`/${category.code}`)}><a className="dropdown-item dropdown_category" href="#">
                  <Image
                  priority
                  src={category?.image?.url || `images/${category?.code}.png`}
                  // className="me-2"
                  height={20}
                  width={20}
                  alt={"Logo"}
                />{category.name}
              </a></li>
            })} 
            <li onClick={() => router.push(`/stores`)}><a className="dropdown-item dropdown_category" href="#"><span className='d-flex align-items-center'>{"See all stores "}  <Image
              priority
              src="/images/line_arrow_right.png"
              className="mx-2"
              height={16}
              width={16}
              alt={"Logo"}
            /></span></a></li>
          </ul>
        </div>
      </div>


      <form className="col-12 col-md-12 col-lg-5 container_input_search">
        <div className="input-group">
          <input type="search" onKeyDown={(e) => handleKeyDown(e)}  className="form-control input_search" value={search} onChange={(e) => handleChangeSearch(e.target.value)} placeholder="Search store, deal, coupon" aria-label="Search" />
          {search && <div className="dropdown-menu dropdown_menu_search show">
            {!props.listSearchStore?.length ?  <i className="d-flex justify-content-center text_neutral-800 lh-1 py-1">No result</i>
            : 
             <div className="list-autocomplete">
              {props.listSearchStore.map((store: any) => 
                <button type="button" className="dropdown-item" onClick={() => handleClickItemSearch(store)}>{store?.name}</button>
              )}
            </div> 
            }
        
        {/* <div className="list-autocomplete">
            <button type="button" className="dropdown-item">01 - Alpha  Barbuda</button>
            <button type="button" className="dropdown-item">02 - Charlie Alpha</button>
            <button type="button" className="dropdown-item">03 - Bravo Alpha</button>
            <button type="button" className="dropdown-item">04 - Delta</button>
        </div> */}
        {/* <hr/>
        <button type="button" className="dropdown-item">Custom button</button> */}
    </div>}
          <span className="input-group-append">
            <button  onClick={() => handleClickIconSearch(search)} className="input_icon_search btn btn-outline-secondary bg-white border-start-0  ms-n3" type="button">
              <Image
                priority
                src="/images/search_icon.png"
                className={utilStyles.borderCircle}
                height={34}
                width={34}
                alt={"Logo"}
              />
            </button>
          </span>
        </div>
      </form>
      <div className="col-4 col-md-5 col-lg-3 d-flex justify-content-end"> <button type="button" onClick={() => setShowDialogSubscribe(true)} className="button_header">Join now</button></div>
      
    </div>
  </header>

  )
} 
