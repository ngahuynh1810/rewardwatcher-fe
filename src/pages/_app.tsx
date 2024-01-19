import 'bootstrap/dist/css/bootstrap.css'

import 'styles/global.css'
import 'styles/pagination.scss'
import 'styles/reponsive.css'
import 'styles/override_bootstrap.scss'
 
import { AppProps } from 'next/app'
import React, { useEffect } from 'react';
import { store } from 'lib/store'
import { Provider } from 'react-redux'
export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return <Provider store={store}><Component {...pageProps} /></Provider>
}
