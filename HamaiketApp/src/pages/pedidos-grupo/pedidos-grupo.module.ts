import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidosGrupoPage } from './pedidos-grupo';

@NgModule({
  declarations: [
    PedidosGrupoPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidosGrupoPage),
  ],
})
export class PedidosGrupoPageModule {}
