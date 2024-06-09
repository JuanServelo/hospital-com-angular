import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../../shared/service/data.service';
import { Paciente } from '../../../../shared/model/patient';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddPacienteComponent } from '../../paciente/add-paciente/add-paciente.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Medico } from '../../../../shared/model/medico';

@Component({
  selector: 'app-view-medico',
  templateUrl: './view-medico.component.html',
  styleUrl: './view-medico.component.css'
})
export class ViewMedicoComponent {

  id !: any;
  medicoObj !: any;
  pacientes: Paciente[] = [];
  medicos: Medico[] = [];

  displayedColumns: string[] = ['nome', 'telefone', 'genero','pescricao', 'actions'];
  dataSource!: MatTableDataSource<Paciente>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: ActivatedRoute,
    private dataApi: DataService,
    private dialog: MatDialog,    
    private _snackBar: MatSnackBar
  ) { 
    this.id = this.router.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getMedicoById(this.id);
    this.getPacienteMedicos();
  }

  getMedicoById(id: any) {
    this.dataApi.getMedicoById(id).subscribe(res => {
      this.medicoObj = res;
    });
  }

  getPacienteMedicos(){
    this.dataApi.getPacientes().subscribe(res => {
      this.pacientes = res.map((e : any) => {
        const data = e.payload.doc.data();
        data.paciente_id = e.payload.doc.id;

        if(data.medico_id == this.id){
          return data;
        }
      });

      this.pacientes = this.pacientes.filter(item => item != undefined);
      this.dataSource = new MatTableDataSource(this.pacientes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

  getNomeMedico(id: any) : string{
    let nomeMedico = '';
    this.medicos.forEach(medico => {
      if(medico.id == id){
        nomeMedico = medico.nome;
      }
    });
    return nomeMedico;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
