import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Booking } from './booking.model';
import { BookingService } from './booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit, OnDestroy {
  loadedBooking: Booking[];
  private bookingSub: Subscription;
  constructor(
    private bookingService: BookingService,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    this.bookingSub = this.bookingService.bookings.subscribe((booking) => {
      this.loadedBooking = booking;
    });
  }
  onCancelBooking(bookingId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    this.loadingCtrl
      .create({
        message: 'canceling....',
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.bookingService.CancelBooking(bookingId).subscribe(() => {
          loadingEl.dismiss();
          this.router.navigate(['places/tabs/discover']);
        });
      });
  }
  ngOnDestroy() {
    if (this.bookingSub) {
      this.bookingSub.unsubscribe();
    }
  }
}
