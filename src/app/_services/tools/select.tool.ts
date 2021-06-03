import { IconName } from "@fortawesome/fontawesome-common-types";
import { EditorService, SVG } from "../editor.service";
import { Tool } from "./tool";

export class SelectTool extends Tool {
    icon: IconName = "mouse-pointer";
    constructor(editor: EditorService) {
        super(editor);
    }

    click(svg: SVG, event: MouseEvent) {
        console.log('SELECT TOOL');
        console.log(svg, event);
        
    }
}