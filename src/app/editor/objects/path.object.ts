import { EditorService } from "src/app/_services/editor.service";
import { Line } from "./line.object";

export class Path {
    id: string;
    lines: Line[] = [];

    get raw() {
        let rawPath = "M ";
        for(let l of this.lines) {
            switch(l.type) {
                case "line":
                    
                    break;
                case "bezier":
                    break;
            }
        }
        return rawPath;
    }

    constructor(private editor: EditorService) {
        this.id = this.editor.ID;
    }
}