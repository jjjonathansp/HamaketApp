import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseService } from '../services/firebase.service';
import { GrupoModel } from '../../shared/grupoModel';
import { CategoriaModel } from '../../shared/categoriaModel';
import { ElementoModel } from '../../shared/elementoModel';

/**
 * Generated class for the NuevoPedidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nuevo-pedido',
  templateUrl: 'nuevo-pedido.html',
})
export class NuevoPedidoPage {

  elementosPedido:Array<ElementoModel> = [];
  cantidadElementos:Number = 0;
  grupo:GrupoModel = null;
  categorias:Array<CategoriaModel> = [];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public firebaseService: FirebaseService
  ) {
    this.grupo = navParams.get("grupo");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevoPedidoPage');
    this.firebaseService.getCategorias().then((categoriaList:Array<CategoriaModel>)=> {
      if(categoriaList!=null && categoriaList.length>0) {
        this.categorias = categoriaList;
      }
    });
    this.cantidadElementos = this.elementosPedido.length;
    
  }

  seleccionadaCategoria(cat:CategoriaModel) {

  }

  carrito(){}

}
