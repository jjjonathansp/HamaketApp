import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';

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
  salir:boolean = false;
  loginValue:LoginModel = null;
  constructor(
    private navCtrl: NavController,
    private navParams:NavParams,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public storageService: StorageService,
    public storage: Storage
  ) {
    
  }

  ionViewWillLoad(){
    this.salir = this.navParams.get("logout");
    this.storageService.setUsuarioEMPTY();
    this.getLogin().then((log:LoginModel) => {
      this.loginValue = log;
      let valoremail  = this.loginValue!=null? this.loginValue.email : '';
      let valorPass  = this.loginValue!=null? this.loginValue.password : '';
      let recordar = this.loginValue!=null? true : false;
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
      
      if(!this.salir && valoremail!=null && valorPass!=null && recordar) {
        this.tryLogin({email:valoremail,password:valorPass,recordarLogin:recordar});
      }
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
