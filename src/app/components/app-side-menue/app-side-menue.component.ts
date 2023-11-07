import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-side-menue',
  templateUrl: './app-side-menue.component.html',
  styleUrls: ['./app-side-menue.component.css']
})
export class AppSideMenueComponent {
  constructor(private route: Router) { }

  navigateToHomePage():void{
    this.route.navigate(["/homePage"])
  }
}
