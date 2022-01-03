import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Prisma, User, UserOrigin, UserTokenType } from '@prisma/client'
import moment from 'moment'

import { PrismaService } from 'src/core/database/services/prisma.service'
import { UserEntity } from 'src/core/user/entity/user.entity'
import { UserService } from 'src/core/user/services/user.service'
import { AppAbility } from 'src/typings/ability'
import { UUID } from 'src/typings/common'
import { UserSignupDto } from '../dto/user-signup.dto'
import { HashService } from './hash.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
  ) {}

  /**
   *
   * @param criteria
   * @returns
   */
  public async findUser(criteria: Prisma.UserWhereInput) {
    return this.prisma.user.findFirst({
      where: criteria,
    })
  }

  /**
   *
   * @param email
   * @param password
   * @returns
   */
  public async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity> {
    const user = await this.findUser({
      email,
      origin: UserOrigin.Local,
    })

    if (!user) {
      throw new NotFoundException()
    }

    if ((await this.hashService.compare(password, user.password)) === false) {
      throw new NotFoundException()
    }

    return new UserEntity(user)
  }

  /**
   *
   * @param param0
   * @returns
   */
  public async signup({ email, password }: UserSignupDto) {
    let user = await this.findUser({
      email,
      origin: UserOrigin.Local,
    })

    if (user) {
      throw new ConflictException({
        message: 'The email address is registered in the system.',
      })
    }

    user = await this.prisma.user.create({
      data: {
        name: email.split('@')[0],
        email,
        password: await this.hashService.generate(password),
        gender: null,
      },
    })

    return new UserEntity(user)
  }

  /**
   *
   * @param user
   * @returns
   */
  public async generateToken(user: UserEntity) {
    return {
      access_token: this.jwtService.sign({
        sub: user.id,
      }),
    }
  }

  /**
   *
   * @param ability
   * @param current
   * @param password
   */
  public async changePassword(
    ability: AppAbility,
    id: UUID,
    current: string,
    password: string,
  ) {
    const user = await this.userService.checkAccess(ability, { id })

    if (current === password) {
      throw new BadRequestException({
        message:
          'The new password should not be the same as the current password',
      })
    }

    if ((await this.hashService.compare(current, user.password)) === false) {
      throw new BadRequestException({
        message: 'The current password is invalid',
      })
    }

    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password: await this.hashService.generate(password),
      },
    })
  }

  /**
   *
   * @returns
   */
  public generateRandomCode() {
    return Math.floor(11111 + Math.random() * 99999).toString()
  }

  /**
   *
   * @param email
   * @param type
   * @returns
   */
  public async sendEmailCode(email: User['email'], type: UserTokenType) {
    const user = await this.prisma.user.findFirst({
      where: { email, origin: UserOrigin.Local },
      include: {
        tokens: {
          where: {
            type,
            createdAt: {
              gt: this.getExpireTime(),
            },
          },
        },
      },
    })

    if (!user) {
      throw new NotFoundException()
    }

    if (user.tokens.length > 0) {
      throw new ConflictException({
        message: 'The code has been sent. Look for it in your inbox.',
      })
    }

    const token = await this.prisma.userToken.create({
      data: {
        userId: user.id,
        code: this.generateRandomCode(),
        type,
      },
    })

    // TODO: SEND EMAIL
    console.log(token)
  }

  /**
   *
   * @param email
   * @returns
   */
  public async sendPasswordResetCode(email: User['email']) {
    return this.sendEmailCode(email, UserTokenType.PasswordReset)
  }

  /**
   *
   * @param ability
   * @param id
   * @returns
   */
  public async sendEmailVerificationCode(ability: AppAbility, id: UUID) {
    const user = await this.userService.checkAccess(ability, { id })

    if (user.emailVerified) {
      throw new BadRequestException({
        message: 'Email has already been verified',
      })
    }

    return this.sendEmailCode(user.email, UserTokenType.EmailVerify)
  }

  /**
   *
   * @param ability
   * @param id
   * @param code
   * @returns
   */
  public async verifyEmail(ability: AppAbility, id: UUID, code: string) {
    await this.userService.checkAccess(ability, { id })

    const token = await this.prisma.userToken.findFirst({
      where: {
        userId: id,
        code,
        createdAt: {
          gt: this.getExpireTime(),
        },
      },
    })

    if (!token) {
      throw new BadRequestException()
    }

    return this.prisma.$transaction([
      this.prisma.user.update({
        where: {
          id,
        },
        data: {
          emailVerified: true,
        },
      }),
      this.prisma.userToken.delete({
        where: {
          id: token.id,
        },
      }),
    ])
  }

  /**
   *
   * @param email
   * @param password
   * @param code
   * @returns
   */
  public async resetPassword(
    email: User['email'],
    password: string,
    code: string,
  ) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
      include: {
        tokens: {
          where: {
            code,
            createdAt: {
              gt: this.getExpireTime(),
            },
          },
        },
      },
    })

    if (!user || user.tokens.length === 0) {
      throw new NotFoundException()
    }

    return this.prisma.$transaction([
      this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: await this.hashService.generate(password),
        },
      }),
      this.prisma.userToken.delete({
        where: {
          id: user.tokens[0].id,
        },
      }),
    ])
  }

  /**
   *
   * @returns
   */
  private getExpireTime() {
    return moment(Date.now()).subtract(20, 'minutes').format()
  }
}
