import { Injectable } from "@angular/core";
import { Tool } from "./tools/tool";

import { Tools } from "./tools/tools";

@Injectable()
export class EditorService {
    tools: Tool[] = [];
    selectedTool?: Tool;

    svgs: SVG[] = [];
    selectedSVG?: SVG;

    editingElement?: Path | Shape | Group;

    private viewPort?: HTMLElement;

    constructor() {
        Tools.forEach((tool) => {
            let t = new tool(this);
            this.tools.push(t);
        })
    }

    deselectOther(tool: Tool) {
        this.tools.forEach((t) => {
            if(t != tool) {
                t.deselect();
            }
            t.showChildren = false;
        })
    }

    newSVG(width: number, height: number) {
        if(this.viewPort != undefined) {
            let id = this.ID;
            let svg: SVG = {
                id: id + '',
                name: 'new_svg_' + id,
                elements: [],
                tempElements: [],
                width,
                height,
                zoom: 1,
                pos: {
                    x: (this.viewPort.clientWidth / 2) - (width / 2),
                    y: (this.viewPort.clientHeight / 2) - (height / 2)
                }
            }

            this.svgs.push(svg);
            this.selectedSVG = svg;
            console.log(this.svgs);
            
        }
    }

    selectSVG(id: string) {
        for(let i = 0; i < this.svgs.length; i++) {
            let s = this.svgs[i];
            if(s.id == id) {
                this.selectedSVG = s;
                continue;
            }
        }
    }

    closeSVG(id: string) {
        console.log('Close: ', id);
        
        for(let i = 0; i < this.svgs.length; i++) {
            let s = this.svgs[i];
            if(s.id == id) {
                let chooseAnother = this.selectedSVG == s;
                console.log('Choose: ', chooseAnother);
                
                if(this.svgs.length - 1 <= 0) {
                    this.svgs = [];
                    this.selectedSVG = undefined
                } else {
                    this.svgs.splice(i, 1);
                    if(chooseAnother) {
                        this.selectedSVG = this.svgs[i] ? this.svgs[i] : this.svgs[i - 1];
                    }
                }
                console.log(this.svgs);
                
                continue;
            }
        }
    }

    setViewPort(viewPortElement: HTMLElement) {
        this.viewPort = viewPortElement;
    }

    toCanvasPoint(point: Point) : Point {
        if(this.viewPort && this.selectedSVG) {
            let canvas: HTMLElement = <HTMLElement>this.viewPort.firstChild
            let rect = canvas.getBoundingClientRect();
            let p:Point = {
                x: +((point.x - rect.left) / this.selectedSVG.zoom).toFixed(2) ,
                y: +((point.y - rect.top) / this.selectedSVG.zoom).toFixed(2) 
            }
            return p;
        }
        return {
            x: 0,
            y: 0
        };
        
    }

    get ID() {
        return Math.random().toString(36).substr(2, 9);
    }
}

export interface SVG {
    id: string;
    name?: string;
    elements: (Path | Shape | Group)[];
    tempElements: (Path | Shape)[];
    width: number;
    height: number;
    zoom: number;
    pos: Point;
}

export interface Group {
    id: string;
    elements: (Path | Shape | Group)[]
}

export interface Path {
    id: string;
    lines: Line[];
}

export interface Line {
    id: string;
    type: 'line' | 'bezier';
    points: Point[];
}


export interface Shape {
    position: Point;
    type: 'circle' | 'square';
    width?: number;
    height?: number;
    radius?: number;
    fill?: Color;
}

export interface Point {
    x: number;
    y: number;
}

export interface Color {
    r: number;
    g: number;
    b: number;
}