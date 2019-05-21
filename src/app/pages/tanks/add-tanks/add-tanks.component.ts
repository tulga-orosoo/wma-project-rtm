import { Component, OnInit } from '@angular/core';
import { TanksService } from '../../../@core/mock/tanks.service'
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'add-tanks',
  templateUrl: './add-tanks.component.html',
  styles: []
})
export class AddTanksComponent implements OnInit {

  public tankForm: FormGroup;
  constructor(public tankService: TanksService, public fb: FormBuilder) { }

  ngOnInit() {

    this.tankService.GetTanksList();
    this.tForm();
  }

  tForm() {
    this.tankForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(2)]],
      name: [''],
      capacity: [''],
      typeOfTank: [''],
      location: [''],
      description: [''],
      status: [''],
      oilType: ['']

    })
  }

  get code() {
    return this.tankForm.get('code');
  }
  get name() {
    return this.tankForm.get('name');
  }

  get capacity() {
    return this.tankForm.get('capacity');
  }
  get typeOfTank() {
    return this.tankForm.get('typeOfTank');

  }

  get location() {
    return [this.tankForm.get('log'), this.tankForm.get('lat')];
  }

  get description() {
    return this.tankForm.get('des');
  }

  get status() {
    return this.tankForm.get('status');
  }
  get oilType() {
    return this.tankForm.get('oilType');
  }

  onSubmit() {
    this.tankService.AddTank(this.tankForm.value)
  }

}
