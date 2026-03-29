import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { roleGuard } from './guards/role-guard';

import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BugsComponent } from './pages/bugs/bugs.component';
import { BugDetailsComponent } from './pages/bug-details/bug-details.component';
import { CreateBugComponent } from './pages/create-bug/create-bug.component';
import { ActivityComponent } from './pages/activity/activity.component';
import { BuildsListComponent } from './pages/builds/builds-list/builds-list.component';
import { UploadBuildComponent } from './pages/builds/upload-build/upload-build.component';
import { AssignedBugsComponent } from './pages/assigned-bugs/assigned-bugs.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { BugHistoryComponent } from './pages/bug-history/bug-history.component';

export const routes: Routes = [

  // Public routes
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Protected — all roles
  { path: 'dashboard',    component: DashboardComponent,  canActivate: [authGuard] },
  { path: 'bugs',         component: BugsComponent,       canActivate: [authGuard] },
  { path: 'bugs/:id',     component: BugDetailsComponent, canActivate: [authGuard] },

  // ✅ Fixed: was 'bug-history/:id', HTML links to 'bugs/:id/history'
  { path: 'bugs/:id/history', component: BugHistoryComponent, canActivate: [authGuard] },

  { path: 'activity',     component: ActivityComponent,   canActivate: [authGuard] },
  { path: 'profile',      component: ProfileComponent,    canActivate: [authGuard] },

  // TESTER only
  {
    path: 'create-bug',
    component: CreateBugComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['TESTER'] }
  },

  // ✅ Fixed: ADMIN needs builds too — added ADMIN to roles
  {
    path: 'builds',
    component: BuildsListComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN', 'TESTER', 'DEVELOPER'] }
  },

  // ✅ Fixed: ADMIN needs upload-build too
  {
    path: 'upload-build',
    component: UploadBuildComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN', 'DEVELOPER'] }
  },

  // DEVELOPER only
  {
    path: 'assigned-bugs',
    component: AssignedBugsComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['DEVELOPER'] }
  },

  // Fallback
  { path: '**', redirectTo: '/login' }

];