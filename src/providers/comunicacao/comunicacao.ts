import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

/*
  Generated class for the ComunicacaoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ComunicacaoProvider {
  constructor(public storage: Storage, public http: Http, public toastCtrl: ToastController) {
    console.log('Hello ComunicacaoProvider Provider');
  }

  public getClientes() {
    return new Promise((resolve, reject) => {
      this.getAuth().then(result => {
        let _headers = new Headers({ 'Content-Type': 'application/json' });
        _headers.append('Authorization', "Bearer " + result);
        let _options = new RequestOptions({ headers: _headers });
        this.http.get('http://127.0.0.1:8050/clientes', _options).toPromise().then((resp) => {
          console.log('API Response : ', resp.text());
          resolve(resp);
        }).catch((error) => {
          console.error('API Error : ', error.status);
          console.log('API Error : ', error._body);
          reject(error);
        });
      });
    });
  }

  public getClienteByKey(key) {

    return new Promise((resolve, reject) => {
      this.getAuth().then(result => {
        let _headers = new Headers({ 'Content-Type': 'application/json' });
        _headers.append('Authorization', "Bearer " + result);
        let _options = new RequestOptions({ headers: _headers });
        this.http.get('http://127.0.0.1:8050/clientes/' + key, _options).toPromise().then((resp) => {
          console.log('API Response : ', resp.text());
          resolve(resp);
        }).catch((error) => {
          console.error('API Error : ', error.status);
          console.log('API Error : ', error._body);
          reject(error);
        });
      });
    });
  }

  login(username, password) {
    let _headers = new Headers({ 'Content-Type': 'application/json' });
    //  _headers.append('Authorization', '');
    let _options = new RequestOptions({ headers: _headers });

    var body = {
      "username": username,
      "password": password
    }
    return new Promise((resolve, reject) => {
      this.http.post('http://127.0.0.1:8050/login', JSON.stringify(body), _options).toPromise().then((resp) => {
        console.log('API Response : ', resp.text());
        this.setAuth(resp.json().token).then(dt => {
          resolve(resp);
        })
      }).catch((error) => {
        console.error('API Error : ', error.status);
        console.log('API Error : ', error._body);
        reject(error);
      });
    });
  }

  showToast(msg: string) {

    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5200,
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: 'OK'
    });
    toast.present();
  }

  getUser() {
    return new Promise((resolve, reject) => {
      this.getAuth().then(result => {
        let _headers = new Headers({ 'Content-Type': 'application/json' });
        _headers.append('Authorization', "Bearer " + result);
        let _options = new RequestOptions({ headers: _headers });
        this.http.get('http://127.0.0.1:8050/session', _options).toPromise().then((resp) => {
          console.log('API Response : ', resp.text());
          resolve(resp);
        }).catch((error) => {
          console.error('API Error : ', error.status);
          console.log('API Error : ', error._body);
          reject(error);
        });
      });
    });
  }

  setAuth(token) {
    return this.storage.set("token", token);
  }

  getAuth() {
    return this.storage.get("token");
  }
}
