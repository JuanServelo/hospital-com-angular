import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddMedicoComponent } from '../../medico/add-medico/add-medico.component';
import { DataService } from '../../../../shared/service/data.service';
import { get } from 'http';

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

  medicosArray : any[] = [];
  
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef : MatDialogRef<AddMedicoComponent>,
    private dataApi : DataService
  ) { 
    this.title = data.title;
    this.buttonName = data.buttonName;
    this.form = this.fb.group({
      paciente_id: [this.paciente_id, []],
      paciente_nome: [this.paciente_nome, [Validators.required, Validators.minLength(2)]],
      medico_id: [this.medico_id, [Validators.required]],
      medico_nome: [this.medico_nome, []],
      telefone: [this.telefone, [Validators.required]],
      genero: [this.genero, [Validators.required]],
      dataAgendamento: [this.dataAgendamento, [Validators.required]],
      dataNascimento: [this.dataNascimento, [Validators.required]],
      prescricao: [this.prescricao, [Validators.required]]
    });
  }

  ngOnInit() : void {
    this.getMedicos();
  }

  getMedicos(){
    this.dataApi.getMedicos().subscribe(res => {
      this.medicosArray = res.map((e : any) => {
        const data = e.payload.doc.data();
        const medico = {
          medico_id : e.payload.doc.id,
          medico_nome : data.nome
        }
        return medico;
      });
      console.log(this.medicosArray);
    });
  }

  registrarPaciente() {
    this.form.value.medico_nome = this.medicosArray.find(medico => medico.medico_id == this.form.value.medico_id).medico_nome;
    this.dialogRef.close(this.form.value);
  }

  cancelar() {
    this.dialogRef.close();
  }
}
