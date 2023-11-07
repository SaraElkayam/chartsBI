import { Component, Input } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-present-charts',
  templateUrl: './present-charts.component.html',
  styleUrls: ['./present-charts.component.css']
})
export class PresentChartsComponent {
  @Input()
  title: string;

  @Input()
  chartOption: EChartsOption;

}
