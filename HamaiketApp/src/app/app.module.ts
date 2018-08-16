import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { MenuPage } from '../pages/menu/menu';
import { DetailsPage } from '../pages/details/details';
import { NewTaskModalPage } from '../pages/new-task-modal/new-task-modal';

import { ImagePicker } from '@ionic-native/image-picker';

import { FirebaseService } from '../pages/services/firebase.service';
import { AuthService } from '../pages/services/auth.service';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environment/environment';
import { HomePage } from '../pages/home/home';
import { IonicStorageModule } from '@ionic/storage';
import { StorageService } from '../pages/services/storage.service';
import { PerfilUsuarioPage } from '../pages/perfil-usuario/perfil-usuario';
import { CambiarAvatarPage } from '../pages/cambiar-avatar/cambiar-avatar';
import { NuevoGrupoPage } from '../pages/nuevo-grupo/nuevo-grupo';
import { GrupoPage } from '../pages/grupo/grupo';
import { AdministrarMiembrosPage } from '../pages/administrar-miembros/administrar-miembros';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    MenuPage,
    HomePage,
    NewTaskModalPage,
    PerfilUsuarioPage,
    CambiarAvatarPage,
    NuevoGrupoPage,
    GrupoPage,
    AdministrarMiembrosPage,
    DetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      scrollAssist: false, 
      autoFocusAssist: false
    }),
    HttpModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    HomePage,
    MenuPage,
    PerfilUsuarioPage,
    NewTaskModalPage,
    CambiarAvatarPage,
    NuevoGrupoPage,
    GrupoPage,
    AdministrarMiembrosPage,
    DetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ImagePicker,
    FirebaseService,
    AuthService,
    StorageService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
