import { IconName } from "@fortawesome/fontawesome-common-types";
import { EditorService, SVG } from "../../editor.service";
import { Tool } from "../tool";

export class Elipse extends Tool {
    icon: IconName = 'circle';
    parentTool: Tool

    constructor(editor: EditorService, parentTool: Tool) {
        super(editor);
        this.parentTool = parentTool;
        
    }

    onselect() {
        this.parentTool.showChildren = false;
        this.parentTool.slectedChild = this;
        this.parentTool.deselectOtherChildren(this);
        return true;
    }

    click(event: MouseEvent) {
        console.log('ELIPSE TOOL');
        
    }
}