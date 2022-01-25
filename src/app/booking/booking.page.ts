import { Component, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Booking } from './booking.model';
import { BookingService } from './booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {
  loadedBooking: Booking[];
  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.loadedBooking = this.bookingService.bookings;
  }
  onCancelBooking(offerId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
  }
}
