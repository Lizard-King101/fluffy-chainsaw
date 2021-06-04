import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { SVGDisplay } from "./svg-display/svg-display.component";

@NgModule({
    declarations: [
        SVGDisplay
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        SVGDisplay
    ]
})
export class Components { }