import config from 'config'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Methods } from "@tosspayments/brandpay-types"
import PayItem from '@components/PayItems'
import { loadBrandPay } from '@tosspayments/brandpay-sdk';
import { useRouter } from 'next/router'
import { DiscordUserGuild, PaymentsGuild } from '@types'
import ServerCard from '@components/GuildCard'
import Toast from '@components/Toast'
import Link from 'next/link'

interface payoutListProps {
    serverList: PaymentsGuild[]
}

const PayoutList: NextPage<payoutListProps> = ({serverList}) => {
  return (
    <>
      <h1 className='text-2xl font-bold'>등록된 서버</h1>
      <div className='flex items-center flex-wrap'>
        {serverList.map((server, index) => (
          <div className='card w-96 mx-auto bg-white shadow-xl mx-2 mb-10 dark:bg-battlebot-deepdark dark:text-white rounded-md' key={index}>
            <div className='p-4'>
              <div className='flex justify-between flex-wrap'>
                <span>{server.guild_id}</span>
                <span className='bg-gray-200 px-2 rounded-md items-center'>승인됨</span>
              </div>
              <span>{server.name}</span>
            </div>
            <Link href={`/payout/${server.guild_id}`}>
              <a className='w-full border-t py-2 items-center justify-center flex hover:bg-gray-200 rounded-b-md'>
                관리하기
              </a>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let serverList = await fetch(
    `${config.PAYMENTS_BASE_API_URL}/payout/@me`, {
        headers: {
          "authorization": "Bearer " + context.req.cookies['auth'],
        }
    })
  if(serverList.ok) {
    return {
      props: {
        serverList: (await serverList.json()).data
      }
    }
  } else {
    return {
      props: {
        serverList: null
      },
    }; 
  }
};



export default PayoutList;
