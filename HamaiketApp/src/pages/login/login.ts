import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { UsuarioModel } from '../../shared/usuarioModel';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { FormControl } from '../../../node_modules/@angular/forms/src/model';
import { HomePage } from '../home/home';
import { RegistroPage } from '../registro/registro';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  recordarLogin:Boolean=false;
  usuario:UsuarioModel;
  nombreUsuario:string="";
  contrasenia:string="";

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController, public alertCtrl: AlertController, public usuariosService: UsuariosServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  showAlertRegistrado() {
    let alert = this.alertCtrl.create({
      title: 'Usuario creado',
      subTitle: 'Se ha generado el usuario solicitado',
      buttons: ['Aceptar']
    });
    alert.present();
  }
  showAlertEmail() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Introduce un email válido',
      buttons: ['Aceptar']
    });
    alert.present();
  }
  showAlertPass() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Es obligatorio introducir una contraseña',
      buttons: ['Aceptar']
    });
    alert.present();
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'El usuario y contraseña introducidos no son válidos',
      buttons: ['Aceptar']
    });
    alert.present();
  }

  validateEmailF(c: FormControl) {
  let EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return EMAIL_REGEXP.test(c.value) ? true : false;
  }
  
  validateUsuario(usuario){
    //TODO validar existencia de usuario
    return true;
  }


  iniciarSesion(){
    console.log(`Usuario:${this.nombreUsuario} Contraseña: ${this.contrasenia}`);
    if(!this.validateUsuario(this.nombreUsuario)){
      console.log("NO Valido");
      this.showAlertEmail();
    } else {
              if(this.contrasenia == null || this.contrasenia==''){
              this.showAlertPass();
              }else {
                //TODO añadir peticion rest...
                let usuarioValido:boolean=true;

                this.nombreUsuario = "";
                this.contrasenia = "";
                if(usuarioValido){
                  console.log("Es valido");
                  this.navCtrl.setRoot(HomePage);
                }else{
                  console.log("no es valido");
                  this.showAlert();
                }
              }

    }
  
  }
  registrate(){
    this.usuario= new UsuarioModel('','','','','');
    /*let modal = this.modalCtrl.create(RegistroPage);
    modal.present();
    modal.onDidDismiss(usuario => {
      if(usuario){
        this.usuario=usuario;
        this.showAlertRegistrado();
      }
    })*/
    this.navCtrl.push(RegistroPage);
  }
}
