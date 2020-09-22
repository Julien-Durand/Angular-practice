import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-list-data',
  templateUrl: './list-data.component.html',
  styleUrls: ['./list-data.component.scss']
})
export class ListDataComponent implements OnInit {
  campagnes: any;
  searchText: string;
  selectText: string;
  brands: any;

  constructor(private router: Router,
              private Data: DataService) {
  }

  ngOnInit(): void {
    this.campagnes = this.Data.initCampagneData();
    this.brands = this.Data.initBrandData();
  }


   onClickIdCampagne(id: number, index: number) {
    this.router.navigate(['Campagne', index]);
  }

}
