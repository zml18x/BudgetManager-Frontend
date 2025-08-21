import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest } from './models/login-request';
import { TokenResponse } from './models/token-response';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'https://localhost:7291/api';

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<any> {
    return this.http
      .post<TokenResponse>(`${this.API_URL}/login`, credentials)
      .pipe(
        tap((tokens) => {
          this.setTokens(tokens.accessToken, tokens.refreshToken);
        })
      );
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  refreshToken(): Observable<any> {
    return this.http
      .post<TokenResponse>(`${this.API_URL}/refresh`, {
        refreshToken: this.getRefreshToken(),
      })
      .pipe(
        tap((tokens: any) => {
          this.setTokens(tokens.accessToken, tokens.refreshToken);
        })
      );
  }

  setTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }
}
