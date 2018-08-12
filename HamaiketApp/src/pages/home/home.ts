import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseService } from '../services/firebase.service';
import { StorageService } from '../services/storage.service';
import { UsuarioModel } from '../../shared/usuarioModel';
import { PerfilUsuarioPage } from '../perfil-usuario/perfil-usuario';
import { NuevoGrupoPage } from '../nuevo-grupo/nuevo-grupo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  usuarioLogado:UsuarioModel = new UsuarioModel("","",0,"./assets/imgs/anonimo.png","");
  constructor(
    public navCtrl: NavController,
    public storageService: StorageService,
    public firebaseService: FirebaseService
  ) {  
  }

  ionViewWillEnter(){

    this.firebaseService.getUsuario().then((usuario:any)=>{
      console.log("Usuario:");
      if(usuario!=null && usuario.length>0) {
        this.usuarioLogado = UsuarioModel.fromFB(usuario);
        this.storageService.setUsuario(this.usuarioLogado);
      } else {
        this.abrirPaginaPerfil();
      }
    });

  }

  abrirPaginaPerfil() {
    
    this.navCtrl.push(PerfilUsuarioPage, {'mensaje':true});
    
  }

  editarPerfil() {
    this.navCtrl.push(PerfilUsuarioPage, {'mensaje':null});
  }

  nuevoGrupo() {
    this.navCtrl.push(NuevoGrupoPage);
  }

}
