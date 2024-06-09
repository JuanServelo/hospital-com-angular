import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../../src/environments/environment';
import { MaterialModule } from './material/material/material.module';
import { MedicoComponent } from './component/dashboard/medico/medico.component';
import { PacienteComponent } from './component/dashboard/paciente/paciente.component';
import { SidebarComponent } from './component/dashboard/sidebar/sidebar.component';
import { AddMedicoComponent } from './component/dashboard/medico/add-medico/add-medico.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteMedicoComponent } from './component/dashboard/medico/delete-medico/delete-medico.component';
import { ViewMedicoComponent } from './component/dashboard/medico/view-medico/view-medico.component';
import { AddPacienteComponent } from './component/dashboard/paciente/add-paciente/add-paciente.component';
import { DeletePacienteComponent } from './component/dashboard/paciente/delete-paciente/delete-paciente.component';
import { ViewPacienteComponent } from './component/dashboard/paciente/view-paciente/view-paciente.component';

@NgModule({
  declarations: [
    AppComponent,
    MedicoComponent,
    PacienteComponent,
    SidebarComponent,
    AddMedicoComponent,
    DeleteMedicoComponent,
    ViewMedicoComponent,
    AddPacienteComponent,
    DeletePacienteComponent,
    ViewPacienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
