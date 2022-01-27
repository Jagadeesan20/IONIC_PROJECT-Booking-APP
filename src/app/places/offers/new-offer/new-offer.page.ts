import { Component, ViewChild, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonDatetime,
  LoadingController,
  PopoverController,
} from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;

  dateValue1 = '';
  dateValue2 = '';
  form: FormGroup;

  constructor(
    private poperoverCtrl: PopoverController,
    private placeservice: PlacesService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}
  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)],
      }),
      price: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)],
      }),
      dateFrom: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      dateTo: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
    });
  }

  formatDate1(value: string) {
    this.poperoverCtrl.dismiss();
    this.dateValue1 = format(parseISO(value), 'MMM dd yyyy');
  }
  formatDate2(value: string) {
    this.poperoverCtrl.dismiss();

    this.dateValue2 = format(parseISO(value), 'MMM dd yyyy');
  }

  onCreateOffer() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl
      .create({
        message: 'Creating Place....',
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.placeservice
          .addPlace(
            this.form.value.title,
            this.form.value.description,
            this.form.value.price,
            this.form.value.dateFrom,
            this.form.value.dateTo
          )
          .subscribe(() => {
            loadingEl.dismiss();
            this.form.reset();
            this.router.navigate(['/places/tabs/offers']);
          });
      });
  }
}
