import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import 'firebase/storage';
import { UsuarioModel } from "../../shared/usuarioModel";
import { USUARIOS_TABLE, RELA_GRUPO_USUARIO_TABLE, GRUPOS_TABLE } from "../../shared/constants";
import { GrupoModel } from "../../shared/grupoModel";
import { RelaUsuGrupoModel } from "../../shared/relaUsuGrupoModel";

@Injectable()
export class FirebaseService {
  

  private snapshotChangesSubscription: any;
  constructor(public afs: AngularFirestore){}

  getTasks(){
    return new Promise<any>((resolve) => {
      let currentUser = firebase.auth().currentUser;
      this.snapshotChangesSubscription = this.afs.collection('people').doc(currentUser.uid).collection('tasks').snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots);
      })
    });
  }

  unsubscribeOnLogOut(){
    //remember to unsubscribe from the snapshotChanges
    // debugger;
    this.snapshotChangesSubscription.unsubscribe();
  }

  updateTask(taskKey, value){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people').doc(currentUser.uid).collection('tasks').doc(taskKey).set(value)
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  deleteTask(taskKey){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people').doc(currentUser.uid).collection('tasks').doc(taskKey).delete()
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  

  

  createTask(value){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people').doc(currentUser.uid).collection('tasks').add({
        title: value.title,
        description: value.description,
        image: value.image
      })
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux:any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  };

  uploadImage(imageURI, randomId){
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('image').child(randomId);
      this.encodeImageUri(imageURI, function(image64){
        imageRef.putString(image64, 'data_url')
        .then(snapshot => {
          snapshot.ref.getDownloadURL()
          .then(res => resolve(res))
        }, err => {
          reject(err);
        })
      })
    })
  }

  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  //USUARIO------------------------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------

  getLoggedUser(){
    return new Promise<any>((resolve) => {
      let currentUser = firebase.auth().currentUser;
    resolve(currentUser);
      
    });
  }
  getUsuario(){
    return new Promise<any>((resolve) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people').doc(currentUser.uid).collection(USUARIOS_TABLE, ref => ref.where('email', '==', currentUser.email)).snapshotChanges().subscribe(snapshots => {
        resolve(snapshots);
      });
      
    });
  }

  saveUsuario(usuario:UsuarioModel) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people').doc(currentUser.uid).collection(USUARIOS_TABLE).add({
        nombreUsuario: usuario.nombreUsuario,
        saldo: usuario.saldo,
        imagen: usuario.imagen,
        email: currentUser.email
      })
      .then(
        res => {resolve(new UsuarioModel(res.id,usuario.nombreUsuario,usuario.saldo,usuario.imagen,usuario.email));},
        err => reject(err)
      )
    })
  }

  updateUsuario(usuario){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people').doc(currentUser.uid).collection(USUARIOS_TABLE).doc(usuario.key).set(
        {
          nombreUsuario:usuario.nombreUsuario,
          saldo:usuario.saldo,
          imagen:usuario.imagen,
          email:usuario.email
        })
      .then(
        () => { resolve(usuario); },
        err => reject(err)
      )
    })
  }

  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  // RELACION GRUPO Y USUARIO--------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  getRelaGruposUsuario(userId:String){
    return new Promise<any>((resolve) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people').doc(currentUser.uid).collection(RELA_GRUPO_USUARIO_TABLE, ref => ref.where('usuario', '==', userId)).snapshotChanges().subscribe(snapshots => {
        let relaciones:Array<RelaUsuGrupoModel> = [];
        if(snapshots) {
          for(let i=0;i<snapshots.length;i++) {
            let relacion = RelaUsuGrupoModel.fromFB(snapshots[i]);
            relaciones.push(relacion);
          }
        }
        
        resolve(relaciones);
      });
      
    });
  }

  addRelaGrupoUsuario(relaGrupousuario:RelaUsuGrupoModel) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people').doc(currentUser.uid).collection(RELA_GRUPO_USUARIO_TABLE).add({
        grupo: relaGrupousuario.grupo,
        usuario: relaGrupousuario.usuario,
        admin: relaGrupousuario.admin
      })
      .then(
        res => {resolve(new RelaUsuGrupoModel(res.id,relaGrupousuario.grupo,relaGrupousuario.usuario,relaGrupousuario.admin));},
        err => reject(err)
      )
    })
  }

  updateRelaGrupoUsuario(relaGrupousuario){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people').doc(currentUser.uid).collection(RELA_GRUPO_USUARIO_TABLE).doc(relaGrupousuario.key).set(
        {
          grupo: relaGrupousuario.grupo,
          usuario: relaGrupousuario.usuario,
          admin: relaGrupousuario.admin
        })
      .then(
        () => { resolve(relaGrupousuario); },
        err => reject(err)
      )
    })
  }

  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  //GRUPO ---------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  addGrupo(grupo:GrupoModel) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people').doc(currentUser.uid).collection(GRUPOS_TABLE).add({
        nombre: grupo.nombre,
        saldo: grupo.saldo,
        clave: grupo.clave ? this.codificar(grupo.clave): ""
      })
      .then(
        res => {resolve(new GrupoModel(res.id,grupo.nombre,grupo.saldo,grupo.clave));},
        err => reject(err)
      )
    })
  }

  updateGrupo(grupo){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people').doc(currentUser.uid).collection(GRUPOS_TABLE).doc(grupo.key).set(
        {
          nombre: grupo.nombre,
          saldo: grupo.saldo,
          clave: grupo.clave ? this.codificar(grupo.clave): ""
        })
      .then(
        () => { resolve(grupo); },
        err => reject(err)
      )
    })
  }

  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  //CODIFICAR
  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  codificar(valor:string) {
    return btoa(valor.toString())
  }

  descodificar(valor:string) {
    return atob(valor);
  }

}
