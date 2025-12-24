import { GetSpecialPocketMonRequest } from "../models/req/GetSpecialPocketmonRequest";
import { GetSpecialPocketmonResponse } from "../models/res/GetSpecialPocketmonResponse";
import { getSpecialPoketmonGet, getXmasPoketmonGet } from "../repositories/poketmonRepository";

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

// TODO: usecase 분리 해야함 - 리팩토링 할 때 한번에 할 예정
export async function getXmasPoketmon(
  req: GetSpecialPocketMonRequest
): Promise<GetSpecialPocketmonResponse> {
  // validation
  if (!req.userId) {
    throw new Error("User ID is required");
  }

  // API request
  const res = await getXmasPoketmonGet(req);

  if (res.message !== "success") {
    throw new Error(res.message);
  }

  return res;
}