import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseService } from '../services/firebase.service';
import { GrupoModel } from '../../shared/grupoModel';
import { RelaUsuGrupoModel } from '../../shared/relaUsuGrupoModel';
import { UsuarioModel } from '../../shared/usuarioModel';

/**
 * Generated class for the AdministrarMiembrosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-administrar-miembros',
  templateUrl: 'administrar-miembros.html',
})
export class AdministrarMiembrosPage {

  grupo:GrupoModel = null;
  miembros:Array<UsuarioModel> = [];
  constructor(
    
    public navCtrl: NavController, 
    public navParams: NavParams,
    public firebaseService:FirebaseService
  ) {

    this.grupo = this.navParams.get("grupo");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdministrarMiembrosPage');

    this.firebaseService.getRelaGruposUsuarioByGroup(this.grupo.key).then((relaciones:Array<RelaUsuGrupoModel>)=>{
      if(relaciones!=null && relaciones.length>0) {
        console.log("relaciones?"+relaciones.length);
        this.firebaseService.getUsuariosGrupo(relaciones).then((usuarios:Array<UsuarioModel>)=>{
            this.miembros = usuarios;
            console.log("miembros?"+this.miembros.length);
        })
        

      }

    });
  }

  eliminarMiembro(index:number) {
    //mensaje confirm
  }

}
