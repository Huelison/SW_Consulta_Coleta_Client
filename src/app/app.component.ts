import { HomePage } from './../pages/home/home';
import { Component, ViewChild, NgZone } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ComunicacaoProvider } from '../providers/comunicacao/comunicacao';
import { Observable } from 'rxjs/Observable';
interface Response extends Object, Body {
  readonly body: ReadableStream | null;
  readonly _body: string | null;
  readonly headers: Headers;
  readonly ok: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly type: ResponseType;
  readonly url: string;
  readonly redirected: boolean;
  clone(): Response;
}
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;
  @ViewChild(Nav) nav: Nav;
  username: string;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public menuCtrl: MenuController, public providerComunicacao: ComunicacaoProvider, public zone: NgZone) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.zone = new NgZone({ enableLongStackTrace: false });
    });
  }
 
  ionOpen() { 
    this.providerComunicacao.getUser().then((res: Response) => {
      console.log(res);
      var valor = res._body;
      var body = JSON.parse(valor);
      console.log(body);
      this.zone = new NgZone({ enableLongStackTrace: false });
      this.zone.run(() => {
        if (body.user != undefined)
          this.username = " - " + body.user;
        else
          this.username = "";
      });
    }).catch(err => {
      console.error(err);
      console.log(JSON.parse(err._body).error);
    });
  }

  abrirPagina(pagina) {
    if (this.nav.getActive().component.name !== "HomePage") {
      this.nav.setPages([HomePage]);
      this.nav.popToRoot();
      console.log('teste' + this.nav.getActive().component.name);
    }
    this.menuCtrl.close();
    switch (pagina) {
      case 'ListaClientes':
        this.nav.push('ClientesPage');
        break;
      default:
        break;
    }
  }
}

