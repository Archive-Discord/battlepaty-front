import { DiscordUserGuild } from '@types'
import { guildProfileLink } from '@utils/Tools'
import config from 'config'
import Link from 'next/link'

const ServerCard: React.FC<DiscordGuildProps> = ({guild})  => {
  const inviteBot = (id: string) => {
    window.open(`https://discord.com/oauth2/authorize?client_id=${config.BOT_CLIENT_ID}&permissions=8&scope=bot%20applications.commands&guild_id=${id}&disable_guild_select=true`, '봇 초대하기', "width=450, height=850");
  }
  return (
    <div className="card w-96 mx-auto bg-white shadow-xl mx-2 mb-20 dark:bg-battlebot-deepdark dark:text-white" style={{fontFamily: "nanumsquare"}}>
    <img className="w-32 mx-auto rounded-full -mt-8 border-8 border-white dark:border-battlebot-deepdark" src={guildProfileLink(guild)} alt=""/>
    <div className="text-center mt-2 text-3xl font-semibold">{guild.name}</div>
    <div className="px-6 text-center mt-2 font-medium text-sm">
      {guild.bot ? (<>
        <p>
            멤버십 기능을 시작하려면 버튼을 눌러 신청하세요!
        </p>
      </>):(<>
        <p>
            멤버십 기능을 사용 하시려면 봇을 초대해 보세요!
        </p>
      </>)
      }
    </div>
    <hr className="mt-8"/>
      {guild.bot ? (<>
        <Link href={`/addserver/${guild.id}`}>
          <div className="flex p-4 hover:bg-gray-100 hover:text-sky-500 hover:underline hover:underline-offset-4 dark:bg-battlebot-deepdark dark:text-white">
            <div className="w-full text-center">
                <a>
                  신청하기  
                </a>
            </div>
          </div>
        </Link>
      </>):(<>
        <button className="flex p-4 hover:bg-gray-100 hover:text-sky-500 hover:underline hover:underline-offset-4 w-full dark:bg-battlebot-deepdark dark:text-white" onClick={()=>(inviteBot(guild.id))}>
            <div className="w-full text-center">
                  초대하기  
            </div>
        </button>
      </>)
      }
 </div>
  )
}

interface DiscordGuildProps {
  guild: DiscordUserGuild
}

export default ServerCard