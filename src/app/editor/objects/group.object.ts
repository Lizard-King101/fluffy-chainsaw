import { EditorService } from "src/app/_services/editor.service";
import { Path } from "./path.object";
import { Shape } from "./shape.object";

export class Group {
    id: string;
    elements: (Path | Shape | Group)[] = [];

    constructor(private editor: EditorService) {
        this.id = this.editor.ID;
    }

}