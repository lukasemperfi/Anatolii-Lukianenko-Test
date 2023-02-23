import { AuthResponseDto } from "api/dtos/auth-response.dto";
import { ErrorResponseDto } from "api/dtos/error-response.dto";
import { SuccessResponseDto } from "api/dtos/success-response.dto";
import { UserDto } from "api/dtos/user.dto";
import userAvatar from "assets/user-avatar.jpg";

const generateAuthResponse = (): SuccessResponseDto<AuthResponseDto> => {
  const user: UserDto = {
    id: 1,
    username: "admin",
    first_name: "John",
    last_name: "Wick",
    email: "johnwick@example.com",
    avatar: userAvatar,
  };
  const authResponse: AuthResponseDto = {
    accessToken: "some_access_token",
    user: user,
  };
  const successResponse: SuccessResponseDto<AuthResponseDto> = {
    data: authResponse,
    status_message: "Authentication successful",
    status_code: 200,
  };
  return successResponse;
};

const createErrorResponse = (
  reason: string,
  statusCode: number
): ErrorResponseDto => {
  return {
    error: "Authentication failed",
    status_code: statusCode,
    details: {
      reason,
    },
  };
};

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const fakeLogin = async (
  username: string,
  password: string
): Promise<SuccessResponseDto<AuthResponseDto>> => {
  await delay(1000);

  if (username !== "admin" || password !== "12345") {
    const errorResponse: ErrorResponseDto = createErrorResponse(
      "Ім'я користувача або пароль вказано невірно",
      401
    );

    throw errorResponse;
  } else {
    const successResponse: SuccessResponseDto<AuthResponseDto> =
      generateAuthResponse();

    return successResponse;
  }
};

export const fakeLogout = async (): Promise<void> => await delay(1000);
