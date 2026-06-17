import { HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

import { UsuarioService } from '../../usuarios/services/usuario.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);
  const token = usuarioService.obterToken();

  if (!token) {
    return next(req).pipe(
      catchError((erro) => {
        if (erro.status === HttpStatusCode.Unauthorized) {
          usuarioService.logout();
          void router.navigate(['/login']);
        }

        return throwError(() => erro);
      })
    );
  }

  const requisicaoAutenticada = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(requisicaoAutenticada).pipe(
    catchError((erro) => {
      if (erro.status === HttpStatusCode.Unauthorized) {
        usuarioService.logout();
        void router.navigate(['/login']);
      }

      return throwError(() => erro);
    })
  );
};
