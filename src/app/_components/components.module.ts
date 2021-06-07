import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RangeAttribute } from "./attributes/range/range.component";

import { SVGDisplay } from "./svg-display/svg-display.component";

const Attributes = [
    RangeAttribute
]

@NgModule({
    declarations: [
        SVGDisplay,
        ...Attributes
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        SVGDisplay,
        ...Attributes
    ]
})
export class Components { }