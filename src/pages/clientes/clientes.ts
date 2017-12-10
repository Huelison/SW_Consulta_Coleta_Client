import { StatusBar } from '@ionic-native/status-bar';
import { ClienteDetalhePage } from './../cliente-detalhe/cliente-detalhe';
import { ComunicacaoProvider } from './../../providers/comunicacao/comunicacao';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the ClientesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
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
@IonicPage()
@Component({
  selector: 'page-clientes',
  templateUrl: 'clientes.html',
})
export class ClientesPage {
  public listaClientes;
  public keys = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public providerComunicacao: ComunicacaoProvider,
    public alertCtrl: AlertController) {

  }

  ionViewDidEnter() {
    this.getDados();
  }

  getDados() {
    this.providerComunicacao.getClientes().then((result: Response) => {
      console.log(result.json());
      this.listaClientes = result.json();
      console.log(this.listaClientes);
      this.keys = Object.keys(this.listaClientes);
      console.log(this.keys);
    }).catch(err => {
      console.error(err);
      if (err.status == '401') {
        let alert = this.alertCtrl.create({
          title: 'Seu login expirou, deseja realizar novamente o login?',
          message: '',
          buttons: [
            {
              text: 'Sim',
              handler: () => {
                this.navCtrl.push("LoginPage");
              }
            },
            {
              text: 'Não',
              role: 'cancel',
              handler: () => {
              }
            }
          ]
        });
        alert.present();
      } else {
        if (err.status != 500)
          this.providerComunicacao.showToast("Ocorreu um erro ao carregar dados: " + JSON.parse(err._body).error)
        else
          this.providerComunicacao.showToast("Ocorreu um erro ao carregar dados: " + err.statusText)
      }
    });
  }

  exibirCliente(idCliente) {
    console.log(idCliente);
    this.navCtrl.push("ClienteDetalhePage", { "idCliente": idCliente });
  }
}
