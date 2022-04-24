import config from 'config'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import { Methods } from "@tosspayments/brandpay-types"
import PayItem from '@components/PayItems'
import { loadBrandPay } from '@tosspayments/brandpay-sdk';
import { useRouter } from 'next/router'
import { User } from '@types'

interface PaylistProps {
  cardlist: Methods,
  user: User
}

const Paylist: NextPage<PaylistProps> = ({cardlist, user}) => {
  useEffect(() => {
    if(cardlist.accounts.length === 0 && cardlist.accounts.length === 0) {
      haldleAddPayments()
    }
  }, [])
  const router = useRouter()

  const refreshServerSide = () => {
    router.replace(router.asPath)
  }
  
  const haldleAddPayments = async() => {
    const barndpay = await loadBrandPay(config.PAYMENTS_CLIENTL_KEY, user.id, {
      redirectUrl: config.PAYMENTS_BASE_API_URL + '/auth',
      ui: {
        highlightColor: "#7C3AED",
        buttonStyle: 'full',
        labels: {
          oneTouchPay: '배틀페이'
        }
      }
    })
    barndpay.addPaymentMethod().then((data) => {
      refreshServerSide()
    })
  }

  return (
    <>
      <h1 className='text-2xl font-bold'>등록된 결제수단</h1>
      <div className='flex mt-5 flex-wrap'>
          <PayItem method={cardlist}/>
      </div>
      <button className='border px-2 py-1 rounded-md min-w-[15vw] mt-2 hover:bg-gray-200' onClick={() => (haldleAddPayments())} >
        결제수단 추가
      </button>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let cardlist = await fetch(
    `${config.PAYMENTS_BASE_API_URL}/cardlist`, {
        headers: {
            "authorization": "Bearer " + context.req.cookies['auth'],
        }
    })
  let auth = await fetch(
      `${config.BASE_API_URL}/users/@me`, {
          headers: {
            Cookie: `auth=${context.req.cookies.auth}`,
          }
      })
  if(cardlist.ok && auth.ok) {
    return {
      props: {
          cardlist: (await cardlist.json()).data,
          user: (await auth.json()).data,
      }
    }
  } else {
    return {
      props: {
        cardlist: null,
        user: null
      },
    }; 
  }
};



export default Paylist
