/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places: Place[] = [
    new Place(
      'p1',
      'Mumbai',
      'Highest Population',
      'https://upload.wikimedia.org/wikipedia/commons/1/14/Mumbai_Skyline_at_Night.jpg',
      '3999',
      '2019-12-11',
      '2019-12-12'
    ),
    new Place(
      'p2',
      'Chennai',
      'Sweetest City',
      'https://upload.wikimedia.org/wikipedia/commons/5/54/Chennai_Montage_New.png',
      '2999',
      '2019-12-11',
      '2019-12-12'
    ),
    new Place(
      'p3',
      'Coimbatore',
      'Cool City',
      'https://upload.wikimedia.org/wikipedia/commons/4/46/Maruthamalai_Rajagopuram_1.jpg',
      '1999',
      '2019-12-11',
      '2019-12-12'
    ),
  ];

  get places() {
    return [...this._places];
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor() {}
  getPlace(id: string) {
    return { ...this._places.find((p) => p.id === id) };
  }
}
