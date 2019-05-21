import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';
import { NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { ToasterConfig } from 'angular2-toaster';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

import { TankMaintenanceService } from '../../../@core/mock/tank-maintenance.service';

@Component({
  selector: 'edit-tank-maintenance',
  templateUrl: './edit-tank-maintenance.component.html'
})
export class EditTankMaintenanceComponent implements OnInit {

  public dataForm: FormGroup;
  toastConfig: ToasterConfig;

  constructor(
    public crudApi: TankMaintenanceService,
    public fb: FormBuilder,
    private location: Location,
    private actRoute: ActivatedRoute,
    private router: Router,
    private toastrService: NbToastrService
  ) { }

  ngOnInit() {
    this.activeteDataForm();

    const id = this.actRoute.snapshot.paramMap.get('id');
    this.crudApi.GetMaintenance(id).valueChanges().subscribe(data => {
      this.dataForm.setValue(data)
    })
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

  goBack() {
    this.location.back();
  }

  // Accessing form control using getters
  get name() { return this.dataForm.get('name'); }
  get description() { return this.dataForm.get('description'); }


  submitData(){
    const toastConfig = {
      status: NbToastStatus.SUCCESS,
      destroyByClick: true,
      duration: 2000,
      hasIcon: true,
      position: NbGlobalLogicalPosition.TOP_END,
      preventDuplicates: false,
    };

    this.crudApi.UpdateMaintenance(this.dataForm.value);
    this.toastrService.success(
      this.dataForm.controls['name'].value + ' updated successfully',
      `Success`
      );
    this.router.navigate(['pages/maintenances']);
  }

}
