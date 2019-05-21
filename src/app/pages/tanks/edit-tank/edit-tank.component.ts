import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';
import { NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { ToasterConfig } from 'angular2-toaster';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { ToastrService } from 'ngx-toastr';
import { TanksService } from '../../../@core/mock/tanks.service'


@Component({
  selector: 'edit-tank',
  templateUrl: './edit-tank.component.html',
  
})
export class EditTankComponent implements OnInit {

  public editTankForm: FormGroup;
  
  constructor( 
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private router: Router,
    private location : Location,
    private tankService: TanksService,
    private toastr: NbToastrService 
    ) { }

  ngOnInit() {
    this.updateTankData();
    const id  = this.actRoute.snapshot.paramMap.get('id');
    this.tankService.GetTank(id).valueChanges().subscribe(data =>{
      this.editTankForm.setValue(data);
    })
  }

  get code() {
    return this.editTankForm.get('code');
  }
  get name() {
    return this.editTankForm.get('name');
  }

  get capacity() {
    return this.editTankForm.get('capacity');
  }
  get typeOfTank() {
    return this.editTankForm.get('typeOfTank');

  }

  get description() {
    return this.editTankForm.get('des');
  }

  get status() {
    return this.editTankForm.get('status');
  }
  get oilType() {
    return this.editTankForm.get('oilType');
  }
  updateTankData(){

    this.editTankForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(2)]],
      name: [''],
      capacity: [''],
      typeOfTank: [''],
      description: [''],
      status: [''],
      oilType: ['']
    })
  }

  submitData(){
    this.tankService.UpdateTank(this.editTankForm.value);
    this.toastr.success(this.editTankForm.controls['code'].value+'updated successfully', 'Success')

    this.router.navigate(['/pages/tanks']);
  }
  goBack() {
    this.router.navigate(['/pages/tanks']);
  }

}
