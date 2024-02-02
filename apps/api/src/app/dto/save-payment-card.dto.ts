import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class AddPaymentCardDto {
  @ApiProperty({
    required: true,
    minLength: 16,
    maxLength: 16,
    pattern: '^\\d+$',
  })
  @MaxLength(16)
  @MinLength(16)
  @IsString()
  @IsNotEmpty()
  readonly number: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    required: true,
    minLength: 2,
    maxLength: 2,
    pattern: '^\\d+$',
  })
  @MaxLength(2)
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  readonly expiration_month: string;

  @ApiProperty({
    required: true,
    minLength: 2,
    maxLength: 2,
    pattern: '^\\d+$',
  })
  @MaxLength(2)
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  readonly expiration_year: string;

  @ApiProperty({
    required: true,
    minLength: 3,
    maxLength: 3,
    pattern: '^\\d+$',
  })
  @MaxLength(3)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  readonly security_code: string;
}
