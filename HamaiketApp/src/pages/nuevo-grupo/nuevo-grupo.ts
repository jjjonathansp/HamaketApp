import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { GrupoModel } from '../../shared/grupoModel';
import { UsuarioModel } from '../../shared/usuarioModel';
import { FirebaseService } from '../services/firebase.service';
import { RelaUsuGrupoModel } from '../../shared/relaUsuGrupoModel';

/**
 * Generated class for the NuevoGrupoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nuevo-grupo',
  templateUrl: 'nuevo-grupo.html',
})
export class NuevoGrupoPage {
  usuarioLogado: UsuarioModel = null;
  grupo: GrupoModel = new GrupoModel("","",0,"");

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService:FirebaseService, public alertCtrl:AlertController) {

    this.usuarioLogado = navParams.get("usuario");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevoGrupoPage');


  }

  guardarGrupo() {
   
    this.firebaseService.addGrupo(this.grupo).then((grupo:any)=>{
      if(grupo!=null) {
        
        this.grupo = grupo;
        let relacion:RelaUsuGrupoModel = new RelaUsuGrupoModel("",this.grupo.key,this.usuarioLogado.key,true);
        this.firebaseService.addRelaGrupoUsuario(relacion).then((relaUsuGrupo:any) => {
          //modal ok
          if(relaUsuGrupo!=null) {
            this.guardadoOK();
          }
        });
      } else {
        //modal ha ocurrido un error guardando el grupo
        this. guardadoKO();
      }
    });
  }

  guardadoOK() {
    const alert = this.alertCtrl.create({
      title: 'Perfecto!',
      subTitle: 'Se ha generado el nuevo grupo!',
      buttons: [{
        text: 'Aceptar',
        role: 'cancel',
        handler: data => {
          this.navCtrl.pop();
        }
      }],

    });
    alert.present();
  }

  guardadoKO() {
    const alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: 'Ha ocurrido un error al generar el grupo. Inténtalo de nuevo mas tarde.',
      buttons: ['Aceptar']
    });
    alert.present();
  }

}
