import { IconName } from "@fortawesome/fontawesome-common-types";
import { EditorService } from "../../editor.service";
import { Tool } from "../tool";

export class Square extends Tool {
    icon: IconName = 'square';
    parentTool: Tool

    constructor(editor: EditorService, parentTool: Tool) {
        super(editor);
        this.parentTool = parentTool;

    }

    down() {
        console.log('Square Down');
        
    }

    onselect() {
        this.parentTool.showChildren = false;
        this.parentTool.slectedChild = this;
        this.parentTool.deselectOtherChildren(this);
        return true;
    }

    click(event: MouseEvent) {
        console.log('SQUARE TOOL');
        
    }
}