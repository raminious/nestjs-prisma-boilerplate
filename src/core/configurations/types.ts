export interface Configurations {
  port: number
  jwt: {
    secret: string
    expiresIn: string
  }
  postgres: {
    url: string
  }
  security: {
    key: string
  }
  google: {
    oauth: {
      clientId: string
      clientSecret: string
    }
  }
}
