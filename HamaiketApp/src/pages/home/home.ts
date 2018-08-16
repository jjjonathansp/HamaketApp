import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { FirebaseService } from '../services/firebase.service';
import { StorageService } from '../services/storage.service';
import { UsuarioModel } from '../../shared/usuarioModel';
import { PerfilUsuarioPage } from '../perfil-usuario/perfil-usuario';
import { NuevoGrupoPage } from '../nuevo-grupo/nuevo-grupo';
import { GrupoModel } from '../../shared/grupoModel';
import { RelaUsuGrupoModel } from '../../shared/relaUsuGrupoModel';
import { GrupoPage } from '../grupo/grupo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loader = null;
  grupos:Array<GrupoModel> = [];
  usuarioLogado:UsuarioModel = new UsuarioModel("","",0,"./assets/imgs/anonimo.png","",false);
  constructor(
    public navCtrl: NavController,
    public storageService: StorageService,
    public firebaseService: FirebaseService,
    public loadingCtrl: LoadingController,
  ) {  
  }

  ionViewWillEnter(){
    this.presentLoading();
    this.firebaseService.getUsuario().then((usuario:any)=>{
      if(usuario!=null && usuario.length>0) {
        this.usuarioLogado = UsuarioModel.fromFB(usuario);
        this.storageService.setUsuario(this.usuarioLogado);
        this.firebaseService.getRelaGruposUsuario(this.usuarioLogado.key).then((relaciones:Array<RelaUsuGrupoModel>) =>{
          if(relaciones!=null && relaciones.length>0) {
            this.firebaseService.getGruposUsuario(relaciones).then((grupos:Array<GrupoModel>)=>{
              this.dismishLoading();
              if(grupos!=null && grupos.length>0) {
                this.grupos = grupos;
              }
            });
          }else{
            this.dismishLoading();
          }
        });
      } else {
        this.dismishLoading();
        this.abrirPaginaPerfil();
      }
    });
    

  }

  mostrarPaginaGrupo(index:number){
      if(this.grupos[index].admin) {
        this.navCtrl.push(GrupoPage,{"admin":true, "grupo":this.grupos[index]});
      } else {
        this.navCtrl.push(GrupoPage,{"admin":false,"grupo":this.grupos[index]});
      }
  }

  abrirPaginaPerfil() {
    
    this.navCtrl.push(PerfilUsuarioPage, {'mensaje':true});
    
  }

  editarPerfil() {
    this.navCtrl.push(PerfilUsuarioPage, {'mensaje':null});
  }

  crearGrupo() {
    this.navCtrl.push(NuevoGrupoPage, {"usuario": this.usuarioLogado});
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Cargando..."
      //duration: 500
    });
    this.loader.present();
  }

  dismishLoading() {
    this.loader.dismiss();
  }

}
