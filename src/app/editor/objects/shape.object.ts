import { Color, EditorService, ElementAttribute } from "src/app/_services/editor.service";
import { Point } from "./point.object";

export class Shape {
    id: string;
    position: Point;
    type: 'circle' | 'square';
    width?: number;
    height?: number;
    radius?: number;
    fill?: Color;

    attributes: ElementAttribute[] = [
    ];

    settings: {[key:string]: any} = {};

    get raw() {
        return '';
    }

    constructor(private editor: EditorService, options: ShapeOptions) {
        this.id = this.editor.ID;
        this.position = options.position;
        this.type = options.type;
    }

    moveElement(delta: Point) {
        this.position.addTo(delta);
    }
}

export interface ShapeOptions {
    type: 'circle' | 'square';
    position: Point;
}