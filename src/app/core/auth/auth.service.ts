import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest } from './models/login-request';
import { RegisterRequest } from './models/register-request';
import { TokenResponse } from './models/token-response';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  register(data: RegisterRequest) {
    return this.http.post(`${this.API_URL}/auth/register`, data);
  }

  login(credentials: LoginRequest): Observable<any> {
    return this.http
      .post<TokenResponse>(`${this.API_URL}/auth/login`, credentials)
      .pipe(
        tap((tokens) => {
          this.saveTokens(tokens.accessToken, tokens.refreshToken);
        })
      );
  }

  logout() {
    this.removeTokens();
  }

  refreshToken(): Observable<any> {
    return this.http
      .post<TokenResponse>(`${this.API_URL}/auth/refresh`, {
        refreshToken: this.getRefreshToken(),
      })
      .pipe(
        tap((tokens: any) => {
          this.saveTokens(tokens.accessToken, tokens.refreshToken);
        })
      );
  }

  saveTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  isAuthenticated(): boolean {
    return this.getAccessToken() && this.getRefreshToken() ? true : false;
  }

  private removeTokens(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}
