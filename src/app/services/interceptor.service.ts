// src/app/services/interceptor.service.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environment';

export const HttpInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = environment.apiBaseUrl;
  const updatedRequest = req.clone({
    url: `${baseUrl}/${req.url}`
  });
  return next(updatedRequest);
};
