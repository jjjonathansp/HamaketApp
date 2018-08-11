import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import 'firebase/storage';
import { LoginModel } from "../../shared/loginModel";
import { UsuarioModel } from "../../shared/usuarioModel";

@Injectable()
export class FirebaseService {

  private snapshotChangesSubscription: any;
  constructor(public afs: AngularFirestore){}

  getTasks(){
    return new Promise<any>((resolve, reject) => {
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

  getLoggedUser(){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
     resolve(currentUser);
      
    });
  }
  getUsuario(){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people').doc(currentUser.uid).collection('USUARIOS', ref => ref.where('email', '==', currentUser.email)).snapshotChanges().subscribe(snapshots => {
        resolve(snapshots);
      });
      
    });
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

//USUARIO

  saveUsuario(usuario:UsuarioModel) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people').doc(currentUser.uid).collection('USUARIOS').add({
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
      this.afs.collection('people').doc(currentUser.uid).collection('USUARIOS').doc(usuario.key).set(
        {
          nombreUsuario:usuario.nombreUsuario,
          saldo:usuario.saldo,
          imagen:usuario.imagen,
          email:usuario.email
        })
      .then(
        res => {resolve(usuario);},
        err => reject(err)
      )
    })
  }


}
