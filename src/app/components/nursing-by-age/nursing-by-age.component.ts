import { Component } from '@angular/core';
import { Observable, filter, map, tap } from 'rxjs';
import { NursingService } from 'src/app/services/nursing.service';
import { EChartsOption } from 'echarts';
import { Nursing } from 'src/app/models/nursing.model';
import { TypeOfNursing } from '../enums/typeOfNursing.enum';
import { AgeForNursingReport } from '../enums/ageForNursingReport.enum';


@Component({
  selector: 'app-nursing-by-age',
  templateUrl: './nursing-by-age.component.html',
  styleUrls: ['./nursing-by-age.component.css']
})
export class NursingByAgeComponent {
  title: string = "תינוקות יונקים - מגמה שנתית לפי גיל"
  data$: Observable<Array<Nursing>>;
  categories: number[];
  tmpDataForMonth: number[] = [];
  dataByMonthes: number[][] = [];
  chartOption: EChartsOption;
  typeOfNursing: TypeOfNursing;
  ageForNursingReport: AgeForNursingReport
  loopEnd: number = 12;
  loopStep: number = 3;

  constructor(private nursingService: NursingService) {
    this.data$ = nursingService.getJson()
      .pipe(
        map(data => data.filter((x: any) => x.year != null && x.measure == TypeOfNursing.fullNursing)),
      )

  }

  ngOnInit() {
    this.data$.subscribe((data) => {
      console.log(data);
      this.categories = data.map((y: any) => y.year).filter((value: any, index: any, self: any) => self.indexOf(value) === index);
      for (let i = 0; i <= this.loopEnd; i += this.loopStep) {
        if (i == 0) {
          this.tmpDataForMonth =
            data.filter((val: any) => val.age == (i + 1))
              .map((obj: any) => obj.populationRate);
        }
        else {
          this.tmpDataForMonth =
            data.filter((val: any) => val.age == i)
              .map((obj: any) => obj.populationRate);
        }
        this.dataByMonthes.push(this.tmpDataForMonth);
        if (i == 6) this.loopStep = 6;
      }
      this.setOption();
    });

  }
  private setOption(): void {
    this.chartOption = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: [AgeForNursingReport.twelveMonthes, AgeForNursingReport.sixMonthes, AgeForNursingReport.threeMonthes, AgeForNursingReport.month]
      },
      xAxis: {
        type: 'category',
        data: this.categories
      },
      yAxis: {
        name: '% מהתינוקות',
        nameLocation: 'end',
        type: 'value'
      },
      series: this.dataByMonthes.map((data, index) => ({
        name: Object.values(AgeForNursingReport)[index],
        type: 'line',
        stack: `stack ${index + 1}`,
        data: data,
      })),
    };
  }
}
