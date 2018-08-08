import { Injectable } from '@angular/core';

import firebase from 'firebase';
import { GrupoModel } from '../../shared/grupoModel';

/*
  Generated class for the FirebaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseServiceProvider {
  
  db = firebase.firestore();
  grupos:Array<GrupoModel> = [];  
  constructor() {
    
  }

  getGrupos() {
   this.db.collection("GRUPO").onSnapshot((querySnapshot) => {

      this.grupos = [];
      let iconVerified = '';
      querySnapshot.forEach((grupo) => {
        this.grupos.push({
          id: `${grupo.id}`,
          nombre: grupo.data().nombre,
          bote: grupo.data().bote 
        });
      });
      return this.grupos;
    });
  }

  addGrupo(grupo:GrupoModel) {
    this.db.collection("GRUPO").add(grupo)
    .then(function(docRef) {
      return true;
    })
    .catch(function(error){
      return false;
    });
  }

  removeTasks(id) {
      this.db.collection("GRUPO").doc(id).delete().then(function() {
        return true;
      }).catch(function(error) {
        return false;
      });
  }

}
