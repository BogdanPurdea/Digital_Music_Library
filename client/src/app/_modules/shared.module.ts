import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    RouterModule, 
    MatListModule, 
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule, 
    MatFormFieldModule, 
    MatSlideToggleModule
  ],
  exports: [
    CommonModule, 
    RouterModule, 
    MatListModule, 
    MatButtonModule, 
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule, 
    MatFormFieldModule, 
    MatSlideToggleModule
  ]
})
export class SharedModule { }
