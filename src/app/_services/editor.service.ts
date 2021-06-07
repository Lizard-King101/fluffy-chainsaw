import { Injectable } from "@angular/core";
import { Group } from "../editor/objects/group.object";
import { Path } from "../editor/objects/path.object";
import { Point } from "../editor/objects/point.object";
import { Shape } from "../editor/objects/shape.object";
import { SVG } from "../editor/objects/svg.object";
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

    settings: any = {
        snapDistance: 5
    }

    keysPressed: KeysPressed = {};

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
            let svg = new SVG(this, {
                width,
                height,
                pos: new Point((this.viewPort.clientWidth / 2) - (width / 2), (this.viewPort.clientHeight / 2) - (height / 2))
            })

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
        this.tools.forEach((t) => {
            t.reset();
        })
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

    toCanvasPoint(x: number, y: number): Point;
    toCanvasPoint(point: Point): Point;
    toCanvasPoint(xOrPoint: Point|number, y?: number): Point {
        let point: Point;
        if(y != null) {
            let x = xOrPoint;
            if(typeof x == 'number' && typeof y == 'number') {
                point = new Point(x,y);
            } else {
                throw new Error('Mis match of x y types');
            }
        } else {
            if(xOrPoint instanceof Point) {
                point = xOrPoint;
            } else {
                throw new Error('Mis match type or missing argument');
            }
        }
        if(this.viewPort && this.selectedSVG) {
            let canvas: HTMLElement = <HTMLElement>this.viewPort.firstChild
            let rect = canvas.getBoundingClientRect();
            let p = new Point(
                +((point.x - rect.left) / this.selectedSVG.zoom).toFixed(2),
                +((point.y - rect.top)  / this.selectedSVG.zoom).toFixed(2)
            );
            return p;
        }
        return point;
    }

    toViewportPoint(x: number, y: number): Point;
    toViewportPoint(point: Point): Point;
    toViewportPoint(xOrPoint: Point|number, y?: number): Point {
        let point: Point;
        if(y != null) {
            let x = xOrPoint;
            if(typeof x == 'number' && typeof y == 'number') {
                point = new Point(x,y);
            } else {
                throw new Error('Mis match of x y types');
            }
        } else {
            if(xOrPoint instanceof Point) {
                point = xOrPoint;
            } else {
                throw new Error('Mis match type or missing argument');
            }
        }
        if(this.viewPort) {
            return point.subtract(this.viewPort.offsetLeft, this.viewPort.offsetTop);
        } else return point;
    }

    elementIsPath(element: any): boolean {
        return element instanceof Path
    }

    toolType() {

    }

    findElement(id: string): Path | Shape | Group | false {
        if(this.selectedSVG) {
            for(let element of this.selectedSVG.elements) {
                if(element.id == id) {
                    return element;
                }
            }
            for(let element of this.selectedSVG.tempElements) {
                if(element.id == id) {
                    return element;
                }
            }
            return false;
        } else {
            return false;
        }
    }

    removeElement(id: string) {
        if(this.selectedSVG) {
            for(let i = 0; i < this.selectedSVG.elements.length; i++) {
                if(this.selectedSVG.elements[i].id == id) {
                    this.selectedSVG.elements.splice(i, 1);
                }
            }
            for(let i = 0; i < this.selectedSVG.tempElements.length; i++) {
                if(this.selectedSVG.tempElements[i].id == id) {
                    this.selectedSVG.tempElements.splice(i, 1);
                }
            }
        }
    }

    get ID() {
        return Math.random().toString(36).substr(2, 9);
    }
}

export interface ElementAttribute {
    label: string;
    name: string;
    input: 'range' | 'number' | 'text' | 'color';
    output: string;
    min?: number;
    max?: number;
}

export interface Color {
    r: number;
    g: number;
    b: number;
}

interface KeysPressed {
    [key:string]: string;
}