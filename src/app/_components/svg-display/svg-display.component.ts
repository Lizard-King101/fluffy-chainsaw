import { AfterViewInit, Component, ElementRef, HostBinding } from "@angular/core";
import { EditorService } from "src/app/_services/editor.service";

@Component({
    selector: '[display]',
    templateUrl: 'svg-display.component.html'
})
export class SVGDisplay implements AfterViewInit{
    @HostBinding('attr.width') get width() { return this.editor.selectedSVG?.width }
    @HostBinding('attr.height') get height() { return this.editor.selectedSVG?.height }
    @HostBinding('attr.viewBox') get viewbox() { return '0 0 ' + this.editor.selectedSVG?.width + ' ' + this.editor.selectedSVG?.height }
    @HostBinding('style.top') get y() { return (this.editor.selectedSVG?.pos.y || 0) + 'px' }
    @HostBinding('style.left') get x() { return (this.editor.selectedSVG?.pos.x || 0) + 'px' }
    @HostBinding('style.scale') get zoom() { return this.editor.selectedSVG?.zoom }


    constructor(private editor: EditorService, private host:ElementRef<SVGElement>) {

    }

    ngAfterViewInit() {
        if(this.host.nativeElement.tagName !== "svg") {
            throw new Error("Cannot use display on non SVG Element");
        }
    }

}