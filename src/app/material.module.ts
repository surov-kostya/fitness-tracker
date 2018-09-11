import { NgModule } from "@angular/core";
import { 
    MatButtonModule, 
    MatIconModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule, 
    MatNativeDateModule,
    MatCheckboxModule
} from '@angular/material';

const modules = [
    MatButtonModule, 
    MatIconModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule
];

@NgModule({
    imports:modules,
    exports:modules
})
export class MaterialModule {}