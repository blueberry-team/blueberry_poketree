import { GetSpecialPocketMonRequest } from "../models/req/GetSpecialPocketmonRequest";
import { GetSpecialPocketmonResponse } from "../models/res/GetSpecialPocketmonResponse";
import { apiClient } from "../../shared/utils/api/apiClient";

export async function getSpecialPoketmonGet(
  req: GetSpecialPocketMonRequest
): Promise<GetSpecialPocketmonResponse> {
  return apiClient.post<GetSpecialPocketmonResponse>(
    `/pokemon/add-special-pokemon`,
    { userId: req.userId },
    true
  );
}
