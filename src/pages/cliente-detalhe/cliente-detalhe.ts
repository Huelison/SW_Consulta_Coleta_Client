
import { ComunicacaoProvider } from './../../providers/comunicacao/comunicacao';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the ClienteDetalhePage page.
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

export class Cliente {
  nome: string;
  fone: string; 
  endereco: string;
}

@IonicPage()
@Component({
  selector: 'page-cliente-detalhe',
  templateUrl: 'cliente-detalhe.html',
})
export class ClienteDetalhePage {
  public cliente: Cliente = new Cliente();;
  constructor(public navCtrl: NavController, public navParams: NavParams, public providerComunicacao: ComunicacaoProvider,
    public alertCtrl: AlertController) {
    this.cliente = {
      nome: "",
      fone: "", 
      endereco: ""
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClienteDetalhePage');
    this.getDados(this.navParams.get("idCliente"));
  }

  getDados(key) {
    this.providerComunicacao.getClienteByKey(key).then((res: Response) => {
      console.log(res);
      var valor = res._body;
      this.cliente = JSON.parse(valor);
      console.log(this.cliente);
    }).catch(err => {
      console.error(err);
      if (err.status == '401') {
        console.error(err);
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
      }else{
        console.log(JSON.parse(err._body).error);
        var error = JSON.parse(err._body).error;
        console.log(error);
        
        this.providerComunicacao.showToast("Ocorreu um erro ao carregar dados: "+error)
      }

    });
  }

}
