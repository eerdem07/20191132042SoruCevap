import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    var token = localStorage.getItem('token');
    var newReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token),
    });
    return next.handle(newReq);
  }
}
