import config from 'config'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import { Methods } from "@tosspayments/brandpay-types"
import PayItem from '@components/PayItems'
import { loadBrandPay } from '@tosspayments/brandpay-sdk';
import { useRouter } from 'next/router'
import { User, PaymentsGuild } from '@types'
import MembershipCard from '@components/membershipCard'
import SubcribeAdd from '@components/SubcribersAdd'
import Toast from '@components/Toast'

interface PaylistProps {
  cardlist: Methods,
  user: User,
  server: PaymentsGuild 
}

const SubscribeAdd: NextPage<PaylistProps> = ({cardlist, user, server}) => {
  const router = useRouter()
  useEffect(() => {
    if(!cardlist || cardlist.accounts.length === 0 && cardlist.accounts.length === 0) return Addpaylist()
  }, [])
  const refreshServerSide = () => {
    router.replace(router.asPath)
  }
  const Addpaylist = () => {
    Toast('등록된 결제수단이 없어 구독을 진행할 수 없습니다 먼저 카드나, 계좌를 등록해 주세요')
    router.push('/paylist')
  }

  return (
    <>
      <h1 className='text-2xl font-bold mb-2'>구독하기</h1>
      {server ? (<>
        <MembershipCard name={server.name} benefit={server.benefit} cardlist={cardlist}/>
      </>): (<div className='text-xl items-center flex w-full justify-center'>
        <span>이 서버는 계약이 완료되지 않았거나, 구독 기능을 이용 중이지 않습니다</span>
      </div>)}
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
  let server = await fetch(
      `${config.PAYMENTS_BASE_API_URL}/server/${context.query.id}`, {
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
  if(!server.ok && auth.ok) {
    return {
        props: {
            cardlist: null,
            user: (await auth.json()).data,
            server: null,
            message: (await server.json()).message
        }
    }
  }
  if(!cardlist.ok && auth.ok && server.ok) {
    return {
      props: {
          cardlist: null,
          user: (await auth.json()).data,
          server: (await server.json()).data
      }
    }
  }
  if(cardlist.ok && auth.ok && server.ok) {
    return {
      props: {
          cardlist: (await cardlist.json()).data,
          user: (await auth.json()).data,
          server: (await server.json()).data
      }
    }
  } else {
    return {
      props: {
        cardlist: null,
        user: null,
        server: null
      },
    }; 
  }
};

export default SubscribeAdd;
