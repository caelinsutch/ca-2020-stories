import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell/shell.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {LayoutModule} from '@angular/cdk/layout';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {RouterModule} from '@angular/router';
import { UploaderComponent } from './uploader/uploader.component';
import { DropZoneDirective } from './dropzone.directive';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';

const modules: Array<any> = [
  MatToolbarModule,
  MatIconModule,
  LayoutModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  RouterModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  NgxSkeletonLoaderModule,
];

const components: Array<any> = [
  ShellComponent,
  UploaderComponent,
];

@NgModule({
  declarations: [...components, ],
  imports: [
    CommonModule,
    ...modules,
  ],
  exports: [
    ...modules,
    ...components,
  ]
})
export class SharedModule { }