import { Component } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NursingService } from 'src/app/services/nursing.service';
import { Observable, filter, map, tap } from 'rxjs';
import { Nursing } from 'src/app/models/nursing.model';
import { TypeOfNursing } from '../enums/typeOfNursing.enum';


@Component({
  selector: 'app-percent-nursing-by-age',
  templateUrl: './percent-nursing-by-age.component.html',
  styleUrls: ['./percent-nursing-by-age.component.css']
})
export class PercentNursingByAgeComponent {
  title: string = "תינוקות יונקים - אחוז הנקה לפי גיל";
  chartOption: EChartsOption;
  data$: Observable<Array<Nursing>>;
  categories: number[];
  tmpDataForNursing: number[] = [];
  dataForNursing: number[][] = [];
  typeOfNursing: TypeOfNursing;

  constructor(private nursingService: NursingService) {
    this.data$ = nursingService.getJson()
      .pipe(
        map(data => data.filter((x: any) => x.year == null)),
      )

  }
  ngOnInit() {
    this.data$.subscribe((data) => {

      this.categories = data.map((y: any) => y.age)
        .filter((value: any, index: any, self: any) => self.indexOf(value) === index);

      Object.values(TypeOfNursing).forEach(value => {
        this.tmpDataForNursing =
          data.filter((val: any) => val.measure == value)
            .map((obj: any) => obj.populationRate);
        this.dataForNursing.push(this.tmpDataForNursing);
      });
      this.setOption();
    });

  };
  private setOption(): void {
    this.chartOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
      },
      legend: {
        data: [TypeOfNursing.withoutNursing, TypeOfNursing.combinedNursing, TypeOfNursing.fullNursing],
      },
      xAxis: {
        name: 'גיל בחודשים',
        nameLocation: 'middle',
        type: 'category',
        boundaryGap: false,
        data: this.categories,
      },
      yAxis: {
        name: '% מהתינוקות',
        nameLocation: 'end',
        type: 'value',
      },
      series: this.dataForNursing.map((data, index) => ({
        name: Object.values(TypeOfNursing)[index],
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        data: data,
      })),
    };
  }

}
