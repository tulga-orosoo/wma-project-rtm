import { Component, OnInit } from '@angular/core';
import { TanksService } from '../../@core/mock/tanks.service'
import { Tank } from '../../@core/data/tanks';

@Component({
  selector: 'tanks',
  templateUrl: './tanks.component.html',
  styleUrls: ['./tanks.component.scss']
})
export class TanksComponent implements OnInit {

  Tanks : Tank[];
  constructor(public tankService : TanksService) { }

  ngOnInit() {

    let t = this.tankService.GetTanksList();
    t.snapshotChanges().subscribe(tank =>{
      this.Tanks = [];
      tank.forEach(item => {
        let tan = item.payload.toJSON();
        this.Tanks.push(tan as Tank);
      })
    })
  }

}
