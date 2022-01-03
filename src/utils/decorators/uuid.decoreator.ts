import { Param, ParseUUIDPipe } from '@nestjs/common'

export const UUID = (name: string) => Param(name, new ParseUUIDPipe())
