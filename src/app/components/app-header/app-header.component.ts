import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent {
  lastUpdated$: Observable<Date>;
  constructor(private homeService: HomeService) {
    this.lastUpdated$ = homeService.currentDate$.asObservable();
    console.log("last", this.lastUpdated$)
  };
  closeMenue(): void {
    console.log("close all")
  }
}
