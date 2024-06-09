import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-add-medico',
  templateUrl: './add-medico.component.html',
  styleUrl: './add-medico.component.css'
})
export class AddMedicoComponent {
  
  form !: FormGroup;
  title !: string;
  nome !: string;
  telefone !: string;
  email !: string;
  genero !: string;
  especialidade !: string;
  crm !: string;
  dataNascimento !: Date;
  especialidades = [
    { value: 'cardiologista', viewValue: 'Cardiologista' },
    { value: 'neurologista', viewValue: 'Neurologista' },
    { value: 'ortopedista', viewValue: 'Ortopedista'},
    { value: 'pediatra', viewValue: 'Pediatra'},
    { value: 'psiquiatra', viewValue: 'Psiquiatra'},
    { value: 'urologista', viewValue: 'Urologista'},
    { value: 'ginecologista', viewValue: 'Ginecologista'},
    { value: 'dermatologista', viewValue: 'Dermatologista'},
    { value: 'oftalmologista', viewValue: 'Oftalmologista'},
    { value: 'otorrinolaringologista', viewValue: 'Otorrinolaringologista'},
    { value: 'endocrinologista', viewValue: 'Endocrinologista'},
    { value: 'gastroenterologista', viewValue: 'Gastroenterologista'},
    { value: 'cirurgião', viewValue: 'Cirurgião'},
    { value: 'anestesista', viewValue: 'Anestesista'},
    { value: 'radiologista', viewValue: 'Radiologista'},
    { value: 'patologista', viewValue: 'Patologista'},
    { value: 'nefrologista', viewValue: 'Nefrologista'},
    { value: 'neonatologista', viewValue: 'Neonatologista'},
    { value: 'hematologista', viewValue: 'Hematologista'},
    { value: 'infectologista', viewValue: 'Infectologista'},
    { value: 'reumatologista', viewValue: 'Reumatologista'},
    { value: 'psicólogo', viewValue: 'Psicólogo'},
    { value: 'nutricionista', viewValue: 'Nutricionista'},
    { value: 'fisioterapeuta', viewValue: 'Fisioterapeuta'},
    { value: 'fonoaudiólogo', viewValue: 'Fonoaudiólogo'},
    { value: 'terapeuta', viewValue: 'Terapeuta'},
    { value: 'enfermeiro', viewValue: 'Enfermeiro'},
    { value: 'farmacêutico', viewValue: 'Farmacêutico'},
    { value: 'biomédico', viewValue: 'Biomédico'},
  ];
  id !: string;
  buttonName !: string;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef : MatDialogRef<AddMedicoComponent>,
  ) {

    this.title = data.title;
    this.nome = data.nome;
    this.telefone = data.telefone;
    this.email = data.email;
    this.genero = data.genero;
    this.especialidade = data.especialidade;
    this.crm = data.crm;
    this.dataNascimento = data.dataNascimento;
    this.buttonName = data.buttonName;

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.id, []],
      nome: [this.nome, [Validators.required, Validators.minLength(2)]],
      telefone: [this.telefone, [Validators.required]],
      email: [this.email, [Validators.required, Validators.email]],
      genero: [this.genero, [Validators.required]],
      especialidade: [this.especialidade, [Validators.required]],
      crm: [this.crm, [Validators.required], Validators.minLength(5), Validators.maxLength(5), Validators.pattern("^[0-9]*$")],
      dataNascimento: [this.dataNascimento, [Validators.required]],
    });
  }

  registrarMedico() {
    this.dialogRef.close(this.form.value);
  }

  cancelar() {
    this.dialogRef.close();
  }

}
