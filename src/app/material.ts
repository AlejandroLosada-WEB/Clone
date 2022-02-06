import {MatCardModule,MatButtonModule,MatFormFieldModule,MatProgressSpinnerModule,MatInputModule,MatTabsModule,MatDialogModule,MatCheckboxModule,MatMenuModule,MatIconModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';



@NgModule({
  imports: [FormsModule, ReactiveFormsModule,MatCardModule,MatButtonModule,MatFormFieldModule,MatProgressSpinnerModule,MatInputModule,MatTabsModule,MatDialogModule,MatCheckboxModule,MatMenuModule,MatIconModule],
  exports: [FormsModule, ReactiveFormsModule,MatCardModule,MatButtonModule,MatFormFieldModule,MatProgressSpinnerModule,MatInputModule,MatTabsModule,MatDialogModule,MatCheckboxModule,MatMenuModule,MatIconModule],
})
export class MaterialModule { }