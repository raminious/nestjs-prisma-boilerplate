import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class BodyTrimTransformPipe implements PipeTransform<any> {
  async transform(values: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body' && typeof values === 'object') {
      return Object.entries(values).reduce((acc, [key, value]) => {
        return {
          ...acc,
          [key]: this.normalizeField(key, value),
        }
      }, {})
    }

    return values
  }

  private normalizeField(key: string, value: unknown) {
    if (key === 'password' || typeof value !== 'string') {
      return value
    }

    if (key === 'email') {
      return value.trim().toLowerCase()
    }

    return value.trim()
  }
}
