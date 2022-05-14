import '../styles/globals.css'
import App, { AppProps, AppContext } from 'next/app'
import 'react-toastify/dist/ReactToastify.css'
import config from '../config'
import Layout from '@components/Layouts'
import Login from '@components/Login'
import { ToastContainer } from 'react-toastify'

function MyApp({ Component, pageProps }: AppProps) {
  //if(!pageProps.user) {
  //  return <Login/>
  //}
  return (
    <Layout user={pageProps.user} path={pageProps.path}>
      <Component {...pageProps} />
      <ToastContainer/>
    </Layout>
  )
}

MyApp.getInitialProps = async ({ ctx }: AppContext) => {
  const UserData = await fetch(`${config.BASE_API_URL}/users/@me`, {
    headers: {
      // @ts-ignore
      Cookie: `auth=${ctx.req?.cookies.auth}`,
    }
  })
  if(UserData.ok) {
    return { pageProps: { user: (await UserData.json()).data, path: ctx.asPath } }
  } else {
    return { pageProps: { user: null, path: ctx.asPath } }
  }
}

export default MyApp
