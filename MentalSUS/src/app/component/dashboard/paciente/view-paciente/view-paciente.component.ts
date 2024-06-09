import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../../shared/service/data.service';

@Component({
  selector: 'app-view-paciente',
  templateUrl: './view-paciente.component.html',
  styleUrl: './view-paciente.component.css'
})
export class ViewPacienteComponent {

  pacienteId !: any;
  pacienteObj !: any;

  constructor(
    private router: ActivatedRoute,
    private dataApi: DataService
  ) { 
    this.pacienteId = this.router.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getPacienteByID(this.pacienteId);
  }

  getPacienteByID(id: any) {
    this.dataApi.getPacienteByID(id).subscribe(res => {
      this.pacienteObj = res;
    });
  }
}
