import { IconName } from "@fortawesome/fontawesome-common-types";
import { Point } from "src/app/editor/objects/point.object";
import { EditorService } from "../editor.service";
import { Tool } from "./tool";

export class SelectTool extends Tool {
    icon: IconName = "mouse-pointer";

    canDeselect: boolean = false;
    movedElement: boolean = false;

    movingElement: boolean = false;
    moveStart?: Point;

    constructor(private _editor: EditorService) {
        super(_editor);
    }

    down(event: MouseEvent) {
        let target = <HTMLElement>event.target;
        this.moveStart = this._editor.toCanvasPoint(event.clientX, event.clientY);
        if(target.id) {
            let foundElement = this._editor.findElement(target.id);
            if(foundElement) {
                this.movingElement = true;
                this._editor.editingElement = foundElement;
            }
        } else {
            this.canDeselect = true;
        }
    }

    drag(event: MouseEvent) {
        if(this.moveStart && this.movingElement && this._editor.editingElement && this._editor.selectedSVG) {
            let pos = this._editor.toCanvasPoint(event.clientX, event.clientY);
            let delta = pos.subtract(this.moveStart)
            this.moveStart = pos;
            this._editor.editingElement.moveElement(delta);
            this.movedElement = true;
            this.canDeselect = false;
        }
    }

    up(event: MouseEvent) {
        this.movingElement = false;
        this.movedElement = false;
        if(!this.movedElement && this.canDeselect) {
            this._editor.editingElement = undefined;
            this.canDeselect = false;
        }
    }
}