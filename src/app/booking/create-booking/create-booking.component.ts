import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
  // @ViewChild()
  constructor(
    private modelCtrl: ModalController,
    private poperoverCtrl: PopoverController
  ) {}

  ngOnInit() {}

  onCancel() {
    this.modelCtrl.dismiss(null, 'cancel');
  }
  onBookPlace() {
    this.modelCtrl.dismiss({ message: 'This is a dummy message!' }, 'confirm');
  }
}
