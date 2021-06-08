import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from "@angular/core";
import { EditorService } from "../_services/editor.service";
import { Color } from "./objects/color.object";
import { Line } from "./objects/line.object";
import { Point } from "./objects/point.object";

@Component({
    templateUrl: 'editor.page.html',
    styleUrls: ['editor.page.scss']
})
export class EditorPage implements AfterViewInit{
    scale: number = 1;

    movingView: boolean = false;
    moveStart: Point;

    @ViewChild('canvas') canvas?: ElementRef<SVGElement>;
    @ViewChild('viewPort') viewPort?: ElementRef<HTMLElement>;

    
    @HostListener('document:keydown', ['$event']) handleKeyDown(event: KeyboardEvent) {
        console.log(event.key);
    }
    @HostListener('document:keyup', ['$event']) handleKeyUp(event: KeyboardEvent) {
        console.log();
    }

    constructor(public editor: EditorService) {
        this.moveStart = new Point(0,0);
        let color = new Color();
        color.rgb = { r: 255, g: 0, b: 47};
        // color.hsl = {h: 349, s: 100, l: 50};
        
        console.log(color.hex, color.rgb, color.hsl);
        
    }

    ngAfterViewInit() {
        let viewport = <HTMLElement>this.viewPort?.nativeElement;
        viewport.addEventListener('mousedown', (event: MouseEvent) => {
            let start = this.editor.toViewportPoint(event.x, event.y);
            switch(event.button) {
                case 0:
                    console.log('Left Mouse Button');
                    if(this.editor.selectedTool) {
                        this.editor.selectedTool.down(event);
                    }
                    break;
                case 1:
                    console.log('Middle Mouse Button');
                    this.movingView = true;
                    this.moveStart = start;
                    break;
                case 2:
                    console.log('Right Mouse Button');
                    event.preventDefault();
                    break;
                default:
                    console.log('Unknown Mouse Button');
                    break;
            }
        });
        
        viewport.addEventListener('mouseup', (event: MouseEvent) => {
            if(this.editor.selectedTool) this.editor.selectedTool.up(event); 
            this.movingView = false;
        });

        viewport.addEventListener('wheel', (event: WheelEvent) => {
            if(this.editor.selectedSVG != undefined) {
                let scale = Math.abs(this.editor.selectedSVG.zoom + 2);
                if(event.deltaY > 0) {
                    this.editor.selectedSVG.zoom -= 1/(Math.pow(scale, 2));
                } else {
                    this.editor.selectedSVG.zoom += 1/(Math.pow(scale, 2));
                }
            }
        })

        viewport.addEventListener('contextmenu', (event: MouseEvent) => {
            event.preventDefault();
            if(this.editor.selectedTool) this.editor.selectedTool.contextMenu(event); 
            return false;
        })

        viewport.addEventListener('mousemove', (event: MouseEvent) => {
            if(this.movingView && this.editor.selectedSVG != undefined) {
                let pos = this.editor.toViewportPoint(event.x, event.y);
                //new Point( event.x - viewport.offsetLeft, event.y - viewport.offsetTop);
                let delta = pos.subtract(this.moveStart);
                this.moveStart.addTo(delta.x, delta.y);
                this.editor.selectedSVG.pos.addTo(delta);
            }
            if(this.editor.selectedTool) this.editor.selectedTool.drag(event); 
        });

        viewport.addEventListener('click', (event: MouseEvent) => {
            if(this.editor.selectedTool && event.button == 0) this.editor.selectedTool.click(event); 
        })

        this.editor.setViewPort(viewport);
    }

    newSVG() {

        this.editor.newSVG(300, 250);
    }

}