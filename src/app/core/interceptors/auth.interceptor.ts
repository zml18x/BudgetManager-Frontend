import {
  HttpClient,
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { RefreshResponse } from '../auth/models/refresh-response';
import { environment } from '@environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const accessToken = authService.getAccessToken();
  let authReq = accessToken
    ? req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('auth/refresh')) {
        return handle401(req, next, authService);
      }
      return throwError(() => error);
    })
  );
};

function handle401(
  req: HttpRequest<any>,
  next: HttpHandlerFn,
  authService: AuthService
) {
  const router = inject(Router);
  const refreshToken = authService.getRefreshToken();

  if (refreshToken) {
    const http = inject(HttpClient);

    return http
      .post<RefreshResponse>(`${environment.apiUrl}/auth/refresh`, refreshToken)
      .pipe(
        switchMap((res) => {
          authService.saveTokens(res.accessToken, res.refreshToken);

          return next(
            req.clone({
              setHeaders: { Authorization: `Bearer ${res.accessToken}` },
            })
          );
        }),
        catchError((err) => {
          authService.logout();
          router.navigate(['/login']);
          return throwError(() => err);
        })
      );
  } else {
    authService.logout();
    router.navigate(['/login']);
    return throwError(
      () => new Error('Authorization error. Please login again.')
    );
  }
}
