import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  HttpStatus,
  Type,
  ValidationError,
} from '@nestjs/common'
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'

@Injectable()
export class ValidationPipe implements PipeTransform<unknown, unknown> {
  async transform(value: unknown, metadata: ArgumentMetadata) {
    const { metatype } = metadata

    if (!metatype || !this.toValidate(metatype)) {
      return value
    }

    if (metadata.type === 'custom') {
      return value
    }

    const object = plainToClass(metatype, value)
    const errors = await validate(object)

    if (errors.length > 0) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: JSON.stringify(this.normalizeErrors(errors)),
      })
    }

    return value
  }

  private normalizeErrors(errors: ValidationError[]) {
    return errors.map(error => ({
      property: error.property,
      constraints: Object.values(error.constraints),
    }))
  }

  private toValidate(metatype: Type<any>): boolean {
    const types: Type<any>[] = [String, Boolean, Number, Array, Object]
    return !types.includes(metatype)
  }
}
