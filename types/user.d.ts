export interface User {
    id: string;
    username: string;
    discriminator: string;
    avatar: string;
    bot: boolean;
    flags: number;
    battlebotflags: number;
    banner: string;
    public_flags: number;
    accent_color: number;
    kakao_name: string;
    kakao_email: string
}