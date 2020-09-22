import { Injectable } from '@angular/core';
import DataCompagnes from '../datas/payload-rmp.json';
import DataBrands from '../datas/brands.json';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  datas: any = DataCompagnes.requests;
  brands: any = DataBrands;

  constructor() {

  }

  initCampagneData() {
    if(JSON.parse(localStorage.getItem('Campagnes'))) {
      return JSON.parse(localStorage.getItem('Campagnes'));
    } else {
      localStorage.setItem('Campagnes', JSON.stringify(this.datas));
      return JSON.parse(localStorage.getItem('Campagnes'));
    }
  }
  initBrandData() {
    if (JSON.parse(localStorage.getItem('Brands'))){
      return JSON.parse(localStorage.getItem('Brands'));
    } else {
      localStorage.setItem('Brands', JSON.stringify(this.brands));
      return JSON.parse(localStorage.getItem('Brands'));
    }
  }
  getCampagnes() {
    return JSON.parse(localStorage.getItem('Campagnes'));
  }
  getCampagneUnique(index: number) {
    const camp = JSON.parse(localStorage.getItem('Campagnes'));
    return camp[index];
  }

  getBrandById(id: number) {
    const b = JSON.parse(localStorage.getItem('Brands'));
    return b[id - 1];
  }
}
