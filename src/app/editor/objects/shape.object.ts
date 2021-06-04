import { Color, EditorService, Point } from "src/app/_services/editor.service";

export class Shape {
    id: string;
    position: Point;
    type: 'circle' | 'square';
    width?: number;
    height?: number;
    radius?: number;
    fill?: Color;

    constructor(private editor: EditorService, options: ShapeOptions) {
        this.id = this.editor.ID;
        this.position = options.position;
        this.type = options.type;
    }
}

export interface ShapeOptions {
    type: 'circle' | 'square';
    position: Point;
}