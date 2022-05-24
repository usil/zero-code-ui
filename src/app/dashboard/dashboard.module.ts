import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashBoardMaterials } from './material/material.module';
import { TablesComponent } from './tables/tables.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccessComponent } from './access/access.component';
import { UserComponent } from './access/user/user.component';
import { ClientComponent } from './access/client/client.component';
import { RoleComponent } from './access/role/role.component';
import { ApplicationResourceComponent } from './access/application-part/application-resource.component';
import { UserProfileComponent } from './access/user-profile/user-profile.component';
import { ZeroTablesComponent } from './zero-tables/zero-tables.component';
import { MetaDataComponent } from './zero-tables/meta-data/meta-data.component';
import { NodebootOauth2StarterModule } from 'nodeboot-oauth2-starter-ui';
import { RawQueryComponent } from './raw-query/raw-query.component';
@NgModule({
  declarations: [
    DashboardComponent,
    TablesComponent,
    AccessComponent,
    UserComponent,
    ClientComponent,
    RoleComponent,
    ApplicationResourceComponent,
    UserProfileComponent,
    ZeroTablesComponent,
    MetaDataComponent,
    RawQueryComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DashBoardMaterials,
    FormsModule,
    ReactiveFormsModule,
    NodebootOauth2StarterModule,
  ],
})
export class DashboardModule {}
