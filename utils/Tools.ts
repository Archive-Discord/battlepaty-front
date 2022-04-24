import { User } from '@types';
import { EndPoints } from "@utils/Constants";
import { DiscordUserGuild } from '@types';
export enum UserFlags {
	general = 0 << 0,
	guildowner = 1 << 10,
    manager = 1 << 11
}

/**
 * @param user 유저 오브젝트 값
 * @returns 유저 프로필 링크
 */
export const userAvaterLink = (user: User): string => {
    if(!user.avatar) return `${EndPoints.Discord.CDN}/embed/avatars/${Number(user.discriminator) % 5}.png`
    return `${EndPoints.Discord.CDN}/avatars/${user.id}/${user.avatar}`
}

export const guildProfileLink = (guild: DiscordUserGuild): string => {
    if(!guild.icon) return `${EndPoints.Discord.CDN}/embed/avatars/${Math.floor(Math.random() * (5 - 1 + 1)) + 1}.png`
    return `${EndPoints.Discord.CDN}/icons/${guild.id}/${guild.icon}`
}

export const UrlCheck = (url: string): boolean => {
    const expUrl = /(((http(s)?:\/\/)\S+(\.[^(\n|\t|\s,)]+)+)|((http(s)?:\/\/)?(([a-zA-z\-_]+[0-9]*)|([0-9]*[a-zA-z\-_]+)){2,}(\.[^(\n|\t|\s,)]+)+))+/gi;
    return expUrl.test(url)
}


function checkFlag(base: number, required: number) {
	return (base & required) === required
}

export function checkUserFlag(base: number, required: number | keyof typeof UserFlags):boolean {
	return checkFlag(base, typeof required === 'number' ? required : UserFlags[required])
}