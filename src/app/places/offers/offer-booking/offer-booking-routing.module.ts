import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfferBookingPage } from './offer-booking.page';

const routes: Routes = [
  {
    path: '',
    component: OfferBookingPage,
  },
  {
    path: '',
    redirectTo: '/places/tabs/discover',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfferBookingPageRoutingModule {}
