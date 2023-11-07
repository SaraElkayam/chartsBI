import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NursingByAgeComponent } from './components/nursing-by-age/nursing-by-age.component';
import { PercentNursingByAgeComponent } from './components/percent-nursing-by-age/percent-nursing-by-age.component';
import { ScoreDifferenceFromAvgComponent } from './components/score-difference-from-avg/score-difference-from-avg.component';
import { HomePageComponent } from './components/home-page/home-page.component';


const routes: Routes = [
  { path: 'homePage', component: HomePageComponent },
  { path: 'nusingByAge', component: NursingByAgeComponent },
  { path: 'percentNusingByAge', component: PercentNursingByAgeComponent },
  { path: 'scoreDifferenceFromAvgComponent', component: ScoreDifferenceFromAvgComponent },
  { path: '', redirectTo: '/homePage', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
