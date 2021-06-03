import { IconName } from "@fortawesome/fontawesome-svg-core";
import { EditorService, SVG } from "../editor.service";

export class Tool {
    icon: IconName = "question-circle";
    selected: boolean = false;

    constructor(private editor: EditorService) {
    }

    select() : void {
        this.selected = true;
        this.editor.selectedTool = this;
        this.editor.deselectOther(this);
    }

    deselect() : void {
        this.selected = false;
    }

    click(svg: SVG, event: MouseEvent) {}

}