import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdministrarMiembrosPage } from './administrar-miembros';

@NgModule({
  declarations: [
    AdministrarMiembrosPage,
  ],
  imports: [
    IonicPageModule.forChild(AdministrarMiembrosPage),
  ],
})
export class AdministrarMiembrosPageModule {}
