import { Component } from '@angular/core';
import { NavController, NavParams, AlertController,ModalController } from 'ionic-angular';
import { StorageService } from '../services/storage.service';
import { FirebaseService } from '../services/firebase.service';
import { UsuarioModel } from '../../shared/usuarioModel';
import { LoginModel } from '../../shared/loginModel';
import { LoginPage } from '../login/login';
import { AuthService } from '../services/auth.service';
import { CambiarAvatarPage } from '../cambiar-avatar/cambiar-avatar';


@Component({
  selector: 'page-perfil-usuario',
  templateUrl: 'perfil-usuario.html',
})
export class PerfilUsuarioPage {
  guardado:boolean = false;
  loginUsuario:LoginModel = null;
  usuarioLogado:UsuarioModel = new UsuarioModel("","",0, "./assets/imgs/anonimo.png", "",false);
  constructor(public navCtrl: NavController,
    public storageService: StorageService,
    public authService: AuthService,
    public firebaseService: FirebaseService,
    public navParams:NavParams,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController
  ) {
  }

  ionViewDidLoad() {
    if(this.navParams.get('mensaje')!=null && this.navParams.get('mensaje')!='') {
      this.alertaPrimerAcceso();
    }

    this.firebaseService.getLoggedUser().then((login:firebase.User) => {
      
      if(!login) {
        console.log("Unauthenticated");
        this.authService.doLogout().then( ()=>{
          this.navCtrl.setRoot(LoginPage);
        });
      } else {
        console.log("authenticated");
        this.loginUsuario = new LoginModel(login.email,"");
        
        this.firebaseService.getUsuario().then((loged:any) => {
          if(loged!=null && loged.length>0) {
            
            console.log("usuario logeado");

            this.usuarioLogado = UsuarioModel.fromFB(loged);
            this.storageService.setUsuario(this.usuarioLogado);
            this.guardado = true;
          } else {
            console.log("Usuario sin guardar en BBDD.");
            this.usuarioLogado = new UsuarioModel("","",0, "./assets/imgs/anonimo.png","",false);
          }
        });

      }
    });
  }

  
  alertaPrimerAcceso() {
    const alert = this.alertCtrl.create({
      title: 'Hola!',
      subTitle: '¿Es posible que sea la primera vez que accedes?, por favor, inserta el nombre con el que quieres acceder!',
      buttons: ['OK']
    });
    alert.present();
  }
  cambiarAvatar(){
    console.log("Cambio Avatar");
    
    let avatarModal = this.modalCtrl.create(CambiarAvatarPage, {"usuario":this.usuarioLogado});
    avatarModal.onDidDismiss(data => {
      this.usuarioLogado.imagen = data.imagen;
    });
    avatarModal.present();

  }



  guardar(){
    console.log("guardar!"+this.usuarioLogado.nombreUsuario);
    
    if(this.usuarioLogado.nombreUsuario!=null && this.usuarioLogado.nombreUsuario!="") {
      
      if(!this.guardado) {
        this.firebaseService.saveUsuario(this.usuarioLogado).then((usuario)=>
        {
          this.storageService.setUsuario(usuario);
          this.usuarioLogado = usuario;
          this.navCtrl.pop();
        });

      }else {
        this.firebaseService.updateUsuario(this.usuarioLogado).then((usuario)=>
        {
          this.storageService.setUsuario(usuario);
          this.usuarioLogado = usuario;
          this.navCtrl.pop();
        });
      }
    }
  }


  

}
