import { Injectable } from "@angular/core";
import { Tool } from "./tools/tool";

import { Tools } from "./tools/tools";

@Injectable()
export class EditorService {
    tools: Tool[] = [];
    selectedTool?: Tool;

    constructor() {
        Tools.forEach((tool) => {
            let t = new tool(this);
            this.tools.push(t);
        })
    }

    deselectOther(tool: Tool) {
        this.tools.forEach((t) => {
            console.log(t, t == tool);
            if(t != tool) {
                t.deselect();
            }
        })
    }

}

export interface SVG {
    id: string;
    elements: Path | Shape[];
    width: number;
    height: number;
}

export interface Path {
    type: 'line' | 'bezier';
    points: Point[];
}

export interface Point {
    x: number;
    y: number;
}

export interface Shape {
    position: Point;
    type: 'circle' | 'square';
    width?: number;
    height?: number;
    radius?: number;
    fill?: Color;
}

export interface Color {
    r: number;
    g: number;
    b: number;
}