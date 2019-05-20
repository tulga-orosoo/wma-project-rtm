import { Injectable } from '@angular/core';
import { TankMaintenance } from '../data/tank-maintenances';  // tankMaintenance data type interface class
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database, Data list and Single object
@Injectable({
providedIn: 'root'
})
export class TankMaintenanceService {
tankMaintenancesRef: AngularFireList<any>;    // Reference to tankMaintenance data list, its an Observable
tankMaintenanceRef: AngularFireObject<any>;   // Reference to tankMaintenance object, its an Observable too
// Inject AngularFireDatabase Dependency in Constructor
constructor(private db: AngularFireDatabase) { }
// Create tankMaintenance
AddMaintenance(tm: TankMaintenance) {
this.tankMaintenancesRef.push({
name: tm.name,
description: tm.description,
// date: tm.date,
})
}
// Fetch Single tankMaintenance Object
GetMaintenance(id: string) {
this.tankMaintenanceRef = this.db.object('data/tank-maintenances/' + id);
return this.tankMaintenanceRef;
}
// Fetch tankMaintenances List
GetMaintenancesList() {
this.tankMaintenancesRef = this.db.list('data/tank-maintenances/');
return this.tankMaintenancesRef;
}
// Update tankMaintenance Object
UpdateMaintenance(tm: TankMaintenance) {
this.tankMaintenanceRef.update({
  name: tm.name,
  description: tm.description,
  date: tm.date,
})
}
// Delete tankMaintenance Object
DeleteMaintenance(id: string) {
this.tankMaintenanceRef = this.db.object('data/tank-maintenances/'+id);
this.tankMaintenanceRef.remove();
}
}
