import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppSideMenueComponent } from './components/app-side-menue/app-side-menue.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { NursingByAgeComponent } from './components/nursing-by-age/nursing-by-age.component';
import { PresentChartsComponent } from './components/present-charts/present-charts.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { HttpClientModule } from '@angular/common/http';
import { PercentNursingByAgeComponent } from './components/percent-nursing-by-age/percent-nursing-by-age.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ScoreDifferenceFromAvgComponent } from './components/score-difference-from-avg/score-difference-from-avg.component';
import {MatGridListModule} from '@angular/material/grid-list';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppSideMenueComponent,
    NursingByAgeComponent,
    PresentChartsComponent,
    PercentNursingByAgeComponent,
    HomePageComponent,
    ScoreDifferenceFromAvgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatSidenavModule,
    MatIconModule,
    HttpClientModule,
    MatGridListModule,
    NgxEchartsModule.forRoot({
      /**
       * This will import all modules from echarts.
       * If you only need custom modules,
       * please refer to [Custom Build] section.
       */
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
