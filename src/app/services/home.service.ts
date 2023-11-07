import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

 public currentDate$: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date('2023-11-07T14:00:00'));
 
}
