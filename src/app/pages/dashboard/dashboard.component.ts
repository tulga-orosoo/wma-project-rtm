import { Component, ViewChild, ContentChild, OnInit, ElementRef,AfterViewInit, OnDestroy  } from '@angular/core';
import { MessageService } from '../../@core/mock/message.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { NbThemeService } from '@nebular/theme';


@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements AfterViewInit, OnDestroy, OnInit {
  options: any = {};
  themeSubscription: any;

  message:String

  constructor(
    private theme: NbThemeService,
    private db: AngularFireDatabase,
    private msgService:MessageService,
    private elemReference:ElementRef
    ) {
  }

  ngOnInit(): void {
    this.msgService.sendMessage("Hello")
    this.msgService.messenger.subscribe(msg=>{
      this.message=msg
      this.elemReference.nativeElement.children[0].hidden=false
    })
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      let items = this.db.list('tank_measures/measures').valueChanges().subscribe();


      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.successLight, colors.infoLight, colors.dangerLight, colors.primaryLight, colors.warningLight, ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: echarts.tooltipBackgroundColor,
            },
          },
        },
        legend: {
          data: ['Tank1', 'Tank2', 'Tank3'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        series: [
          {
            name: 'Video ad',
            type: 'line',
            stack: 'Total amount',
            areaStyle: { normal: { opacity: echarts.areaOpacity } },
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: 'Direct interview',
            type: 'line',
            stack: 'Total amount',
            areaStyle: { normal: { opacity: echarts.areaOpacity } },
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: 'Search engine',
            type: 'line',
            stack: 'Total amount',
            label: {
              normal: {
                show: true,
                position: 'top',
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
            areaStyle: { normal: { opacity: echarts.areaOpacity } },
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  data:any = null;

  getDate() {
    let items = this.db.list('data/tanks').valueChanges().subscribe(data => {
      this.data = data;
      console.log(data);
    });
  }

}
