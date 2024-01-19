import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head > 
      <title>Rewardwatcher</title>
      <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/Logo-RW-1x.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/Logo-RW-3x.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/Logo-RW-2x.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
       
      </body>
    </Html>
  )
}
