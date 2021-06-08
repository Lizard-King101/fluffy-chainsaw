import { AfterViewInit, Component, forwardRef, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { AttriputSelectOption } from "src/app/_services/editor.service";

@Component({
    selector: 'attr-select',
    templateUrl: 'select.component.html',
    styleUrls: ['select.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectAttribut),
            multi: true
        }
    ]
})
export class SelectAttribut implements AfterViewInit, ControlValueAccessor {
    @Input('label') label?: string;
    @Input('options') options?: AttriputSelectOption[];

    val?: any;

    constructor() {

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
            return 0;
        }
    }

    writeValue(_value?: any) {
        if(_value) {
            this.value = _value;
            console.log('Select ', _value);
        }
    }

    registerOnChange(fn: (_v: any) => {}) {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => {}) {
        this.onTouch = fn;
    }
}