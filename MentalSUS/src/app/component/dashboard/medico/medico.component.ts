import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddMedicoComponent } from './add-medico/add-medico.component';
import { DataService } from '../../../shared/service/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Medico } from '../../../shared/model/medico';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteMedicoComponent } from './delete-medico/delete-medico.component';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrl: './medico.component.css'
})
export class MedicoComponent {

  medicosArray: Medico[] = [];
  displayedColumns: string[] = ['nome', 'telefone', 'email', 'especialidade', 'crm', 'actions'];
  dataSource!: MatTableDataSource<Medico>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( 
    public dialog: MatDialog,
    private dataApi: DataService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void{
    this.getMedicos();
  }

  addMedico() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Adicionar Médico',
      buttonName: 'Registrar'
    };
    const dialogRef = this.dialog.open(AddMedicoComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data){
        this.dataApi.addMedico(data);
        this.openSnackBar('Médico adicionado com sucesso!', 'Fechar');
      }
    });
  }

  deletarMedico( row : any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Deletar Médico',
      nomeMedico : row.nome
    };
    const dialogRef = this.dialog.open(DeleteMedicoComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data){
        this.dataApi.deletarMedico(row.id);
        this.openSnackBar('Médico deletado com sucesso!', 'Fechar');
      }
    });
  }

  atualizarMedico(row : any) {
    if(row.id == null || row.nome == null){
      return;
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.data.title = 'Editar Médico';
    dialogConfig.data.buttonName = 'Atualizar';
    dialogConfig.data.dataNascimento = row.dataNascimento.toDate();
    
    const dialogRef = this.dialog.open(AddMedicoComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data){
        this.dataApi.atualizarMedico(data);
        this.openSnackBar('Atualização realizada com sucesso!', 'Fechar');
      }
    });
  }

  getMedicos(){
    this.dataApi.getMedicos().subscribe(res => {
      this.medicosArray = res.map((e : any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      });

      this.dataSource = new MatTableDataSource(this.medicosArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
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

  vizualizarMedico(row : any){
    window.open('/dashboard/medico/'+row.id, '_blank');
  }
}
