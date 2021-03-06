import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuController, SegmentChangeEventDetail } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedPlaces: Place[];
  isLoading = false;
  listedLoadedPlaces: Place[];
  releventPlaces: Place[];
  private placesSub: Subscription;
  constructor(
    private placesService: PlacesService,
    private menuCtrl: MenuController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.placesSub = this.placesService.places.subscribe((places) => {
      this.loadedPlaces = places;
      this.releventPlaces = this.loadedPlaces;
      this.listedLoadedPlaces = this.releventPlaces.slice(1);
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.placesService.fetchPlaces().subscribe(() => {
      this.isLoading = false;
    });
  }
  onOpenMenu() {
    this.menuCtrl.toggle();
  }

  onFilterUpdate(event: any) {
    if (event.detail.value === 'all') {
      this.releventPlaces = this.loadedPlaces;
      this.listedLoadedPlaces = this.releventPlaces.slice(1);
    } else {
      this.releventPlaces = this.loadedPlaces.filter(
        (place) => place.UserId !== this.authService.userId
      );
      this.listedLoadedPlaces = this.releventPlaces.slice(1);
    }
  }
  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
}
