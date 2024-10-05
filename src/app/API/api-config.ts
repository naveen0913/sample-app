export enum ApiUrl {
    baseUrl = "http://localhost:8080/spring-boot"
}

export enum ApiTypes {
    POST = "POST",
    GET = "GET",
    PUT = "PUT",
    DELETE = "DELETE"
}

export interface ApiData {
    userLogin:{
        url?:string,
        method?:string
    }
    getUser:{
        url?:string,
        method?:string
    }
}