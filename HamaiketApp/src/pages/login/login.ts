import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { RegisterPage } from '../register/register';
import { MenuPage } from '../menu/menu';

import { AuthService } from '../services/auth.service';
import { LoginModel } from '../../shared/loginModel';

import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  validations_form: FormGroup;
  errorMessage: string = '';

  validation_messages = {
   'email': [
     { type: 'required', message: 'El email es obligatorio.' },
     { type: 'pattern', message: 'Inserta un email válido.' }
   ],
   'password': [
     { type: 'required', message: 'La contraseña es obligatoria.' },
     { type: 'minlength', message: 'La contraseña debe ser al menos de 5 caracteres.' }
   ]
 };
  loginValue:LoginModel = null;
  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public storageService: StorageService,
    public storage: Storage
  ) {}

  ionViewWillLoad(){
    this.storageService.setUsuarioEMPTY();
    this.getLogin().then((log:LoginModel) => {
      console.log("log"+log);
      this.loginValue = log;
      let valoremail  = this.loginValue!=null? this.loginValue.email : '';
      let valorPass  = this.loginValue!=null? this.loginValue.password : '';
      let recordar = this.loginValue!=null? true : false;
      console.log("login:"+ this.loginValue);
      this.validations_form = this.formBuilder.group({
        email: new FormControl(valoremail, Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        password: new FormControl(valorPass, Validators.compose([
          Validators.minLength(5),
          Validators.required
        ])),
        recordarLogin: new FormControl(recordar, Validators.compose([]))
      });
    });
    
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      recordarLogin: new FormControl(false, Validators.compose([]))
    });
  }

  tryLogin(value){
    console.log("RECORDAR:"+value.recordarLogin);
    this.presentLoading();
    this.authService.doLogin(value)
    .then(res => {
      if(value.recordarLogin == true) {
        this.setLogin(new LoginModel(value.email, value.password));
      }
      this.navCtrl.setRoot(HomePage);
    }, err => {
      this.errorMessage = err.message;
    })
  }

  goRegisterPage(){
    this.navCtrl.push(RegisterPage);
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

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Cargando...",
      duration: 500
    });
    loader.present();
  }
}
