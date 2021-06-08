import { AfterViewInit, Component, forwardRef, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Color, HSL, RGB } from "src/app/editor/objects/color.object";

@Component({
    selector: 'color',
    templateUrl: 'color.component.html',
    styleUrls: ['color.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ColorAttribute),
            multi: true
        }
    ]
})
export class ColorAttribute implements AfterViewInit, ControlValueAccessor {
    @Input('label') label?: string;
    editType: 'rgbs' | 'rgbp' | 'hsl' = 'hsl';

    color: Color;

    rgb: RGB;
    hsl: HSL;

    constructor() {
        this.color = new Color();
        this.rgb = this.color.rgb;
        this.hsl = this.color.hsl;
        // this.color.hsl = {h: 50, s: .75, l: 1};
    }

    updateHEX() {
        this.rgb = this.color.rgb;
        this.hsl = this.color.hsl;
    }

    updateHSL() {
        this.color.hsl = this.hsl;
        this.rgb = this.color.rgb;
    }

    updateRGB() {
        this.color.rgb = this.rgb;
        this.hsl = this.color.hsl;
    }

    ngAfterViewInit() {

    }

    onChange(_value: Color) {};
    onTouch():void {}

    writeValue(_value: Color) {
        if(_value) {
            this.color = _value;
            this.rgb = this.color.rgb;
            this.hsl = this.color.hsl;
            console.log('Write Value', _value);
        } else {
            this.onChange(this.color);
        }
    }

    registerOnChange(fn: (_v: Color) => {}) {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => {}) {
        this.onTouch = fn;
    }
}