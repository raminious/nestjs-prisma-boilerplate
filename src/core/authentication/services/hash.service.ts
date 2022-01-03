import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { randomBytes } from 'crypto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class HashService {
  constructor(private readonly configService: ConfigService) {}

  public async generate(password: string) {
    const salt = await bcrypt.genSalt(10)

    return bcrypt.hash(password, salt)
  }

  public async compare(password: string, hash: string) {
    return bcrypt.compare(password, hash)
  }

  public async random() {
    return this.generate(randomBytes(12).toString('hex'))
  }
}
