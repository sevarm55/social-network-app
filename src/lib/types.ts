export interface IUser {
    id: number
    name: string
    surname: string
    login: string
    password: string
    isPrivate?: boolean
    cover?: string
    picture?: string
    followers?: IUser[]
    following?: IUser[]
}

export type IPartialUser = Partial<IUser>

export interface IResponse {
    status: string
    message?: string
    payload?: unknown
    user?: IUser
}

export interface IContext {
    account: IUser,
    setAccount: (user: IUser) => void
}

export enum ITab {
    Profile = 'profile',
    ChangePassword = 'changepassword',
    ChangeLogin = 'changelogin',
}

export interface INewPass {
    old: string
    newpwd: string
}

export interface IPost {
    id: number
    title: string
    picture: string
    isLiked:boolean
    likes: IUser[]
    comments: IComment[]
}

export interface IUserAccount extends IUser {
    available: boolean
    connection: {
        blockedMe: boolean
        didIBlock: boolean
        following: boolean
        followsMe: boolean
        requested: boolean
    }
    posts?: IPost[]
}

export interface IRequests {
    id:number
    user:IUser
}

export interface IComment {
    id:string
    content:string
    user: IUser
}