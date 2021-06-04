import { IconName } from "@fortawesome/fontawesome-svg-core";
import { Line } from "src/app/editor/objects/line.object";
import { Path } from "src/app/editor/objects/path.object";
import { EditorService } from "../editor.service";
import { Tool } from "./tool";

export class PenTool extends Tool{
    icon: IconName = 'pen-fancy';

    canDrag: boolean = false;
    clicked: boolean = false;
    workingLine?: Line;

    constructor(private _editor: EditorService) {
        super(_editor);
    }

    click(event: MouseEvent) {
        console.log('Pen Click');
        if(this._editor.selectedSVG) {
            let point = this._editor.toCanvasPoint({
                x: event.clientX,
                y: event.clientY
            })

            if(this._editor.editingElement == undefined) {
                let path = new Path(this._editor);
        
                let line = new Line(this._editor);
        
                
                line.points.push(point);
                path.lines.push(line);
                this._editor.editingElement = path;
                this.workingLine = line;
                this._editor.selectedSVG.elements.push(path);
            } else {
                if(this.workingLine && this._editor.editingElement.hasOwnProperty('lines')) {
                    this.workingLine.points.push(point);
                    let line = new Line(this._editor, {points: [point]})
                    this.workingLine = line;
                    (<Path>this._editor.editingElement).lines.push(line);
                }
            }
        }
    }

    // down(event: MouseEvent) {
    //     setTimeout(() => {
    //         if(!this.clicked) {
    //             console.log('Pen Down');
    //             this.canDrag = true;
    //         }
    //     }, 100);
    // }

    // up(event: MouseEvent) {
    //     console.log('Pen Up');
        
    //     this.canDrag = false;
    //     this.clicked = false;
    // }

    drag(event: MouseEvent) {
        if(this.canDrag) {
            console.log('Pen Drag');
        }
    }
}