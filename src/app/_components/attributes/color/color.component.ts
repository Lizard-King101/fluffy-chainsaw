import { AfterViewInit, Component, Input } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";
import { Color, HSL } from "src/app/editor/objects/color.object";

@Component({
    selector: 'color',
    templateUrl: 'color.component.html',
    styleUrls: ['color.component.scss']
})
export class ColorAttribute implements AfterViewInit, ControlValueAccessor{

    @Input('return') returnType: 'rgb' | 'hsl' | 'hex' = 'hex';
    val?: any;

    editType: 'rgbs' | 'rgbp' | 'hsl' = 'hsl';

    color: Color

    constructor() {
        this.color = new Color();
    }

    ngAfterViewInit() {

    }

    onChange(_value: any) {};
    onTouch():void {}

    set value(val: any) {
        if(val != undefined && this.val !== val) {
            this.val = val;
            this.onTouch();
            this.onChange(this.val);
        }
    }

    get value() {
        if(this.val) {
            return this.val
        } else {
            switch(this.returnType) {
                case 'hex':
                    return '#000000';
                    break;
                case 'hsl':
                    return {h: 0, s: 1, l: .5};
                    break;
                case 'rgb':
                    return {r: 255, g: 0, b: 0};
                    break;
            }
        }
    }

    writeValue(_value: any) {
        this.value = _value;
        console.log('Write Value', _value);
        
    }

    registerOnChange(fn: (_v: any) => {}) {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => {}) {
        this.onTouch = fn;
    }
}