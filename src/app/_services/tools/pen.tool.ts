import { IconName } from "@fortawesome/fontawesome-svg-core";
import { Line } from "src/app/editor/objects/line.object";
import { Path } from "src/app/editor/objects/path.object";
import { Point } from "src/app/editor/objects/point.object";
import { EditorService } from "../editor.service";
import { Tool } from "./tool";

export class PenTool extends Tool{
    icon: IconName = 'pen-fancy';

    canDrag: boolean = false;
    clicked: boolean = false;
    workingLine?: Line;

    tmpPath?:Path;

    constructor(private _editor: EditorService) {
        super(_editor);
    }

    click(event: MouseEvent) {
        console.log('Pen Click');
        if(this._editor.selectedSVG) {
            let point = this._editor.toCanvasPoint(event.clientX, event.clientY);

            if(this._editor.editingElement == undefined) {
                let path = new Path(this._editor);
                let line = new Line(this._editor);
                line.points.push(point);
                path.lines.push(line);

                this.tmpPath = new Path(this._editor);
                let tmpLine = new Line(this._editor, {points: [point, point.add(0,0)]});
                this.tmpPath.lines.push(tmpLine);
                this._editor.selectedSVG.tempElements.push(this.tmpPath);

                this._editor.editingElement = path;
                this.workingLine = line;
                this._editor.selectedSVG.elements.push(path);
            } else {
                if(this.workingLine && this._editor.editingElement.hasOwnProperty('lines')) {
                    
                    let editingElement = (<Path>this._editor.editingElement);
                    let distance = editingElement.lines[0].points[0].distanceFrom(point);
                    if(distance <= this._editor.settings.snapDistance) {
                        this.workingLine.points.push(editingElement.lines[0].points[0]);
                        editingElement.closed = true;
                        this.tmpPath?.destroy();
                        this.tmpPath = undefined;
                        this._editor.editingElement = undefined;
                        this.workingLine = undefined;
                    } else {
                        this.workingLine.points.push(point);
                        let line = new Line(this._editor, {points: [point]})
                        if(this.tmpPath && this.tmpPath.lines[0]) {
                            this.tmpPath.lines[0].points = [point, point.add(0,0)];
                        }
                        this.workingLine = line;
                        editingElement.lines.push(line);
                    }
                }
            }

            console.log(this._editor.selectedSVG);
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
        if(this.tmpPath && this.tmpPath.lines[0]) {
            this.tmpPath.lines[0].points[1] = this._editor.toCanvasPoint(event.clientX, event.clientY);
        }
    }

    reset() {
        this.workingLine = undefined;
    }
}