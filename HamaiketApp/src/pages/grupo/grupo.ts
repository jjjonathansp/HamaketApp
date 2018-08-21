import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FirebaseService } from '../services/firebase.service';
import { AdministrarMiembrosPage } from '../administrar-miembros/administrar-miembros';
import { GrupoModel } from '../../shared/grupoModel';
import { PedidoModel } from '../../shared/pedidoModel';
import { PedidosGrupoPage } from '../pedidos-grupo/pedidos-grupo';
import { NuevoPedidoPage } from '../nuevo-pedido/nuevo-pedido';

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
    public firebaseService: FirebaseService,
    public alertCtrl:AlertController
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

  modificarPedido(){
    console.log("modificar pedido");
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();
    this.firebaseService.getPedidosActivosDia(dd,mm,yyyy,this.grupo.key).then((pedidos:Array<PedidoModel>)=>{
      if(pedidos!=null && pedidos.length>0) {
        //tiene pedidos activos.
        console.log("tiene pedidos");
        this.navCtrl.push(PedidosGrupoPage,{"pedidos":pedidos});
      } else {
        console.log("no tiene pedidos");
        this.alertaNoPedidos();
      }
    });
    
  }

  verPedido() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();
    
  }

  nuevoPedido(){
    this.navCtrl.push(NuevoPedidoPage, {"grupo":this.grupo});
  }

  alertaNoPedidos() {
    const alert = this.alertCtrl.create({
      title: 'Ojo!',
      subTitle: 'No tienes pedidos activos en este momento. Puedes dar de alta uno nuevo pulsando el botón de "Nuevo Pedido"',
      buttons: ['OK']
    });
    alert.present();
  }

  

}
