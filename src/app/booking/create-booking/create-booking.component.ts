import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, PopoverController } from '@ionic/angular';
import { Place } from 'src/app/places/place.model';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Input() selectedPlace: Place;
  @ViewChild('f', { static: true }) form: NgForm;
  constructor(
    private modelCtrl: ModalController,
    private poperoverCtrl: PopoverController
  ) {}

  ngOnInit() {}

  onCancel() {
    this.modelCtrl.dismiss(null, 'cancel');
  }
  onBookPlace() {
    if (!this.form.valid || !this.datesValid) {
      return;
    }

    this.modelCtrl.dismiss(
      {
        bookingData: {
          firstName: this.form.value['first-name'],
          lastName: this.form.value['last-name'],
          guestNumber: this.form.value['guest-number'],
          startDate: this.form.value['date-from'],
          endDate: this.form.value['date-to'],
        },
      },
      'confirm'
    );
  }

  datesValid() {
    const startDate = new Date(this.form.value['date-from']);
    const endDate = new Date(this.form.value['date-to']);
    return endDate > startDate;
  }
}
