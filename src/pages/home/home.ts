import { Component } from '@angular/core';
import { LoveromsProvider } from "../../providers/loveroms/loveroms";
import { ToastController, ModalController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { NgZone } from "@angular/core";
import { ModalPage } from '../modal/modal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public query: string;
  public games = [];
  public zone = new NgZone({ enableLongStackTrace: false });
  public searched = false;
  public spinnerOn = false;

  constructor(
    public loveroms: LoveromsProvider,
    public toastCtrl: ToastController,
    public events: Events,
    public modalCtrl: ModalController,
  ) {}

  search(){
    this.spinnerOn = true;
    this.games = [];
    this.query.trim() ? this.loveroms.search(this.query.trim()).subscribe(data => {this.zone.run(() => {this.games.push(data); this.spinnerOn = false;})}) : this.toast('You must input a search query.');
    this.query = this.query.trim();
    this.searched = true;
  }

  noGames(){
    if (!this.games[0].image) {
      if (this.searched) this.toast('No games were found.');
      this.searched = false;
    }
  }

  toast(message: string){
    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).present();
  }

  viewGame(game){
    this.modalCtrl.create(ModalPage, {game: game}, {
      showBackdrop: false,
      enterAnimation: 'ModalEnterFadeIn',
      leaveAnimation: 'ModalLeaveFadeOut'
    }).present();
  }

}
