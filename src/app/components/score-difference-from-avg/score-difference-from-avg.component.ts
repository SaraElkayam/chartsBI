import { Component } from '@angular/core';
import { SurveyPatientExperienceVariablesService } from 'src/app/services/survey-patient-experience-variables.service';
import { Observable, filter, map, tap } from 'rxjs';
import { EChartsOption } from 'echarts';
import { InstitutionSize } from '../enums/institutionSize.enum';
import { PatientExperience } from 'src/app/models/patientExperience.model';


@Component({
  selector: 'app-score-difference-from-avg',
  templateUrl: './score-difference-from-avg.component.html',
  styleUrls: ['./score-difference-from-avg.component.css']
})
export class ScoreDifferenceFromAvgComponent {
  data$: Observable<Array<PatientExperience>>
  chartOption: EChartsOption;
  title: string = "הפרש ציון מהממוצע הארצי לפי מאפייני מוסד/אשפוז"
  categories: number[];
  tmpDataDifFromAvg: number[] = [];
  dataDifFromAvg: number[][] = [];
  institutionSize: InstitutionSize;

  constructor(private surveyPatientExperienceVariablesService: SurveyPatientExperienceVariablesService) {
    this.data$ = surveyPatientExperienceVariablesService.getSurveyPatientExperienceVariablesAPI()
      .pipe(
        map(data => data.filter((x: any) => x.comparisonGroup == 'גודל מוסד'))
      )

  }
  ngOnInit() {
    this.data$.subscribe((data) => {
      console.log(data);
      this.categories = data.map((y: any) => y.subject).filter((value: any, index: any, self: any) => self.indexOf(value) === index);
      Object.values(InstitutionSize).forEach(value => {
        this.tmpDataDifFromAvg =
          data.filter((val: any) => val.comparisonValue == value)
            .map((obj: any) => obj.avgDiff);
        this.dataDifFromAvg.push(this.tmpDataDifFromAvg);
      });

      this.setOption();
    });

  }
  private setOption(): void {
    this.chartOption = {
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: [InstitutionSize.medumLarge, InstitutionSize.centerOn, InstitutionSize.small]
      },
      xAxis: {
        type: 'category',
        data: this.categories,
      },
      yAxis: {
        name: 'הפרש מהממוצע הארצי',
        nameLocation: 'end',
        type: 'value',
      },

      series: this.dataDifFromAvg.map((data, index) => ({
        name: Object.values(InstitutionSize)[index],
        type: 'bar',
        data: data,
      })),
    };
  }
}
