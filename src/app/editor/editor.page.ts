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
                this.editor.selectedSVG.pos = {
                    x: this.editor.selectedSVG.pos.x + delta.x,
                    y: this.editor.selectedSVG.pos.y + delta.y
                }
            }
            if(this.editor.selectedTool) this.editor.selectedTool.drag(event); 
        });

        viewport.addEventListener('click', (event: MouseEvent) => {
            if(this.editor.selectedTool && event.button == 0) this.editor.selectedTool.click(event); 
        })

        this.editor.setViewPort(viewport);
    }

    newSVG() {
        // let width = 300;
        // let height = 250;

        // let viewport = <HTMLElement>this.viewPort?.nativeElement;

        // this.canvasPos = {
        //     x: (viewport.clientWidth / 2) - (width / 2),
        //     y: (viewport.clientHeight / 2) - (height / 2)
        // }
        
        // this.svg = {
        //     id: 'test',
        //     elements: [],
        //     tempElements: [],
        //     width,
        //     height
        // }

        this.editor.newSVG(300, 250);
    }

}