import { Param, ParseUUIDPipe } from '@nestjs/common'

export const Id = () => Param('id', new ParseUUIDPipe())
