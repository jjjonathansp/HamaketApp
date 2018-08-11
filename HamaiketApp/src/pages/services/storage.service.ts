import { Injectable } from "../../../node_modules/@angular/core";
import { Storage } from '@ionic/storage';
import { LoginModel } from "../../shared/loginModel";
import { UsuarioModel } from "../../shared/usuarioModel";

@Injectable()
export class StorageService {

  constructor(public storage: Storage){

  }

  //STORAGE
  public getLogin(){
    return new Promise((resolve,reject) =>{
      this.storage.ready().then(() =>{
        //no me interesa si devuelve algo o no... simplemente cuando la BBDD esta lista, ejecutar lo siguiente..
        
        this.storage.get("LOGIN").then(data => {
          let logModel=null;
          if(data!=undefined && data!=null){
            logModel = data;
            //Decodifica
            logModel.password = atob(logModel.password);
          }
          resolve(logModel);
        })
      })
      .catch(()=>{
        reject(new Error("La BBDD no funciona!"));
      })
    });
  }
  setLogin(modelo:LoginModel){
    modelo.password = btoa(modelo.password.toString());
    if(modelo!=undefined && modelo!=null){
      this.storage.set("LOGIN", modelo);
      return modelo;
    } else {
      this.storage.set("LOGIN", null);
    }
    
  }

  
  public getUsuario(){
    return new Promise((resolve,reject) =>{
      this.storage.ready().then(() =>{
        //no me interesa si devuelve algo o no... simplemente cuando la BBDD esta lista, ejecutar lo siguiente..
        
        this.storage.get("LOGGED_USER").then(data => {
           let logModel:UsuarioModel=null;
          if(data!=undefined && data!=null){
            //Decodifica
            logModel = UsuarioModel.fromJSON(data);
          }
          resolve(logModel);
        })
      })
      .catch(()=>{
        reject(new Error("La BBDD no funciona!"));
      })
    });
  }
  setUsuario(modelo:UsuarioModel){
    
    if(modelo!=undefined && modelo!=null){
      this.storage.set("LOGGED_USER", modelo);
      return modelo;
    } else {
      this.storage.set("LOGGED_USER", null);
    }
    
  }

  setUsuarioEMPTY(){
      this.storage.set("LOGGED_USER", null);
  }

  codificar(valor:string) {
      return btoa(valor.toString())
  }

  descodificar(valor:string) {
    return atob(valor);
  }

}