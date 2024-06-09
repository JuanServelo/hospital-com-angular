import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-medico',
  templateUrl: './delete-medico.component.html',
  styleUrl: './delete-medico.component.css'
})
export class DeleteMedicoComponent {

  nomeMedico !: string;
  title !: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    public dialogRef: MatDialogRef<DeleteMedicoComponent>
  ) { 
    this.nomeMedico = data.nomeMedico;
    this.title = data.title;
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  deletar(): void {
    console.log('Médico deletado');
    this.dialogRef.close(true);
  }

}
