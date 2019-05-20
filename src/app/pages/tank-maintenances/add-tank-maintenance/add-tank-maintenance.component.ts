import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services

import { TankMaintenanceService } from '../../../@core/mock/tank-maintenance.service';

@Component({
  selector: 'add-tank-maintenance',
  templateUrl: './add-tank-maintenance.component.html'
})
export class AddTankMaintenanceComponent implements OnInit {

  public dataForm: FormGroup;
  constructor(
    public dataService: TankMaintenanceService,
    public fb: FormBuilder,       // Form Builder service for Reactive forms
  ) { }

  ngOnInit() {
    this.dataService.GetMaintenancesList();
    this.activeteDataForm();
  }

  // Reactive student form
  activeteDataForm() {
    this.dataForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    description: [''],
    // email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
    // mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  // Accessing form control using getters
  get name() { return this.dataForm.get('name'); }
  get description() { return this.dataForm.get('description'); }

  ResetForm() {
    this.dataForm.reset();
    }

    submitData() {
      this.dataService.AddMaintenance(this.dataForm.value); // Submit student data using CRUD API

      this.ResetForm();  // Reset form when clicked on reset button
      };

}
