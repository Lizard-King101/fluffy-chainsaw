import { EditorService, ElementAttribute } from "src/app/_services/editor.service";
import { Line } from "./line.object";
import { Point } from "./point.object";

export class Path {
    id: string;
    lines: Line[] = [];
    closed: boolean = false;

    settings: {[key:string]: any} = {
        stroke_width: 5,
        fill: null,
        stroke: null,
        line_cap: null,
        line_join: null
    };

    attributes: ElementAttribute[] = [
        {
            label: 'Stroke Width',
            name: 'stroke-width',
            input: 'range',
            output: 'stroke_width',
            min: 0,
            max: 30
        },
        {
            label: 'Stroke Color',
            name: 'stroke',
            input: 'color',
            output: 'stroke',
        },
        {
            label: 'Fill Color',
            name: 'fill',
            input: 'color',
            output: 'fill',
        },
        {
            label: 'Line Caps',
            name: 'stroke-linecap',
            input: 'select',
            output: 'line_cap',
            options: [
                {
                    label: 'Butt',
                    value: 'butt'
                },
                {
                    label: 'Round',
                    value: 'round',
                },
                {
                    label: 'Square',
                    value: 'square'
                }
            ]
        },
        {
            label: 'Line Joint',
            name: 'stroke-linejoin',
            input: 'select',
            output: 'line_join',
            options: [
                // {
                //     label: 'Crop',
                //     value: 'crop'
                // },
                // {
                //     label: 'Arcs',
                //     value: 'arcs',
                // },
                {
                    label: 'Miter',
                    value: 'miter'
                },
                {
                    label: 'Bevel',
                    value: 'bevel'
                },
                {
                    label: 'Round',
                    value: 'round'
                }
            ]
        }
    ];

    get raw() {
        let rawPath = "M ";
        for(let li = 0; li < this.lines.length; li++) {
            let l = this.lines[li];
            switch(l.type) {
                case "line":
                    for(let pi = 0; pi < l.points.length; pi++) {
                        let p = l.points[pi];
                        if(li == 0) {
                            if(pi == 0) {
                                rawPath += ` ${p.x} ${p.y}`;
                            } else {
                                rawPath += ` L ${p.x} ${p.y}`;
                            }
                        } else {
                            if(pi > 0) {
                                rawPath += ` L ${p.x} ${p.y}`;
                            }
                        }
                    }
                    break;
                case "bezier":
                    break;
            }
        }
        if(this.closed) rawPath += ' Z';
        return rawPath;
    }

    constructor(private _editor: EditorService) {
        this.id = this._editor.ID;
    }

    moveElement(delta: Point) {
        this.lines.forEach((l) => {
            l.points.forEach((p) => {
                p.addTo(delta);
            })
        })
    }

    destroy() {
        this.lines = [];
        this._editor.removeElement(this.id);
    }

    
}