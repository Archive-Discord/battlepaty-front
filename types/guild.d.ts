import { account } from "@types";

export interface DiscordUserGuild {
    id: string;
    name: string;
    icon: string;
    owner: boolean;
    permissions: number;
    permissions_new: number;
    bot: boolean;
    features: string[];
  }

  export interface Guild {
    name: string;
    members: number;
    channels: GuildChannel[];
    categories: GuildChannel[];
    roles: GuildRole[];
    icon: string;
    id: string;
    guild: string;
  }

  export interface PaymentsGuild {
    _id: string
    guild_id: string
    benefit: string[]
    name: string,
    owner_id: string
    useage: string
  }

  export interface PaymentsGuildSetting {
    
    server: PaymentsGuild
    account: account
  }