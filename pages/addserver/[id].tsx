import config from 'config'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Methods } from "@tosspayments/brandpay-types"
import PayItem from '@components/PayItems'
import { loadBrandPay } from '@tosspayments/brandpay-sdk';
import { useRouter } from 'next/router'
import { DiscordUserGuild, Guild } from '@types'
import ServerCard from '@components/GuildCard'
import Toast from '@components/Toast'
import MembershipCard from '@components/membershipCard'

interface ServerProps {
    server: Guild
}

const ServerAdd: NextPage<ServerProps> = ({server}) => {
  const [membershipName, setMembershipName] = useState<string>('');
  const [membershipUseage, setMembershipUseage] = useState<string>('');
  const [membershipBenefit, setMembershipBenefit] = useState<string[]>([]);

  const submitHandler = async () => {
    fetch(`${config.PAYMENTS_BASE_API_URL}/submit/guild`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        guild_id: server.id,
        membershipName: membershipName,
        membershipUseage: membershipUseage,
        membershipBenefit: membershipBenefit
      }),
      
    }).then(async(data) => {
      const res = await data.json()
      if(data.ok) {
        Toast(res.message, 'success')
      } else {
        Toast(res.message, 'error')
      }
    }).catch((e) => {
      Toast(e.message, 'error')
    })
  }
  
  return (
    <>
      <h1 className='text-2xl font-bold flex items-center flex-wrap text-ellipsis overflow-hidden'>"{server.name}"서버 멤버십 이용신청</h1>
      <div className='w-full border border-md p-4 rounded-xl mt-5'>
        <div className='flex justify-between items-center w-full flex-row lg:flex-nowrap flex-wrap'>
            <div className='flex flex-col'>
                <span className='text-xl font-bold text-sky-500'>멤버십 이름</span>
                <span className='text-sm font-bold'>멤버십의 이름을 설정합니다</span>
            </div>
            <input onChange={(e) => (setMembershipName(e.target.value))} maxLength={10} className='mt-2 lg:mt-0 w-full p-4 h-10 border rounded-md cursor-default focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 lg:max-w-[50vw]' placeholder='배틀이 멤버십'/>
        </div>
        <div className='flex justify-between items-center w-full flex-row lg:flex-nowrap flex-wrap mt-5'>
            <div className='flex flex-col'>
                <span className='text-xl font-bold text-sky-500'>멤버십 사용목적</span>
                <span className='text-sm font-bold'>멤버십을 사용하실 목적을 간단하게 적어주세요</span>
            </div>
            <input onChange={(e) => (setMembershipUseage(e.target.value))} className='mt-2 lg:mt-0 w-full p-4 h-10 border rounded-md cursor-default focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 lg:max-w-[50vw]' placeholder='서버의 후원을 받기 위해서 사용됩니다.'/>
        </div>
        <div className='flex justify-between items-center w-full flex-row lg:flex-nowrap flex-wrap mt-5'>
            <div className='flex flex-col'>
                <span className='text-xl font-bold text-sky-500'>멤버십 혜택</span>
                <span className='text-sm font-bold'>멤버십을 구매시 적용되는 혜택을 적어주세요 ,(콤마)로 구분합니다</span>
            </div>
            <input onChange={(e) => (setMembershipBenefit(e.target.value.split(',')))} className='mt-2 lg:mt-0 w-full p-4 h-10 border rounded-md cursor-default focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 lg:max-w-[50vw]' placeholder='멤버십 전용 역할, 매주 추첨을 통한 상품 지급'/>
        </div>
      </div>
      <div className='w-full items-center justify-center mt-5'>
        <MembershipCard name={membershipName} example={true} benefit={membershipBenefit}/>
      </div>
      <button onClick={() => (submitHandler())} className='border w-full py-2 mt-12 rounded-md hover:bg-gray-100'>신청하기</button>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let server = await fetch(
    `${config.BASE_API_URL}/guild/${context.query.id}`, {
        headers: {
            Cookie: `auth=${context.req.cookies.auth}`,
        }
    })
    console.log(server)
  if(server.ok) {
    return {
      props: {
        server: (await server.json()).data
      }
    }
  } else {
    return {
      props: {
        server: null
      },
    }; 
  }
};



export default ServerAdd;
