import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { HomePage } from "./home.page";

const Routes: Routes = [
    {
        path: '',
        component: HomePage
    }
];

@NgModule({
    entryComponents: [HomePage],
    declarations: [HomePage],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(Routes)
    ]
})
export class HomePageModeule { }