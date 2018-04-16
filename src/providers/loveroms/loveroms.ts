import { Injectable } from '@angular/core';

import * as request from 'request';
import * as cheerio from 'cheerio';
import {Observable} from "rxjs/Observable";


@Injectable()
export class LoveromsProvider {

  public base_url: string = 'https://www.loveroms.com/roms/gamecube/?q=';
  constructor() {}

  search(query) {
    return new Observable((observer) => {
      let url = this.base_url  + query;
      request(url, function(error, response, html){
        if (!error){
          let $ = cheerio.load(html);
          $('#view-full').find('tbody').children().each(function(i, el) {

            observer.next({
              link: $(this).find('a').attr('href'),
              image: $(this).find('img').attr('src'),
              name: $(this).find('a').find('span').eq('1').text(),
              flag: ($(this).find('a').find('span').eq('0').hasClass('flags usa')) ? 'us' : 'eu'
            });

          });
        }
      });
    });
  }

  getGame(link){

    return new Promise(resolve => {

      let url = 'https://www.loveroms.com' + link;

      request(url, function(error, response, html){
        if (!error){
          let $ = cheerio.load(html);

          resolve({
            download_link: $('#download_link').attr('href'),
            image: $('.rom-cover').attr('src')
          });

        }
      });

    });

  }

}
