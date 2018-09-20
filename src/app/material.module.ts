import { NgModule } from "@angular/core";
import {MatSelectModule} from '@angular/material/select';
import { 
    MatButtonModule, 
    MatIconModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule, 
    MatNativeDateModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDialogModule
} from '@angular/material';

const modules = [
    MatButtonModule, 
    MatIconModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule
];

@NgModule({
    imports:modules,
    exports:modules
})
export class MaterialModule {}