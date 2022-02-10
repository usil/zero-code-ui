import { AdminGuard } from './../guards/admin.guard';
import { UserProfileComponent } from './access/user-profile/user-profile.component';
import { ApplicationResourceComponent } from './access/application-part/application-resource.component';
import { RoleComponent } from './access/role/role.component';
import { ClientComponent } from './access/client/client.component';
import { UserComponent } from './access/user/user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ZeroTablesComponent } from './zero-tables/zero-tables.component';
import { MetaDataComponent } from './zero-tables/meta-data/meta-data.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'auth/users',
        component: UserComponent,
        canActivate: [AdminGuard],
        canLoad: [AdminGuard],
      },
      {
        path: 'auth/clients',
        component: ClientComponent,
        canActivate: [AdminGuard],
        canLoad: [AdminGuard],
      },
      {
        path: 'auth/roles',
        component: RoleComponent,
        canActivate: [AdminGuard],
        canLoad: [AdminGuard],
      },
      {
        path: 'auth/resource',
        component: ApplicationResourceComponent,
        canActivate: [AdminGuard],
        canLoad: [AdminGuard],
      },
      { path: 'profile', component: UserProfileComponent },
      { path: 'table/:tableName', component: ZeroTablesComponent },
      { path: 'table/:tableName/meta-data', component: MetaDataComponent },
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
