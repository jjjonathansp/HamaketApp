import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseService } from '../services/firebase.service';
import { AdministrarMiembrosPage } from '../administrar-miembros/administrar-miembros';
import { GrupoModel } from '../../shared/grupoModel';

/**
 * Generated class for the GrupoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-grupo',
  templateUrl: 'grupo.html',
})
export class GrupoPage {
  
  admin:boolean = true;
  pedidoActivo:boolean = false;
  grupo:GrupoModel = null;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public firebaseService: FirebaseService
  ) {
    this.admin = this.navParams.get("admin");
    this.grupo = this.navParams.get("grupo");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GrupoPage');
  }

  gestionarMiembros(){
    
      this.navCtrl.push(AdministrarMiembrosPage, {"grupo":this.grupo});

  }

}
