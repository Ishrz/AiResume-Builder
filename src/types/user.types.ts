
export interface IUser  {

    _id:string
    name:string,
    email:string,
    password:string,
    number:string,
    createdAt?:Date,
    updatedAt?:Date
    
}

export interface RegisterBody {
    name:string,
    email:string,
    password:string,
    number:string
}

export interface LoginBody {
    email:string,
    password:string
}

export interface JwtPayload{
    id:string,
    email?:string
}