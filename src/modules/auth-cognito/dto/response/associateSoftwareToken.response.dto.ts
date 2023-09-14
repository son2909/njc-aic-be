import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import CognitoUserResponseDto from './cognitoUser.response.dto';
export class AssociateSoftwareTokenResponseDto extends CognitoUserResponseDto {
  @Expose()
  secretCode: string;
}
