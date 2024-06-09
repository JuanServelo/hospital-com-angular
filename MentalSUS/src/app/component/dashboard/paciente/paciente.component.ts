import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../../shared/service/data.service';
import { AddPacienteComponent } from './add-paciente/add-paciente.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Paciente } from '../../../shared/model/patient';
import { Medico } from '../../../shared/model/medico';
import { DeletePacienteComponent } from './delete-paciente/delete-paciente.component';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.css'
})
export class PacienteComponent{

  pacienteArray: Paciente[] = [];
  medicos : Medico[] = [];
  displayedColumns: string[] = ['nome', 'telefone', 'medico', 'genero', 'actions'];
  dataSource!: MatTableDataSource<Paciente>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private dataApi: DataService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getPacientes();
  }

  addPaciente() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Adicionar Paciente',
      buttonName: 'Registrar'
    };
    const dialogRef = this.dialog.open(AddPacienteComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data){
        this.dataApi.addPaciente(data);
        this.openSnackBar('Paciente adicionado com sucesso!', 'Fechar');
      }
    });
  }

  getPacientes() {
    this.dataApi.getPacientes().subscribe(res => {
      this.pacienteArray = res.map((e : any) => {
        const data = e.payload.doc.data();
        data.paciente_id = e.payload.doc.id;
        return data;
      });
    });

    this.dataSource = new MatTableDataSource(this.pacienteArray);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getMedicos(){
    this.dataApi.getMedicos().subscribe(res => {
      this.medicos = res.map((e : any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      });
    });
  }

  getNomeMedico(id: any) : string{
    let nomeMedico = '';
    this.medicos.forEach(medico => {
      if(medico.id == id){
        nomeMedico = medico.nome;
      }
    });
    return nomeMedico;
  }

  deletarPaciente( row : any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Deletar Paciente',
      nomePaciente : row.nome
    };
    const dialogRef = this.dialog.open(DeletePacienteComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data){
        this.dataApi.deletarPaciente(row.id);
        this.openSnackBar('Paciente deletado com sucesso!', 'Fechar');
      }
    });
  }

  atualizarPaciente(row : any) {
    if(row.id == null || row.nome == null){
      return;
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.data.title = 'Editar Paciente';
    dialogConfig.data.buttonName = 'Atualizar';
    dialogConfig.data.dataNascimento = row.dataNascimento.toDate();
    
    const dialogRef = this.dialog.open(AddPacienteComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data){
        this.dataApi.atualizarPaciente(data);
        this.openSnackBar('Atualização realizada com sucesso!', 'Fechar');
      }
    });
  }

  vizualizarPaciente(row : any){
    window.open('/dashboard/paciente/'+row.id, '_blank');
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
