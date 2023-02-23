import { UserDto } from "./user.dto";

export interface AuthResponseDto {
  accessToken: string;
  user: UserDto;
}
