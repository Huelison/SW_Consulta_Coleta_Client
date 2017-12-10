import { ComunicacaoProvider } from './../../providers/comunicacao/comunicacao';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public providerComunicacao: ComunicacaoProvider) {

  }

  ionViewDidLoad() {

  }

}
