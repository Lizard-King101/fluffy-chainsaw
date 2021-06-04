import { IconName } from "@fortawesome/fontawesome-common-types";
import { EditorService } from "../editor.service";
import { Tool } from "./tool";

export class SelectTool extends Tool {
    icon: IconName = "mouse-pointer";
    constructor(editor: EditorService) {
        super(editor);
    }

    click(event: MouseEvent) {
        console.log('SELECT TOOL');
        
    }
}