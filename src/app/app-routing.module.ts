import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarsComponent } from './components/cars/cars.component';


const routes: Routes = [

  { path:"car", component:CarsComponent },
  { path:"cars/:id", component:CarsComponent },
 //RUTA 404
 { path:'**', pathMatch: 'full', redirectTo: 'car' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
