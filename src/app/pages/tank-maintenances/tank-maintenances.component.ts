import { Component, OnInit } from '@angular/core';
import { TankMaintenanceService } from '../../@core/mock/tank-maintenance.service';
import { TankMaintenance } from '../../@core/data/tank-maintenances';

@Component({
  selector: 'tank-maintenances',
  templateUrl: './tank-maintenances.component.html'
})
export class TankMaintenancesComponent implements OnInit {

  maintenances: TankMaintenance[];
  hideWhenNoData: boolean = false;
  noData: boolean = false;
  preLoader: boolean = true;

  constructor(
    public crudApi: TankMaintenanceService
  ) { }

  ngOnInit() {
    this.dataState(); // Initialize student's list, when component is ready
    let s = this.crudApi.GetMaintenancesList();
    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.maintenances = [];
      data.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.maintenances.push(a as TankMaintenance);
      })
    })
  }

  dataState() {
    this.crudApi.GetMaintenancesList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if (data.length <= 0) {
        this.hideWhenNoData = false;
        this.noData = true;
      } else {
        this.hideWhenNoData = true;
        this.noData = false;
      }
    })
  }

    // Method to delete student object
  delete(data) {
    if (window.confirm('Are sure you want to delete this data ?')) { // Asking from user before Deleting student data.
    this.crudApi.DeleteMaintenance(data.$key) // Using Delete student API to delete student.

    }
  }
}
