import { SignupOrGoRequest } from "../models/req/SignupOrGoRequest";
import { SignupOrGoResponse } from "../models/res/SignupOrGoResponse";
import { signupOrGoPost } from "../repositories/authRepository";

export async function signupOrGo(
  req: SignupOrGoRequest
): Promise<SignupOrGoResponse> {
  // validation
  if (!req.nickname || !req.password) {
    throw new Error("Nickname and password are required");
  }
  if (req.nickname.length > 6) {
    throw new Error("Nickname must be less than 6 characters");
  }
  if (req.password.length < 4) {
    throw new Error("Password must be at least 4 characters");
  }

  // API request
  const res = await signupOrGoPost(req);

  return res;
}
