import { Configurations } from '../types'

export default function configurations(): Configurations {
  return {
    port: parseInt(process.env.PORT, 10) || 3000,
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRESIN || '30d',
    },
    postgres: {
      url: process.env.POSTGRES_URL,
    },
    security: {
      key: process.env.SECURITY_KEY,
    },
    google: {
      oauth: {
        clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      },
    },
    cache: {
      ttl: parseInt(process.env.CACHE_TTL, 10) ?? 60 * 1000,
      max: parseInt(process.env.CACHE_MAX, 10) || 100,
    },
  }
}
