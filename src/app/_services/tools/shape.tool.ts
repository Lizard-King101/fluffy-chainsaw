import { IconName } from "@fortawesome/fontawesome-common-types";
import { EditorService } from "../editor.service";
import { Tool } from "./tool";

import { Square } from './shapes/square.tool';
import { Elipse } from './shapes/elipse.tool';

const shapeTools = [
    Square,
    Elipse
]

export class Shapes extends Tool {
    icon: IconName = 'shapes';

    children: Tool[];

    constructor(editor: EditorService) {
        super(editor);

        let tools: Tool[] = [];
        shapeTools.forEach((t) => {
            let tool = new t(editor, this);
            tools.push(tool);
        })
        this.children = tools;
    }

    onselect() {
        if(this.slectedChild) {
            return true;
        }
        this.showChildren = true;
        return false;
    }

    click(event: MouseEvent) {
        this.slectedChild?.click(event);
    }
}