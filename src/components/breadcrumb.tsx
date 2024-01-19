
import Link from 'next/link'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
export default function Breadcrumb(props: {
    breadcrumbs: any,
    activeLink: string,
}) {
    return   <nav className="container_breadcrumb" aria-label="breadcrumb">
    <div className="container">
      <ol className="breadcrumb">
        {props.breadcrumbs.map((breadcrumb: any, index: number) => <li key={index} className="breadcrumb-item"><Link href={breadcrumb?.link}>{breadcrumb.name}</Link></li>)}
        {props.activeLink ? 
        <li className="breadcrumb-item active" aria-current="page"><span>{props.activeLink}</span> </li>
        :   ""}
      </ol></div>
  </nav>
}
