import { ComunicacaoProvider } from './../../providers/comunicacao/comunicacao';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user: string;
  senha: string;
  var
  constructor(public navCtrl: NavController, public navParams: NavParams, public providerComunicacao: ComunicacaoProvider) {
    this.user = '';
    this.senha = '';
  }

  login() {
    this.providerComunicacao.login(this.user, this.senha).then(res => {
      console.log(res);
      this.navCtrl.pop();
    }).catch(error => {
      console.log(error);
      this.providerComunicacao.showToast("Ocorreu um erro ao realizar login: " + JSON.parse(error._body).error)
    });
  }
}
