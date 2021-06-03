import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },{
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModeule)
    },{
        path: 'editor',
        loadChildren: () => import('./editor/editor.module').then(m => m.EditorPageModeule)
    },{
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
