import config from 'config'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import { Methods } from "@tosspayments/brandpay-types"
import PayItem from '@components/PayItems'
import { loadBrandPay } from '@tosspayments/brandpay-sdk';
import { useRouter } from 'next/router'

interface PaylistProps {
  cardlist: Methods
}

const Paylist: NextPage<PaylistProps> = ({cardlist}) => {
  const router = useRouter()

  const refreshServerSide = () => {
    router.replace(router.asPath)
  }
  
  const haldleAddPayments = async() => {
    const barndpay = await loadBrandPay(config.PAYMENTS_CLIENTL_KEY, '406815674539835402', {
      redirectUrl: config.PAYMENTS_BASE_API_URL + '/auth',
      ui: {
        highlightColor: "#7C3AED",
        buttonStyle: 'full',
        labels: {
          oneTouchPay: '배틀페이'
        }
      }
    })
    barndpay.requestAgreement('빌링').then((data) => {
      console.log(data)
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
      <button className='border px-2 py-1 rounded-md min-w-[10vw] mt-2 ml-2 hover:bg-gray-200' onClick={() => (haldleAddPayments())} >
        결제수단 관리
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
  if(cardlist.ok) {
    return {
      props: {
          cardlist: (await cardlist.json()).data
      }
    }
  } else {
    return {
      props: {
        cardlist: null
      },
    }; 
  }
};



export default Paylist
