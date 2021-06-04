import { EditorService, Point } from "src/app/_services/editor.service";
import { Group } from "./group.object";
import { Path } from "./path.object";
import { Shape } from "./shape.object";

export class SVG {
    id: string;
    name?: string;
    elements: (Path | Shape | Group)[] = [];
    tempElements: (Path | Shape)[] = [];
    width: number;
    height: number;
    zoom: number;
    pos: Point;

    constructor(private editor: EditorService, options: SVGOptions) {
        this.id = this.editor.ID;
        this.width = options.width;
        this.height = options.height;
        this.pos = options.pos;
        this.zoom = options.zoom ? options.zoom : 1;
    }
}

interface SVGOptions {
    width: number;
    height: number;
    pos: Point;
    zoom?: number;
}