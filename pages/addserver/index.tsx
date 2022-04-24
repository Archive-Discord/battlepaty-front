import config from 'config'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Methods } from "@tosspayments/brandpay-types"
import PayItem from '@components/PayItems'
import { loadBrandPay } from '@tosspayments/brandpay-sdk';
import { useRouter } from 'next/router'
import { DiscordUserGuild } from '@types'
import ServerCard from '@components/GuildCard'
import Toast from '@components/Toast'

interface ServerListProps {
    serverList: DiscordUserGuild[]
}

const ServerList: NextPage<ServerListProps> = ({serverList}) => {
    const [refreshTime, setRefreshTime] = useState<Date>(new Date());
    const router = useRouter()

    const refreshServerSide = () => {
        const time = Number(new Date().getSeconds()) - Number(refreshTime.getSeconds())
        if(time > 10) {
            setRefreshTime(new Date())
            router.replace(router.asPath)
        } else {
            Toast(`${10 - time}초후 다시 시도해주세요`, 'error');
        }
    }

  return (
    <>
      <h1 className='text-2xl font-bold flex items-center flex-wrap'>신청가능한 서버목록</h1>      
      <div className='flex mt-16 flex-wrap'>
        {serverList ? (<>
                {serverList.length === 0 ? (<>
                    <div className='w-screen flex justify-center flex-wrap max-w-7xl h-screen'>
                        <div className='flex justify-center flex-row items-center text-2xl'>
                            <i className="fas fa-exclamation-circle mr-3"/>추가 가능한 서버가 없습니다
                        </div>
                    </div>
                </>): (<>
                    {serverList
                    .sort((a,b) => (a.bot === b.bot) ? 0 : a.bot ? -1 : 1)
                    .map((guild) => (<ServerCard key={guild.id} guild={guild}/>))}
                </>)}
            </>) : (<>
                <div>
                    <div className='flex justify-center flex-row items-center text-2xl'>
                            <i className="fas fa-exclamation-circle mr-3"/>추가 가능한 서버가 없습니다
                    </div>
                </div>
            </>)}
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let serverList = await fetch(
    `${config.BASE_API_URL}/users/@me/guilds`, {
        headers: {
            Cookie: `auth=${context.req.cookies.auth}`,
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



export default ServerList;
