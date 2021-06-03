import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { EditorService, Point, SVG } from "../_services/editor.service";

@Component({
    templateUrl: 'editor.page.html',
    styleUrls: ['editor.page.scss']
})
export class EditorPage implements AfterViewInit{
    svg: SVG | null = null;
    scale: number = 1;

    canvasPos: Point = {x: 0, y: 0};
    canvasStyle = {
        left: '0px',
        top: '0px',
        scale: 1
    }

    movingView: boolean = false;
    moveStart: Point = {
        x: 0,
        y: 0
    };

    @ViewChild('canvas') canvas?: ElementRef<SVGElement>;
    @ViewChild('viewPort') viewPort?: ElementRef<HTMLElement>;

    constructor(public editor: EditorService) {

    }

    ngAfterViewInit() {
        let viewport = <HTMLElement>this.viewPort?.nativeElement;
        viewport.addEventListener('mousedown', (event: MouseEvent) => {
            let start: Point = {
                x: event.x - viewport.offsetLeft,
                y: event.y - viewport.offsetTop
            }
            console.log(event, start);
            switch(event.button) {
                case 0:
                    console.log('Left Mouse Button');
                    if(this.editor.selectedTool && this.svg) {
                        this.editor.selectedTool.click(this.svg, event);
                    } else {
                        console.log('Missing SVG or Tool', this.svg, this.editor.selectedTool);
                        
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

        viewport.addEventListener('wheel', (event: WheelEvent) => {
            // console.log(event);
            let scale = Math.abs(this.scale + 2)

            if(event.deltaY > 0) {
                console.log('Scroll Down');
                this.scale -= 1/(Math.pow(scale, 2));
            } else {
                console.log('Scroll Up');
                this.scale += 1/(Math.pow(scale, 2));
            }
            this.updateCanvasStyle();
        })

        viewport.addEventListener('contextmenu', (event: MouseEvent) => {
            // event.preventDefault();
            // return false;
        })

        viewport.addEventListener('mouseup', (event: MouseEvent) => {
            this.movingView = false;
        });

        viewport.addEventListener('mousemove', (event: MouseEvent) => {
            if(this.movingView) {
                // console.log(event);
                let pos: Point = {
                    x: event.x - viewport.offsetLeft,
                    y: event.y - viewport.offsetTop
                }
                let delta: Point = {
                    x: pos.x - this.moveStart.x,
                    y: pos.y - this.moveStart.y
                }
                this.moveStart = {
                    x: this.moveStart.x + delta.x,
                    y: this.moveStart.y + delta.y
                }
                this.canvasPos = {
                    x: this.canvasPos.x + delta.x,
                    y: this.canvasPos.y + delta.y
                }
                this.updateCanvasStyle()
            }
        });
    }

    newSVG() {
        let width = 300;
        let height = 250;

        let viewport = <HTMLElement>this.viewPort?.nativeElement;
        console.log(viewport);

        this.canvasPos = {
            x: (viewport.clientWidth / 2) - (width / 2),
            y: (viewport.clientHeight / 2) - (height / 2)
        }
        console.log(this.canvasPos);
        

        this.svg = {
            id: 'test',
            elements: [],
            width,
            height
        }

        this.updateCanvasStyle();
    }

    updateCanvasStyle() {
        this.canvasStyle.left = this.canvasPos.x + 'px';
        this.canvasStyle.top = this.canvasPos.y + 'px';
        this.canvasStyle.scale = this.scale;
    }
}