import { Expose } from 'class-transformer';
export default class CognitoUserResponseDto {
  @Expose()
  name: string;

  @Expose()
  email: string;
}
