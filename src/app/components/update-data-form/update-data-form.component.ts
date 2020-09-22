import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-update-data-form',
  templateUrl: './update-data-form.component.html',
  styleUrls: ['./update-data-form.component.scss']
})
export class UpdateDataFormComponent implements OnInit {

  index = this.route.snapshot.params['index'];

  updateCampagne: FormGroup;
  campagne: any;
  brandsList: any;
  brandSelect: any;

  selectedItemsList = [];
  checkedIDs = [];
  mediaList = [
    {
      mediaId:1,
      value: 'Labeling/Packaging',
      isChecked: false
    },
    {
      mediaId:2,
      value: 'New Product/innovation',
      isChecked: false
    },
    {
      mediaId:3,
      value: 'OOh',
      oisChecked: false
    },
    {
      mediaId:4,
      value: 'Social media',
      isChecked: false
    },
    {
      mediaId:5,
      value: 'TVC/Online videos',
      isChecked: false
    },
    {
      mediaId:6,
      value: 'Promotions',
      isChecked: false
    },
    {
      mediaId:7,
      value: 'Radio',
      isChecked: false
    },
    {
      mediaId:8,
      value: 'Web',
      isChecked: false
    },
    {
      mediaId:9,
      value: 'Print',
      isChecked: false
    },
    {
      mediaId:10,
      value: 'Sponsorship',
      isChecked: false
    },
    {
      mediaId:11,
      value: 'Other',
      isChecked: false
    },
    {
      mediaId:12,
      value: 'Collaboration',
      isChecked: false
    }
  ];


  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private Data: DataService) { }

  ngOnInit(): void {
    this.campagne = this.Data.getCampagneUnique(this.index);

    this.brandSelect = this.campagne.brand.name;
    this.brandsList = this.Data.initBrandData();

    for (let m of this.campagne.media) {
      const data = this.mediaList.find(mediaList => mediaList.mediaId === m.mediaId);
      data.isChecked = true;
    };

    this.initForm();
    this.fetchSelectedItems();
    this.fetchCheckedIDs();
  }

  initForm() {
    this.updateCampagne = this.formBuilder.group({
      brand: [''],
      name: [this.campagne.campaignName],
      deadline: ['', Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]
    });
  }

  updateData() {
    const brand = this.updateCampagne.get('brand').value;
    const name = this.updateCampagne.get('name').value;
    const media = this.selectedItemsList;
    const deadline = this.updateCampagne.get('deadline').value;
    if (brand) {
      const newBrand = this.Data.getBrandById(brand);
      // Change value
      this.campagne.brand = newBrand;
    }
    // change values
    this.campagne.campaignName = name;
    this.campagne.media = media;
    this.campagne.decisionDeadline = deadline;

    // update the campaigns
    const campagnes = this.Data.getCampagnes();
    campagnes[this.index] = this.campagne;

    // Sav new data
    localStorage.setItem('Campagnes', JSON.stringify(campagnes));

    this.router.navigate(['/Listes']);
  }

  btnBack() {
    this.router.navigate(['/Listes']);
  }


  changeSelection() {
    this.fetchSelectedItems();
  }

  fetchSelectedItems() {
    this.selectedItemsList = this.mediaList.filter((value, index) => {
      return value.isChecked;
    });
  }
  fetchCheckedIDs() {
    this.checkedIDs = []
    this.mediaList.forEach((value, index) => {
      if (value.isChecked) {
        this.checkedIDs.push(value.mediaId);
      }
    });
  }




}
