import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

/**
 * Generated class for the ScanerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-scaner',
  templateUrl: 'scaner.html',
})
export class ScanerPage {

  constructor(public viewCtrl: ViewController,
              private qrScanner: QRScanner,
              public navParams: NavParams) {
    this.qrCodeScan();
  }

  public qrCodeScan() {
    this.qrScanner.prepare().then((status: QRScannerStatus) => {
     if (status.authorized) {

        let scanSub = this.qrScanner.scan().subscribe((text: string) => {
          
          this.viewCtrl.dismiss(text);

          this.qrScanner.hide();

          scanSub.unsubscribe();
        });

        this.qrScanner.show();

      } else if (status.denied) {

      } else {}
    }).catch((e: any) => console.log('Error is', e));
  }

}
