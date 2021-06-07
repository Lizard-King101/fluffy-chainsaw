import { EditorService, ElementAttribute } from "src/app/_services/editor.service";
import { Path } from "./path.object";
import { Point } from "./point.object";
import { Shape } from "./shape.object";

export class Group {
    id: string;
    elements: (Path | Shape | Group)[] = [];

    attributes: ElementAttribute[] = [
    ];

    settings: {[key:string]: any} = {};

    get raw() {
        return '';
    }

    constructor(private editor: EditorService) {
        this.id = this.editor.ID;
    }

    moveElement(delta: Point) {
        this.elements.forEach((e) => {
            e.moveElement(delta);
        });
    }
}