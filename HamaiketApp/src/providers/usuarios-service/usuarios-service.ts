import { UsuarioModel } from './../../shared/usuarioModel';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsuariosServiceProvider {
  usuarios:UsuarioModel[];
  constructor(public http: Http) {
  }

  
  addUsuario(usuario:UsuarioModel){
    return new Promise((resolve,reject) => {
      this.http.post("http://172.16.0.176:3000/usuario", usuario)
      
      .subscribe((data:any) => {
        resolve(usuario);
      });
    });
  }
  checkUsername(nombreUsuario:String){
    return new Promise((resolve,reject) => {
      this.http.get("http://172.16.0.176:3000/usuario/nombreUsuario/"+nombreUsuario)
      .subscribe((data:any) => {
        resolve(!data?true:false);
      });
    });
  }
}
