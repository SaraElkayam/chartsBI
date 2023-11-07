import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Nursing } from '../models/nursing.model';

@Injectable({
  providedIn: 'root'
})
export class NursingService {

  constructor(private http: HttpClient) {

  }
  public getJson(): Observable<Array<Nursing>> {
    return this.http.get<Array<Nursing>>('../assets/json/nursing.json');
  }
}
