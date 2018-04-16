import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { LoveromsProvider } from "../../providers/loveroms/loveroms";
import { ElectronProvider } from "../../providers/electron/electron";

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})

export class ModalPage {

  public spinnerOn = true;
  public oldGame;
  public newGame;
  public downloaded = false;
  public downloading = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loveroms: LoveromsProvider,
    public toastCtrl: ToastController,
    public electron: ElectronProvider
  ) {}

  ionViewDidLoad(){
    this.oldGame = this.navParams.get('game');
    this.loveroms.getGame(this.oldGame.link).then(data => {
      this.newGame = data;
      this.spinnerOn = false;
    });
  }

  download(){
    this.downloading = true;
    let filename = this.newGame.download_link.substring(this.newGame.download_link.lastIndexOf("/") + 1);
    filename = filename.substring(0, filename.indexOf('?'));
    this.toast('Attempting to download ' + filename + '..');
    this.electron.download(this.newGame.download_link).then((data) => {
      this.toast('Downloaded ~/Downloads/GC ROMS/' + filename);
      this.downloaded = true;
      this.downloading = false;
    });
  }

  toast(message: string){
    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).present();
  }

}
