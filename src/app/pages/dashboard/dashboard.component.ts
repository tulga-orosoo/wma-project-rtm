import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit, OnDestroy, OnInit {
  options: any = {};
  themeSubscription: any;
  dataReady = false;
  configReady = false;
  dData = {
    tanks:[] = [],
    totalTanks: 0,
    totalCapacity: 0,
    measures:[] = [],
    lastMeasure: {},
    currentLevel: 0,
    lastDate: '',
    totalMeasurements: 0,
    totalUsers: 0,
    totalMaintenances: 0,
    tank1: {},
    tank2: {},
    tank3: {},
    chartData:{
      xAxis: [],
      chartData: [[],[],[]],
    }
  }
  tanksObs$: any;
  measurementsObs$: any;
  usersObs$: any;
  totalMObs$: any;
  maintenancesObs$: any;
  nextMeasureObs$: any;
  echartsInstance:any = null;

  formData = {
    t1Level: (Math.floor(Math.random() * 7500) + 1000),
    t2Level: (Math.floor(Math.random() * 7500) + 1000),
    t3Level: (Math.floor(Math.random() * 7500) + 1000),
  }

  constructor(
    private theme: NbThemeService,
    private db: AngularFireDatabase,
    private toastrService: NbToastrService
    ) {
  }

  ngOnInit() {
    this.getdData();
  }

  getdData() {
    this.tanksObs$ = this.db.list('data/tanks/', ref => ref.orderByChild('name')).valueChanges().subscribe(data => {
      this.dData.tanks = data;
      this.dData.totalTanks = data.length;
      this.dData.totalCapacity = 0;

      if(this.dData.tanks.length > 0) {
        this.dData.tank1 = this.dData.tanks[0];
      }

      if(this.dData.tanks.length > 1) {
        this.dData.tank2 = this.dData.tanks[1];
      }

      if(this.dData.tanks.length > 2) {
        this.dData.tank3 = this.dData.tanks[2];
      }

      for(let item of data) {
        item['capacity'] = Number(item['capacity']) || 0;
        this.dData.totalCapacity += item['capacity'];
      }

      console.log(this.dData.tanks);
    });


    this.measurementsObs$ = this.db.list('tank_measures/measures/', ref => ref.orderByKey().limitToLast(30)).snapshotChanges(['child_added'])
      .subscribe(actions => {
        this.dData.measures = [];
        this.dData.chartData.xAxis = [];
        this.dData.chartData.chartData = [[],[],[]];
        actions.forEach(action => {
          let data = action.payload.val();
          data['dateString'] = action.key;
          this.dData.measures.push(data);

          this.dData.chartData.xAxis.push(data['dateString']);
          this.dData.chartData.chartData[0].push(data['T1-L']);
          this.dData.chartData.chartData[1].push(data['T2-L']);
          this.dData.chartData.chartData[2].push(data['T3-L']);
        });

        this.updateChartData();

        if(this.dData.measures.length > 0) {
          this.dData.lastMeasure = this.dData.measures[this.dData.measures.length - 1];
          this.dData.lastMeasure['T1-L'] = Number(this.dData.lastMeasure['T1-L']) || 0;
          this.dData.lastMeasure['T2-L'] = Number(this.dData.lastMeasure['T2-L']) || 0;
          this.dData.lastMeasure['T3-L'] = Number(this.dData.lastMeasure['T3-L']) || 0;


          this.dData.currentLevel = this.dData.lastMeasure['T1-L'] + this.dData.lastMeasure['T2-L'] + this.dData.lastMeasure['T3-L'];

          let k = this.dData.lastMeasure['dateString'];
          const dateString = '20' + k.substr(0,2) + '-' + k.substr(2,2) + '-' + k.substr(4,2) + 'T' + k.substr(6,2) + ':' + k.substr(8,2) + ':00Z';
          var lastDate = new Date(dateString);

          this.dData.lastMeasure['timeString'] = lastDate.getHours() + ':' + lastDate.getMinutes();

          console.log(this.dData);
        } else {
          this.dData.lastMeasure = null;
        }
      });

    this.measurementsObs$ = this.db.list('tank_measures/measures/', ref => ref.orderByKey().limitToLast(30)).valueChanges().subscribe(data => {
      this.dData.measures = data;

    });

    this.totalMObs$ = this.db.object('tank_measures/measure_count').valueChanges().subscribe(data => {
      this.dData.totalMeasurements = Number(data) || 0;
    });

    this.usersObs$ = this.db.list('data/users').valueChanges().subscribe(data => {
      this.dData.totalUsers = data.length;
    });

    this.maintenancesObs$ = this.db.list('data/tank-maintenances').valueChanges().subscribe(data => {
      this.dData.totalMaintenances = data.length;
    });
  }

  updateChartData() {
    if(this.echartsInstance) {
      setTimeout(() => {
        this.echartsInstance.resize();
      }, 0);
    }

    this.updateOrdersChartOptions();
    console.log(this.options);
  }

  updateOrdersChartOptions() {
    const options = this.options;
    const series = this.getNewSeries(options.series, this.dData.chartData.chartData);
    const xAxis = this.getNewXAxis(options.xAxis, this.dData.chartData.xAxis);

    this.options = {
      ...options,
      xAxis,
      series,
    };
  }

  getNewSeries(series, linesData: number[][]) {
    return series.map((line, index) => {
      return {
        ...line,
        data: linesData[index],
      };
    });
  }

  getNewXAxis(xAxis, chartLabel: string[]) {
    return {
      ...xAxis,
      data: chartLabel,
    };
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;
      this.configReady = true;

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
            data: ["1905161943", "1905161943", "1905161943"],
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
            name: 'Tank 1',
            type: 'line',
            stack: 'Total amount',
            areaStyle: { normal: { opacity: echarts.areaOpacity } },
            data: [4325, 4325, 4325],
          },
          {
            name: 'Tank 2',
            type: 'line',
            stack: 'Total amount',
            areaStyle: { normal: { opacity: echarts.areaOpacity } },
            data: [4325, 4325, 4325],
          },
          {
            name: 'Tank 3',
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
            data: [4325, 4325, 4325],
          },
        ],
      };
      this.updateChartData();
    });
  }

  getTankLevel(capacity, waterLevel) {
    return Math.round((Number(waterLevel) / capacity)*100)/100
  }


  updateView() {
    if(!this.dataReady) return;
    if(!this.configReady) return;

  }

  saveLevels() {
    console.log(this.formData);

    this.nextMeasureObs$ = this.db.object('tank_measures/next-measure').valueChanges().subscribe(data => {
      this.nextMeasureObs$.unsubscribe();
      let newData = {
        'T1-L': this.formData.t1Level,
        'T1-W': (Math.floor(Math.random() * 30) + 1),
        'T1-t1': (Math.floor(Math.random() * 40) + 1),
        'T1-t2': (Math.floor(Math.random() * 40) + 1),
        'T1-t3': (Math.floor(Math.random() * 40) + 1),
        'T1-t4': (Math.floor(Math.random() * 40) + 1),
        'T1-t5': (Math.floor(Math.random() * 40) + 1),
        'T2-L': this.formData.t2Level,
        'T2-W': (Math.floor(Math.random() * 30) + 1),
        'T2-t1': (Math.floor(Math.random() * 40) + 1),
        'T2-t2': (Math.floor(Math.random() * 40) + 1),
        'T2-t3': (Math.floor(Math.random() * 40) + 1),
        'T2-t4': (Math.floor(Math.random() * 40) + 1),
        'T2-t5': (Math.floor(Math.random() * 40) + 1),
        'T3-L': this.formData.t3Level,
        'T3-W': (Math.floor(Math.random() * 30) + 1),
        'T3-t1': (Math.floor(Math.random() * 40) + 1),
        'T3-t2': (Math.floor(Math.random() * 40) + 1),
        'T3-t3': (Math.floor(Math.random() * 40) + 1),
        'T3-t4': (Math.floor(Math.random() * 40) + 1),
        'T3-t5': (Math.floor(Math.random() * 40) + 1),
      }
      this.db.object('tank_measures/measures/'+data).set(newData).then(r => {
        this.toastrService.success(
          'New measurement added successfully',
          `Success`
          );
          this.formData = {
            t1Level: (Math.floor(Math.random() * 7500) + 1000),
            t2Level: (Math.floor(Math.random() * 7500) + 1000),
            t3Level: (Math.floor(Math.random() * 7500) + 1000),
          }
      });
      console.log('tank_measures/measures/'+data);
      console.log(newData);
    });
  }

  onChartInit(instance:any) {
    this.echartsInstance = instance;
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
    this.tanksObs$.unsubscribe();
    this.measurementsObs$.unsubscribe();
    this.usersObs$.unsubscribe();
    this.totalMObs$.unsubscribe();
    this.maintenancesObs$.unsubscribe();
  }


}
