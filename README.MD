# NestJS - Prisma Boilerplate


This is a fair good boilerplate to start a new NestJS project with Prisma.

## What is included

- Prisma integration
- Signup, Login, Verify Email and Reset Password
- Google Signup and login
- Authentication with Passport and JWT
- Users lookup and update
- Database Connections
- Rate Limiting
- Configurations
- RBAC with Casl and Prisma
- Class Serializer Interceptor
- Data Validations
- Exceptions Management
- Health Check (Prisma, Storage, Memory)
- Customizable Caching

## How to use

```
git glone https://github.com/raminious/nestjs-boilerplate/
```

Update environment variables
```
mv .env.keep .env
```

Initialize database
```
npx prisma db push
```

Start Server
```
npm run start:dev
```

### Environment keys

| Key                        | Sample value                                       |
|----------------------------|----------------------------------------------------|
| POSTGRES_URL               | postgresql://postgres:123456@localhost:5432/dbName |
| JWT_SECRET                 | 2a1v4y/B?TXH+MbQeThWmYq3t1l9a#C&                   |
| JWT_EXPIRESIN              | 30d                                                |
| SECURITY_KEY               | C&F)J@AcQfTjWnLr4u1x!B%D*G-KaPdS                   |
| GOOGLE_OAUTH_CLIENT_ID     | *****.apps.googleusercontent.com                   |
| GOOGLE_OAUTH_CLIENT_SECRET | GOCDPZ-R1A1P5cEEljValVoIeYcboOWc311                |
| CACHE_TTL                  | 30000                                              |
| CACHE_MAX                  | 100                                                |