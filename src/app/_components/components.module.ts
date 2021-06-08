import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ColorAttribute } from "./attributes/color/color.component";
import { RangeAttribute } from "./attributes/range/range.component";
import { SelectAttribut } from "./attributes/select/select.component";

import { SVGDisplay } from "./svg-display/svg-display.component";

const Attributes = [
    RangeAttribute,
    ColorAttribute,
    SelectAttribut
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