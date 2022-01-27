/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { Place } from './place.model';
import { take, map, tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([
    new Place(
      'p1',
      'Mumbai',
      'Highest Population',
      'https://upload.wikimedia.org/wikipedia/commons/1/14/Mumbai_Skyline_at_Night.jpg',
      '3999',
      '2019-12-11',
      '2019-12-12',
      'abc'
    ),
    new Place(
      'p2',
      'Chennai',
      'Sweetest City',
      'https://upload.wikimedia.org/wikipedia/commons/5/54/Chennai_Montage_New.png',
      '2999',
      '2019-12-11',
      '2019-12-12',
      'abc'
    ),
    new Place(
      'p3',
      'Coimbatore',
      'Cool City',
      'https://upload.wikimedia.org/wikipedia/commons/4/46/Maruthamalai_Rajagopuram_1.jpg',
      '1999',
      '2019-12-11',
      '2019-12-12',
      'abc'
    ),
  ]);

  get places() {
    return this._places.asObservable();
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(private authService: AuthService) {}

  getPlace(id: string) {
    return this.places.pipe(
      take(1),
      map((places) => ({ ...places.find((p) => p.id === id) }))
    );
    // return { ...this._places.find((p) => p.id === id) };
  }
  addPlace(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    title: string,
    description: string,
    price: string,
    availableFrom: string,
    availableTo: string
  ) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://upload.wikimedia.org/wikipedia/commons/4/46/Maruthamalai_Rajagopuram_1.jpg',
      price,
      availableFrom,
      availableTo,
      this.authService.userId
    );
    return this._places.pipe(
      take(1),
      delay(1000),
      tap((places) => {
        this._places.next(places.concat(newPlace));
      })
    );
  }
  updatePlace(placeId: string, title: string, description: string) {
    return this.places.pipe(
      take(1),
      delay(1000),
      tap((places) => {
        const updatedPlaceIndex = places.findIndex(
          (pl) =>
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            pl.id === placeId
        );
        const updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.UserId
        );
        this._places.next(updatedPlaces);
      })
    );
  }
}
