import { IconName } from "@fortawesome/fontawesome-svg-core";
import { EditorService, SVG } from "../editor.service";
import { Tool } from "./tool";

export class PenTool extends Tool{
    icon: IconName = 'pen-fancy';

    constructor(editor: EditorService) {
        super(editor);

        console.log('Pen Tool', this.selected);
        
    }

    click(svg: SVG, event: MouseEvent) {

    }
}