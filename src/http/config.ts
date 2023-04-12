interface serverConfig {
    baseURL: string,
    useTokenAuthorization: boolean
}
const serverConfig: serverConfig = {
    baseURL: "api/",
    useTokenAuthorization: false
}

export default serverConfig