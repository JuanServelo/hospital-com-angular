import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddMedicoComponent } from '../../medico/add-medico/add-medico.component';

@Component({
  selector: 'app-add-paciente',
  templateUrl: './add-paciente.component.html',
  styleUrl: './add-paciente.component.css'
})
export class AddPacienteComponent {

  form !: FormGroup;
  title !: string;
  paciente_id !: string;
  paciente_nome !: string;
  medico_id !: string;
  medico_nome !: string;
  telefone !: string;
  genero !: string;
  dataAgendamento !: Date;
  dataNascimento !: Date;
  prescricao !: string;
  buttonName !: string;

  Medicos : any[] = [];
  
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef : MatDialogRef<AddMedicoComponent>,
  ) { 
    this.title = data.title;
    this.buttonName = data.buttonName;
    this.form = this.fb.group({
      paciente_id: this.paciente_id,
      paciente_nome: this.paciente_nome,
      medico_id: this.medico_id,
      medico_nome: this.medico_nome,
      telefone: this.telefone,
      genero: this.genero,
      dataAgendamento: this.dataAgendamento,
      dataNascimento: this.dataNascimento,
      prescricao: this.prescricao
    });
  }

  ngOnInit() : void {
  
  }

  
}
