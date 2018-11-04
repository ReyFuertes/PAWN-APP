import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

/**
 * Guard to determine whether or not a customer account has already been verified
 * unverified customers do not have the same access as verified ones
 */
@Injectable()
export class AuthGuard implements CanActivate {

  /**
   * Constructor
   * @param {AuthService} auth
   * @param {Router} router
   */
  constructor (private router: Router) {}

  /**
   * Check whether or not the customer is verified and can access the requested route
   * @param {ActivatedRouteSnapshot} next
   * @param {RouterStateSnapshot} state
   * @returns {Observable<boolean> | Promise<boolean> | boolean}
   */
  canActivate (next: ActivatedRouteSnapshot,
               state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const user = localStorage.getItem('u');
    if (user) {
      return true;
    } else {
      this.router.navigateByUrl('auth/login');
    }
  }
}
