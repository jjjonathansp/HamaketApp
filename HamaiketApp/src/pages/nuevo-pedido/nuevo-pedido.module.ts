import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuevoPedidoPage } from './nuevo-pedido';

@NgModule({
  declarations: [
    NuevoPedidoPage,
  ],
  imports: [
    IonicPageModule.forChild(NuevoPedidoPage),
  ],
})
export class NuevoPedidoPageModule {}
