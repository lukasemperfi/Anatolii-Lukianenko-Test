import { AuthResponseDto } from "api/dtos/auth-response.dto";
import { SuccessResponseDto } from "api/dtos/success-response.dto";
import { fakeLogin, fakeLogout } from "utils/fake-auth";

class Auth {
  public login = async (
    username: string,
    password: string
  ): Promise<SuccessResponseDto<AuthResponseDto>> =>
    await fakeLogin(username, password);

  public logout = async (): Promise<void> => await fakeLogout();
}

export const authService = new Auth();
