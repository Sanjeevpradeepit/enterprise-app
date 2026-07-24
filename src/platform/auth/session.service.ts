import { tokenService } from './token.service';

class SessionService {
  isAuthenticated() {
    return tokenService.hasToken();
  }

  logout() {
    tokenService.removeTokens();
  }

  async login(
    accessToken: string,
    refreshToken: string,
  ) {
    tokenService.saveAccessToken(accessToken);
    tokenService.saveRefreshToken(refreshToken);
  }
}

export const sessionService = new SessionService();