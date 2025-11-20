import { apiClient, type ApiResponse } from "../utils/api/apiClient";

export async function logoutPost(): Promise<ApiResponse<null>> {
    return apiClient.post<ApiResponse<null>>('/auth/logout', {}, true);
}
