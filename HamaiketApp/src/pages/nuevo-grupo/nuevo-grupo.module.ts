import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuevoGrupoPage } from './nuevo-grupo';

@NgModule({
  declarations: [
    NuevoGrupoPage,
  ],
  imports: [
    IonicPageModule.forChild(NuevoGrupoPage),
  ],
})
export class NuevoGrupoPageModule {}
