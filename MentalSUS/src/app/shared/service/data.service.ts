import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs : AngularFirestore) { }

  addMedico(medico: any){
    medico.id = this.afs.createId();
    return this.afs.collection('Medico/').add(medico);
  }

  getMedicos(){
    return this.afs.collection('Medico/').snapshotChanges();
  }

  atualizarMedico(medico: any){
    return this.afs.doc("Medico/" + medico.id).update(medico);
  }

  deletarMedico (id : any){
    return this.afs.doc("Medico/" + id).delete();
  }

  getMedicoById(id: any){
    return this.afs.doc('Medico/' + id).valueChanges();
  }

  addPaciente(paciente: any){
    paciente.paciente_id = this.afs.createId();
    return this.afs.collection('Paciente/').add(paciente);
  }

  getPacientes(){
    return this.afs.collection('Medico/').snapshotChanges();
  }

}
