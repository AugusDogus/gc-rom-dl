declare global {
  interface Window { require: any; }
}

import { Injectable } from '@angular/core';
const electron = window.require('electron');
const {dialog} = window.require('electron').remote;


@Injectable()
export class ElectronProvider {

  constructor() {}

  download(url){
    return new Promise((resolve, reject) => {
      let links = [];
      links.push(url);
      window.require('electron').remote.require('electron-download-manager').bulkDownload({
        urls: links,
        path: "GC ROMS"
      }, function (error, finished, errors) {
        if (error) {
          console.log("finished: " + finished);
          console.log("errors: " + errors);
          reject();
        } else {
          resolve('finished with no problems');
        }
      });
    });
  }
}
