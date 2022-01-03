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
