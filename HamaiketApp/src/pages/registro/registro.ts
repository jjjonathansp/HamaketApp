import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioModel } from '../../shared/usuarioModel';

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  usuario:UsuarioModel=new UsuarioModel('','','','','');
  pass:string='';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }
  validarPass() {
    if(this.pass===this.usuario.password) {
      console.log("true");
      return true;
    } else {
      console.log("false");
      return false;
    }
  }

  limpiar(){
    console.log("limpiar");
    this.usuario = new UsuarioModel('','','','','');
    this.pass= '';
  }

}
