import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LaunchNewCollectionComponent } from './launch-new-collection/launch-new-collection.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'launch-collection', component: LaunchNewCollectionComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
