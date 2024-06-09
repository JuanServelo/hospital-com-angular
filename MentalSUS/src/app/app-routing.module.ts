import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicoComponent } from './component/dashboard/medico/medico.component';
import { PacienteComponent } from './component/dashboard/paciente/paciente.component';
import { ViewMedicoComponent } from './component/dashboard/medico/view-medico/view-medico.component';

const routes: Routes = [
  {path: 'dashboard', children: [
    {path: '', redirectTo: 'paciente', pathMatch: 'full'},
    {path: 'paciente', component: PacienteComponent},
    {path: 'medico', component: MedicoComponent},
    {path: 'medico/:id', component: ViewMedicoComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
