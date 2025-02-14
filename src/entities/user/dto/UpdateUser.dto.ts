import { E_Gender } from '../types'
import { IsEmail, IsEnum, IsISO8601, IsNotEmpty, IsString, MinLength } from 'class-validator'


export class UpdateUserDto {

  @IsEmail()
  email: string

  @IsString()
  @MinLength(1)
  nameFirst: string

  @IsString()
  @MinLength(1)
  nameLast: string

  @IsISO8601()
  birthDate: Date

  @IsNotEmpty()
  @IsEnum(E_Gender)
  gender: E_Gender
}