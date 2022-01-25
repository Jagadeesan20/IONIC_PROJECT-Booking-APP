import { Component, ViewChild, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonDatetime, PopoverController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';

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

  constructor(private poperoverCtrl: PopoverController) {}
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
    console.log(this.form);
  }
}
