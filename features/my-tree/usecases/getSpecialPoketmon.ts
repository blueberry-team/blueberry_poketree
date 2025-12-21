import { GetSpecialPocketMonRequest } from "../models/req/GetSpecialPocketmonRequest";
import { GetSpecialPocketmonResponse } from "../models/res/GetSpecialPocketmonResponse";
import { getSpecialPoketmonGet } from "../repositories/poketmonRepository";

export async function getSpecialPoketmon(
  req: GetSpecialPocketMonRequest
): Promise<GetSpecialPocketmonResponse> {
  // validation
  if (!req.userId) {
    throw new Error("User ID is required");
  }

  // API request
  const res = await getSpecialPoketmonGet(req);

  if (res.message !== "success") {
    throw new Error(res.message);
  }

  return res;
}
