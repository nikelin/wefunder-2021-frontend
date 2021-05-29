declare const __ENV_NAME__: string

export type Config = {
    api_endpoint: string
}

type Configs = { [key: string]: Config }

const config: Configs = {
    staging: {
        api_endpoint: "https://production.url/api"
    },
    local: {
        api_endpoint: "http://localhost:8080/api"
    }
}

export default config[__ENV_NAME__]
