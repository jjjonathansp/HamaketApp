import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AvatarModel } from '../../shared/avatarModel';

/**
 * Generated class for the CambiarAvatarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cambiar-avatar',
  templateUrl: 'cambiar-avatar.html',
})

export class CambiarAvatarPage {

  public avataresChicos:Array<AvatarModel>=[];
  public avataresChicas:Array<AvatarModel>=[];
  public avatares:Array<AvatarModel>=[];
  public avatarActual:AvatarModel = new AvatarModel("","");
  public indice:number=0;
  public max:number = 0;
    
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.avataresChicos = [
      new AvatarModel("./assets/imgs/chicos/1.png","H"),
      new AvatarModel("./assets/imgs/chicos/2.png","H"),
      new AvatarModel("./assets/imgs/chicos/3.png","H"),
      new AvatarModel("./assets/imgs/chicos/4.png","H"),
      new AvatarModel("./assets/imgs/chicos/5.png","H"),
      new AvatarModel("./assets/imgs/chicos/6.png","H"),
      new AvatarModel("./assets/imgs/chicos/7.png","H"),
      new AvatarModel("./assets/imgs/chicos/8.png","H"),
      new AvatarModel("./assets/imgs/chicos/9.png","H"),
      new AvatarModel("./assets/imgs/chicos/10.png","H"),
      new AvatarModel("./assets/imgs/chicos/11.png","H"),
      new AvatarModel("./assets/imgs/chicos/12.png","H"),
      new AvatarModel("./assets/imgs/chicos/13.png","H"),
      new AvatarModel("./assets/imgs/chicos/14.png","H"),
      new AvatarModel("./assets/imgs/chicos/15.png","H"),
      new AvatarModel("./assets/imgs/chicos/16.png","H"),
      new AvatarModel("./assets/imgs/chicos/17.png","H"),
      new AvatarModel("./assets/imgs/chicos/18.png","H")
    ];

    this.avataresChicas = [
      new AvatarModel("./assets/imgs/chicas/1.png","M"),
      new AvatarModel("./assets/imgs/chicas/2.png","M"),
      new AvatarModel("./assets/imgs/chicas/3.png","M"),
      new AvatarModel("./assets/imgs/chicas/4.png","M"),
      new AvatarModel("./assets/imgs/chicas/5.png","M"),
      new AvatarModel("./assets/imgs/chicas/6.png","M"),
      new AvatarModel("./assets/imgs/chicas/7.png","M"),
      new AvatarModel("./assets/imgs/chicas/8.png","M"),
      new AvatarModel("./assets/imgs/chicas/9.png","M"),
      new AvatarModel("./assets/imgs/chicas/10.png","M"),
      new AvatarModel("./assets/imgs/chicas/11.png","M"),
      new AvatarModel("./assets/imgs/chicas/12.png","M"),
      new AvatarModel("./assets/imgs/chicas/13.png","M"),
      new AvatarModel("./assets/imgs/chicas/14.png","M"),
      new AvatarModel("./assets/imgs/chicas/15.png","M"),
      new AvatarModel("./assets/imgs/chicas/16.png","M"),
      new AvatarModel("./assets/imgs/chicas/17.png","M"),
      new AvatarModel("./assets/imgs/chicas/18.png","M"),
      new AvatarModel("./assets/imgs/chicas/19.png","M"),
      new AvatarModel("./assets/imgs/chicas/20.png","M")


    ];

    this.avatares = this.avataresChicos;
    this.indice = 0;
    this.max = this.avatares.length;
    this.avatarActual = this.avatares[this.indice];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CambiarAvatarPage');
    this.avatares = this.avataresChicos;
    this.indice = 0;
    this.max = this.avatares.length;
    this.avatarActual = this.avatares[this.indice];
  }

  cambiarChicos() {
    this.indice = 0;
    this.avatares = this.avataresChicos;
    this.max = this.avatares.length;
    this.avatarActual = this.avatares[this.indice];

  }

  cambiarChicas() {
    this.indice = 0;
    this.avatares = this.avataresChicas;
    this.max = this.avatares.length;
    this.avatarActual = this.avatares[this.indice];

  }

  next() {
    let indicePlus = this.indice + 1;
    let max = this.avatares.length-1;
    if( indicePlus > max) {
      this.indice = 0;
      this.avatarActual = this.avatares[this.indice];
    } else {
      this.indice = indicePlus;
      this.max = this.avatares.length;
      this.avatarActual = this.avatares[this.indice];
    }
  }

  before() {
    let indiceMin = this.indice - 1;
    let max = this.avatares.length-1;
    if( indiceMin > 0) {
      this.indice = indiceMin;
      this.max = this.avatares.length;
      this.avatarActual = this.avatares[this.indice];
    } else {
      this.indice = max;
      this.avatarActual = this.avatares[this.indice];
    }
  }
}
