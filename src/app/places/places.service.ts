/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { Place } from './place.model';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface PlaceData {
  availableFrom: string;
  availableTo: string;
  description: string;
  imageUrl: string;
  price: string;
  title: string;
  userId: string;
}

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([]);

  get places() {
    return this._places.asObservable();
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(private authService: AuthService, private http: HttpClient) {}

  fetchPlaces() {
    return this.http
      .get<{ [key: string]: PlaceData }>(
        'https://ionic-angular-ae8bb-default-rtdb.firebaseio.com/offered-places.json'
      )
      .pipe(
        map((resData) => {
          const places = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              places.push(
                new Place(
                  key,
                  resData[key].title,
                  resData[key].description,
                  resData[key].imageUrl,
                  resData[key].price,
                  new Date(resData[key].availableFrom),
                  new Date(resData[key].availableTo),
                  resData[key].userId
                )
              );
            }
          }
          return places;
        }),
        tap((places) => {
          this._places.next(places);
        })
      );
  }

  getPlace(id: string) {
    return this.places.pipe(
      take(1),
      map((places) => ({ ...places.find((p) => p.id === id) }))
    );
  }

  addPlace(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    title: string,
    description: string,
    price: string,
    availableFrom: Date,
    availableTo: Date
  ) {
    let generatedId: string;
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
    return this.http
      .post<{ name: string }>(
        'https://ionic-angular-ae8bb-default-rtdb.firebaseio.com/offered-places.json',
        { ...newPlace, id: null }
      )
      .pipe(
        // eslint-disable-next-line arrow-body-style
        switchMap((resData) => {
          generatedId = resData.name;
          return this.places;
        }),
        take(1),
        tap((places) => {
          newPlace.id = generatedId;
          this._places.next(places.concat(newPlace));
        })
      );
  }

  updatePlace(placeId: string, title: string, description: string) {
    let updatedPlaces: Place[];
    return this.places.pipe(
      take(1),
      switchMap((places) => {
        const updatedPlaceIndex = places.findIndex(
          (pl) =>
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            pl.id === placeId
        );
        updatedPlaces = [...places];
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
        return this.http.put(
          `https://ionic-angular-ae8bb-default-rtdb.firebaseio.com/offered-places/${placeId}.json`,
          { ...updatedPlaces[updatedPlaceIndex], id: null }
        );
      }),
      tap(() => {
        this._places.next(updatedPlaces);
      })
    );
  }
}

// [
//   new Place(
//     'p1',
//     'Mumbai',
//     'Highest Population',
//     'https://upload.wikimedia.org/wikipedia/commons/1/14/Mumbai_Skyline_at_Night.jpg',
//     '3999',
//     new Date('2019-12-11'),
//     new Date('2019-12-12'),
//     'abc'
//   ),
//   new Place(
//     'p2',
//     'Chennai',
//     'Sweetest City',
//     'https://upload.wikimedia.org/wikipedia/commons/5/54/Chennai_Montage_New.png',
//     '2999',
//     new Date('2019-12-11'),
//     new Date('2019-12-12'),
//     'abc'
//   ),
//   new Place(
//     'p3',
//     'Coimbatore',
//     'Cool City',
//     'https://upload.wikimedia.org/wikipedia/commons/4/46/Maruthamalai_Rajagopuram_1.jpg',
//     '1999',
//     new Date('2019-12-11'),
//     new Date('2019-12-12'),
//     'abc'
//   ),
// ];
