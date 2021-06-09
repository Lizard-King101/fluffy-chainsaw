import { IconName } from "@fortawesome/fontawesome-svg-core";
import { EditorService } from "../editor.service";

export class Tool {
    icon: IconName = "question-circle";
    get getIcon() {
        if(this.children.length && this.slectedChild) {
            return this.slectedChild.icon;
        } else {
            return this.icon;
        }
    }
    selected: boolean = false;

    children: Tool[] = [];
    slectedChild?: Tool;
    showChildren: boolean = false;

    constructor(private editor: EditorService, parentTool?: Tool) {
    }

    select(event: MouseEvent) : void | boolean {
        if(event.button == 2) {
            event.preventDefault();
            
            if(this.children.length) {
                this.showChildren = true;
            }
            this.onselect();
            return false;
        }
        let next = this.onselect();
        if(next) {
            this.selected = true;
            this.editor.selectedTool = this;
            this.editor.deselectOther(this);
        }
    }

    onselect() : boolean {
        return true;
    }

    deselectOtherChildren(tool: Tool) {
        this.children.forEach((t: Tool) => {
            if(t != tool) {
                t.selected = false;
            }
        })
    }

    deselect() : void {
        this.selected = false;
    }

    click(event: MouseEvent) {}

    down(event: MouseEvent) {}

    up(event: MouseEvent) {}

    drag(event: MouseEvent) {}

    contextMenu(event: MouseEvent) {}

    reset(): void {}

    keyPressed(key: string): void {}

    keyReleased(key: string): void {}
}