import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UpdateDataFormComponent} from './components/update-data-form/update-data-form.component';
import {ListDataComponent} from './components/list-data/list-data.component';


const routes: Routes = [
  { path: 'Listes', component: ListDataComponent },
  { path: 'Campagne/:index', component: UpdateDataFormComponent },
  { path: '', redirectTo: 'Listes', pathMatch: 'full' },
  { path: '**', redirectTo: 'Listes'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
