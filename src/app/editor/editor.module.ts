import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { Components } from "../_components/components.module";
import { EditorPage } from "./editor.page";

const Routes: Routes = [
    {
        path: '',
        component: EditorPage
    }
];

@NgModule({
    entryComponents: [EditorPage],
    declarations: [EditorPage],
    imports: [
        CommonModule,
        FormsModule,
        FontAwesomeModule,
        Components,
        RouterModule.forChild(Routes)
    ]
})
export class EditorPageModeule { }