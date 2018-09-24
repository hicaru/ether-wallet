import { Component } from '@angular/core';

import { ViewController } from 'ionic-angular';

import { config } from '../../service/ether/config';
import { Wallet } from '../../service/ether/wallet';
import { Repository } from '../../service/local/storage';
import { data } from '../../app/global';
/**
 * Generated class for the NetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-net',
  templateUrl: 'net.html',
})
export class NetPage extends Wallet {

  public selected: string;
  public netKeys = Object.keys(config);

  constructor(public viewCtrl: ViewController,
              private repo: Repository) {
    super();
  }

  public onProviderSelect(provider: string) {
    data.netDefault = provider;
    this.setProvider(provider);
    this.repo.setNet(provider);
    this.viewCtrl.dismiss(provider);
  }

}
