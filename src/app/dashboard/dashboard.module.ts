import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashBoardMaterials } from './material/material.module';
import { FormsComponent } from './forms/forms.component';
import { TablesComponent } from './tables/tables.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccessComponent } from './access/access.component';
import { UserComponent } from './access/user/user.component';
import { ClientComponent } from './access/client/client.component';
import { RoleComponent } from './access/role/role.component';
import { ApplicationPartComponent } from './access/application-part/application-part.component';
import { UserProfileComponent } from './access/user-profile/user-profile.component';
import { ZeroTablesComponent } from './zero-tables/zero-tables.component';
import { MetaDataComponent } from './zero-tables/meta-data/meta-data.component';
import { NodebootOauth2StarterModule } from 'nodeboot-oauth2-starter';
@NgModule({
  declarations: [
    DashboardComponent,
    FormsComponent,
    TablesComponent,
    AccessComponent,
    UserComponent,
    ClientComponent,
    RoleComponent,
    ApplicationPartComponent,
    UserProfileComponent,
    ZeroTablesComponent,
    MetaDataComponent,
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
