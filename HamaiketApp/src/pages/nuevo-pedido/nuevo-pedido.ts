import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  
  subcategorias:Array<ElementoModel> = [];

  testCheckboxOpen = false;
  testCheckboxResult: any;
  testRadioOpen = false;
  testRadioResult: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public firebaseService: FirebaseService,
    public alertCtrl: AlertController
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
    let lista:Array<any> = [];
    for(let i=0;i<cat.collections.length;i++) {
      lista.push({type:"radio",label:cat.collections[i].split("/")[1],value:i});
    }
    this.doRadio(lista);

  }
  doRadio(lista:Array<any>) {
    let alert = this.alertCtrl.create({enableBackdropDismiss:false});
    alert.setTitle('Selecciona uno de los siguientes...');

    for(let i=0;i<lista.length;i++) {
      alert.addInput({
        type: lista[i].type,
        label: lista[i].label,
        value: lista[i].value,
        checked: i==0?true:false
      });
    }
    
    alert.addButton({
      text: 'Cancelar',
      handler: (data: any) => {
        this.testRadioOpen = false;
        this.testRadioResult = null;
        
      }
    });
    alert.addButton({
      text: 'Aceptar',
      handler: (data: any) => {
        console.log('Radio data:', data);
        this.testRadioOpen = false;
        this.testRadioResult = data;
        
      }
    });

    alert.present();
    alert.onDidDismiss(()=>{
      if(this.testRadioResult!=undefined && this.testRadioResult!=null) {
        this.doCheckbox();
      }
    });
  }
  doCheckbox() {
    let alert = this.alertCtrl.create({enableBackdropDismiss:false});
    alert.setTitle('Que deseas pedir?');

    alert.addInput({
        type: 'checkbox',
        label: 'Alderaan',
        value: 'value1'
    });

    alert.addInput({
        type: 'checkbox',
        label: 'Bespin',
        value: 'value2'
    });

    alert.addInput({
        type: 'checkbox',
        label: 'Coruscant',
        value: 'value3'
    });

    alert.addInput({
        type: 'checkbox',
        label: 'Endor',
        value: 'value4'
    });

    alert.addInput({
        type: 'checkbox',
        label: 'Hoth',
        value: 'value5'
    });

    alert.addInput({
        type: 'checkbox',
        label: 'Jakku',
        value: 'value6'
    });

    alert.addInput({
        type: 'checkbox',
        label: 'Naboo',
        value: 'value6'
    });

    alert.addInput({
        type: 'checkbox',
        label: 'Takodana',
        value: 'value6'
    });

    alert.addInput({
        type: 'checkbox',
        label: 'Tatooine',
        value: 'value6'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: (data: any) => {
          console.log('Checkbox data:', data);
          this.testCheckboxOpen = false;
          this.testCheckboxResult = data;
      }
    });

    alert.present();
  }

  carrito(){}

}
