import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);

  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userRole = user.role || '';

    // Get allowed roles from route data
    // Usage in routes: data: { roles: ['ADMIN', 'TESTER'] }
    const allowedRoles: string[] = route.data?.['roles'] || [];

    if (allowedRoles.length === 0 || allowedRoles.includes(userRole)) {
      return true;
    }

    // Redirect to dashboard if role not allowed
    router.navigate(['/dashboard']);
    return false;

  } catch (e) {
    router.navigate(['/login']);
    return false;
  }
};