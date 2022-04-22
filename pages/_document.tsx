import Document, { Html, Head, Main, NextScript } from "next/document";

export default class CustomDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
            <meta name="keyword" content={"배틀이, 배틀페이, 배틀이 구독"} />
            <meta property="og:site_name" content="배틀이"/>
            {/** fontawesome CDN */}
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossOrigin="anonymous"/>
            <link href="https://fonts.googleapis.com/css2?family=Dosis:wght@800&family=Noto+Sans+KR&family=Open+Sans:wdth,wght@86,800&display=swap" rel="stylesheet"></link>
        </Head>
        <body>
          <Main />
        </body>
        <NextScript />
      </Html>
    );
  }
}