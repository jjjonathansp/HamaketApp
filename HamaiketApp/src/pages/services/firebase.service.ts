import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import 'firebase/storage';
import { UsuarioModel } from "../../shared/usuarioModel";
import { USUARIOS_TABLE, RELA_GRUPO_USUARIO_TABLE, GRUPOS_TABLE, CATEGORIAS_TABLE, PEDIDOS_TABLE } from "../../shared/constants";
import { GrupoModel } from "../../shared/grupoModel";
import { RelaUsuGrupoModel } from "../../shared/relaUsuGrupoModel";
import { CategoriaModel } from "../../shared/categoriaModel";
import { ElementoModel } from "../../shared/elementoModel";
import { PedidoModel } from "../../shared/pedidoModel";

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
      this.afs.collection(USUARIOS_TABLE, ref => ref.where('email', '==', currentUser.email)).snapshotChanges().subscribe(snapshots => {
        resolve(snapshots);
      });
      
    });
  }

  saveUsuario(usuario:UsuarioModel) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection(USUARIOS_TABLE).add({
        nombreUsuario: usuario.nombreUsuario,
        saldo: usuario.saldo,
        imagen: usuario.imagen,
        email: currentUser.email
      })
      .then(
        res => {resolve(new UsuarioModel(res.id,usuario.nombreUsuario,usuario.saldo,usuario.imagen,usuario.email,false));},
        err => reject(err)
      )
    })
  }

  updateUsuario(usuario){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection(USUARIOS_TABLE).doc(usuario.key).set(
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

  getUsuariosGrupo(listaClaves:Array<RelaUsuGrupoModel>){
    let usuarios:Array<UsuarioModel> = [];
    console.log("getUsuariosGrupo");
    return new Promise<any>((resolve) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection(USUARIOS_TABLE).snapshotChanges().subscribe(snapshots => {
        
        if(snapshots!=null && snapshots.length>0) {
          for(let i=0;i<snapshots.length;i++) {
              
            let relacion = UsuarioModel.fromFBFull(snapshots[i]);
            let indexRela = this.relacionContieneMiembro(listaClaves,relacion.key);
            if(indexRela != null){
              relacion.admin = listaClaves[indexRela].admin;
              usuarios.push(relacion);
            }
          }
        }
        
        resolve(usuarios);
      });
      
    });
  }

  relacionContieneMiembro(relaciones:Array<RelaUsuGrupoModel>, clave: String): number {
    for(let i=0;i<relaciones.length;i++) {
      if(relaciones[i].usuario == clave) {
        return i;
      }
    }
    return null;
  }

  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  // RELACION GRUPO Y USUARIO--------------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------

  getRelaGruposUsuarioByGroup(groupId:String){
    return new Promise<any>((resolve) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection(RELA_GRUPO_USUARIO_TABLE, ref => ref.where('grupo', '==', groupId)).snapshotChanges().subscribe(snapshots => {
        let relaciones:Array<RelaUsuGrupoModel> = [];
        if(snapshots && snapshots.length>0) {
          
          for(let i=0;i<snapshots.length;i++) {
            let relacion = RelaUsuGrupoModel.fromFB(snapshots[i]);
            relaciones.push(relacion);
          }
        }
        
        resolve(relaciones);
      });
      
    });
  }

  getRelaGruposUsuario(userId:String){
    return new Promise<any>((resolve) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection(RELA_GRUPO_USUARIO_TABLE, ref => ref.where('usuario', '==', userId)).snapshotChanges().subscribe(snapshots => {
        let relaciones:Array<RelaUsuGrupoModel> = [];
        if(snapshots && snapshots.length>0) {
          
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
      this.afs.collection(RELA_GRUPO_USUARIO_TABLE).add({
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
      this.afs.collection(RELA_GRUPO_USUARIO_TABLE).doc(relaGrupousuario.key).set(
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
      this.afs.collection(GRUPOS_TABLE).add({
        nombre: grupo.nombre,
        saldo: grupo.saldo,
        clave: grupo.clave ? this.codificar(grupo.clave.toString()): ""
      })
      .then(
        res => {resolve(new GrupoModel(res.id,grupo.nombre,grupo.saldo,grupo.clave,false));},
        err => reject(err)
      )
    })
  }

  updateGrupo(grupo){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection(GRUPOS_TABLE).doc(grupo.key).set(
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
  getGruposUsuario(listaClaves:Array<RelaUsuGrupoModel>){
    let grupos:Array<GrupoModel> = [];
    return new Promise<any>((resolve) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection(GRUPOS_TABLE).snapshotChanges().subscribe(snapshots => {
        
        if(snapshots) {
          for(let i=0;i<snapshots.length;i++) {
            let relacion = GrupoModel.fromFB(snapshots[i]);
            relacion.clave = this.descodificar(relacion.clave.toString());
            let indexRela = this.grupoContieneId(listaClaves,relacion.key);
            if(indexRela != null){
              if(listaClaves[indexRela].admin){
                relacion.admin = true;
              }
              grupos.push(relacion);
            }
          }
        }
        
        resolve(grupos);
      });
      
    });
  }

  grupoContieneId(relaciones:Array<RelaUsuGrupoModel>, clave: String): number {
    
    for(let i=0;i<relaciones.length;i++) {
      if(relaciones[i].grupo == clave) {
        return i;
      }
    }
    return null;
  }

  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  //CATEGORIA ---------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  
  /*addCategoria(categoria:CategoriaModel) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection(CATEGORIAS_TABLE).add({
        nombre: categoria.nombre,
        imagen: categoria.imagen
      })
      .then(
        res => {resolve(new CategoriaModel(res.id,categoria.nombre,categoria.imagen));},
        err => reject(err)
      )
    })
  }*/

  getCategorias(){
    let categorias:Array<CategoriaModel> = [];
    return new Promise<any>((resolve) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection(CATEGORIAS_TABLE,ref => ref.orderBy('nombre', 'asc')).snapshotChanges().subscribe(snapshots => {
        
        if(snapshots!=null && snapshots.length>0) {
          
          for(let i=0;i<snapshots.length;i++) {
            let relacion = CategoriaModel.fromFB(snapshots[i]);
            categorias.push(relacion);
          }
        }
        
        resolve(categorias);
      });
      
    });
  }

  
 
  //--------------------------------------------------------------------------------------------------------------------------------------------------------
 //ELEMENTO ---------------------------------------------------------------------------------------------------------------------------
 //--------------------------------------------------------------------------------------------------------------------------------------------------------
 getSubCategoriaElements(categoriaCollection:string, subcategoriaCollection:string){
  let elementos:Array<ElementoModel> = [];
  console.log("categoriaCollection:"+categoriaCollection);
  console.log("subcategoriaCollection:"+subcategoriaCollection);
  return new Promise<any>((resolve) => {
    let currentUser = firebase.auth().currentUser;
    this.afs.collection(CATEGORIAS_TABLE).doc(categoriaCollection).collection(subcategoriaCollection,ref => ref.orderBy('nombre', 'asc')).snapshotChanges().subscribe(snapshots => {
      
      if(snapshots!=null && snapshots.length>0) {
        
        for(let i=0;i<snapshots.length;i++) {
          let relacion = ElementoModel.fromFB(snapshots[i]);
          elementos.push(relacion);
        }
      }
      
      resolve(elementos);
    });
    
  });
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------
//PEDIDO ---------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------
getPedidosActivosDia(dd:Number,mm:Number,yyyy:Number, grupo:String){
  let pedidos:Array<PedidoModel> = [];
  return new Promise<any>((resolve) => {
    let currentUser = firebase.auth().currentUser;
    this.afs.collection(PEDIDOS_TABLE,ref => ref.where('grupo', '==',grupo).where('activo', '==',true).where('dd', '==',dd).where('mm','==',mm).where('yyyy','==',yyyy)).snapshotChanges().subscribe(snapshots => {
      
      if(snapshots!=null && snapshots.length>0) {
        
        for(let i=0;i<snapshots.length;i++) {
          let relacion = PedidoModel.fromFB(snapshots[i]);
          pedidos.push(relacion);
        }
      }
      
      resolve(pedidos);
    });
    
  });
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
