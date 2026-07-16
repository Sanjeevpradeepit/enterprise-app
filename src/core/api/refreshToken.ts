export async function refreshAccessToken(): Promise<string | null> {
  console.log('Refreshing access token...');

  /**
   * Later:
   *
   * const refreshToken = await storage.getRefreshToken();
   *
   * const response = await axios.post('/auth/refresh', {
   *    refreshToken,
   * });
   *
   * return response.data.accessToken;
   */

  return null;
}