import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [CommonModule ,RouterModule
  ],
  exports: [
    UsersComponent
  ]
})
export class UsersModule { }
