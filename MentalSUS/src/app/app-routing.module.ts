import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicoComponent } from './component/dashboard/medico/medico.component';
import { PacienteComponent } from './component/dashboard/paciente/paciente.component';
import { ViewMedicoComponent } from './component/dashboard/medico/view-medico/view-medico.component';
import { ViewPacienteComponent } from './component/dashboard/paciente/view-paciente/view-paciente.component';

const routes: Routes = [
  {path: 'dashboard', children: [
    {path: '', redirectTo: 'paciente', pathMatch: 'full'},
    {path: 'paciente', component: PacienteComponent},
    {path: 'medico', component: MedicoComponent},
    {path: 'medico/:id', component: ViewMedicoComponent},
    {path: 'paciente/:id', component: ViewPacienteComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
