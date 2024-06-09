import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../../shared/service/data.service';

@Component({
  selector: 'app-view-medico',
  templateUrl: './view-medico.component.html',
  styleUrl: './view-medico.component.css'
})
export class ViewMedicoComponent {

  id !: any;
  medicoObj !: any;

  constructor(
    private router: ActivatedRoute,
    private dataApi: DataService
  ) { 
    this.id = this.router.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getMedicoById(this.id);
  }

  getMedicoById(id: any) {
    this.dataApi.getMedicoById(id).subscribe(res => {
      this.medicoObj = res;
    });
  }
}
