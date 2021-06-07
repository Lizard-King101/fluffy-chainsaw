import { EditorService } from "src/app/_services/editor.service";
import { Point } from "./point.object";

export class Line {
    id: string;
    type: 'line' | 'bezier';
    points: Point[] = [];

    constructor(private editor: EditorService, options?: LineOptions) {
        this.id = this.editor.ID;
        if(options) {
            this.type = options.type ? options.type : 'line';
            this.points = options.points ? options.points : [];
        } else {
            this.type = 'line';
        }
    }
}

export interface LineOptions {
    type?: 'line' | 'bezier';
    points?: Point[]
}