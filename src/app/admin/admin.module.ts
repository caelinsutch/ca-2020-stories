import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SharedModule} from '../shared/shared.module';
import {MatTableModule} from '@angular/material/table';
import {VerifyDialogComponent} from './verify-dialog/verify-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [DashboardComponent, VerifyDialogComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatTableModule,
    MatDialogModule,
  ],
  entryComponents: [VerifyDialogComponent]
})
export class AdminModule {
}
