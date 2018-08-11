import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { AuthService } from '../pages/services/auth.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild("content") nav: Nav;
  rootPage:any = LoginPage;

  pages: Array<{title: string,icon: string, component: any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public authService: AuthService) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.pages = [
      { title: 'Inicio',icon:"home", component: HomePage },
    ];
  }

  logout(){
    this.authService.doLogout()
    .then(res => {
      console.log("logout");
      this.nav.setRoot(LoginPage);
    })
  }
}
