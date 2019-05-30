import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
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

  loader = null;
  elementosPedido:Array<ElementoModel> = [];
  cantidadElementos:Number = 0;
  grupo:GrupoModel = null;
  categorias:Array<CategoriaModel> = [];
  
  subcategorias:Array<ElementoModel> = [];

  categoriaSelected:CategoriaModel = null;
  collectionSelected:String = null;
  elementosSelected:Array<ElementoModel> = [];
  testCheckboxOpen = false;
  testCheckboxResult: any;
  testRadioOpen = false;
  testRadioResult: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public firebaseService: FirebaseService,
    public alertCtrl: AlertController,
    public loadingCtrl:LoadingController
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
    this.categoriaSelected = cat;
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
        this.categoriaSelected = null;
        this.testRadioOpen = false;
        this.testRadioResult = null;
        this.collectionSelected = null;
        
      }
    });
    alert.addButton({
      text: 'Aceptar',
      handler: (data: any) => {
        console.log('Radio data:', data);
        this.collectionSelected = this.categoriaSelected.collections[data];
        this.testRadioOpen = false;
        this.testRadioResult = data;
        
      }
    });

    alert.present();
    alert.onDidDismiss(()=>{
      if(this.testRadioResult!=undefined && this.testRadioResult!=null) {
        this.presentLoading();
        this.firebaseService.getSubCategoriaElements(this.categoriaSelected.key.toString(),this.collectionSelected.split("/")[0]).then((elementos:Array<ElementoModel>)=>{
          let lista:Array<any> = [];
          if(elementos!=null && elementos.length>0) {
            
            for(let i=0;i<elementos.length;i++) {
              lista.push({type:"checkbox",label:elementos[i].nombre,value:i});
            }
            this.doCheckbox(lista);
          }
          this.dismishLoading();

        });
        
      }
    });
  }
  doCheckbox(lista:any) {
    let alert = this.alertCtrl.create({enableBackdropDismiss:false});
    alert.setTitle('Que deseas pedir?');

    for(let i=0;i<lista.length;i++) {
      
      alert.addInput({
          type: lista[i].type,
          label: lista[i].label,
          value: lista[i].value
      });
    }

    alert.addButton({
      text: 'Cancelar',
      handler: (data: any) => {
        this.elementosSelected = null;
        this.testCheckboxOpen = false;
        this.testCheckboxResult = null;
        this.categoriaSelected = null;
        this.collectionSelected = null;  
      }
    });
    alert.addButton({
      text: 'Añadir',
      handler: (data: any) => {
          console.log('Checkbox data:', data);
          this.testCheckboxOpen = false;
          this.testCheckboxResult = data;
          for(let i=0;i<data.length;i++) {
            this.elementosPedido.push(data);
            this.cantidadElementos = this.elementosPedido.length;
          }
      }
    });

    alert.present();
  }

  carrito(){}

presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Cargando..."
      //duration: 500
    });
    this.loader.present();
  }

  dismishLoading() {
    this.loader.dismiss();
  }

}
