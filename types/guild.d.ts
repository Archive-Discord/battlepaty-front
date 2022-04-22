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