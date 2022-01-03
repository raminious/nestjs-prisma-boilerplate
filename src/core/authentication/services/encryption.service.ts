import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto'
import { promisify } from 'util'

@Injectable()
export class EncryptionService {
  private readonly algorithm = 'aes-256-ctr'

  constructor(private readonly configService: ConfigService) {}

  public async encrypt(text: string) {
    const iv = randomBytes(16)

    const key = await this.getKey()
    const cipher = createCipheriv(this.algorithm, key, iv)

    const hexIv = iv.toString('hex')
    const hexContent = Buffer.concat([
      cipher.update(text),
      cipher.final(),
    ]).toString('hex')

    return `${hexIv}:${hexContent}`
  }

  public async decrypt(hash: string) {
    const [iv, content] = hash.split(':')

    const key = await this.getKey()
    const decipher = createDecipheriv(
      this.algorithm,
      key,
      Buffer.from(iv, 'hex'),
    )

    return Buffer.concat([
      decipher.update(Buffer.from(content, 'hex')),
      decipher.final(),
    ]).toString()
  }

  private async getKey() {
    const password = this.configService.get<string>('security.key')
    return (await promisify(scrypt)(password, 'salt', 32)) as Buffer
  }
}
