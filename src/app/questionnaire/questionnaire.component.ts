import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from '../custom-validators';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
})
export class QuestionnaireComponent implements OnInit {
  educationList: any = [
    'High school graduate,diploma or the equivalent (for example: GED)',
    'Bachelors degree',
    'Masters degree',
    'Professional degree',
    'Doctorate degree',
    'None of a above',
  ];
  employeeList: any = [
    'For-profit company or business',
    'Not-for-profit,tax-exempt,or charitable organization',
    'Local government employee (city,country,etc.)',
    'State government employee',
    'Federal government employee',
    'Self employed - own not-incorporated business,professional practice,or farm',
    'Self employed - own incorporated business,professional practice,or farm',
    'Working without pay in family business or farm ',
    'Other',
  ];
  grossList: any = [
    'Less than $14,999 ',
    '$15,000 to $24,999',
    '$25,000 to $34,999',
    '$35,000 to $49,999 ',
    '$50,000 to $74,999',
    '$75,000 to $99,999',
    '$100,000 to $149,999',
    '$150,000 to $200,000',
    '$200,000 or more',
  ];
  userForm = new FormGroup({
    gender: new FormControl(),
    birthDate: new FormControl('', [
      Validators.required,
      CustomValidators.dateMinimum('2000-01-01'),
      CustomValidators.dateMaximum('2021-01-01'),
    ]),
    ageGroup: new FormControl('', Validators.required),
    education: new FormControl('', Validators.required),
    employee: new FormControl('', Validators.required),
    gross: new FormControl('', Validators.required),
  });
  isValidFormSubmitted: boolean;
  user: any;
  select: any;
  birthDate: Date;
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {}

  onFormSubmit() {
    this.isValidFormSubmitted = false;
    if (this.userForm.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    alert('Info saved (just message)');
    this.reset();
  }

  reset() {
    this.userForm.reset({
      ageGroup: false,
      gender: false,
      birthDate: false,
      education: false,
      employee: false,
      gross: false,
    });
  }

  get f() {
    return this.userForm.controls;
  }

  submit() {
    console.log(this.userForm.value);
  }
}
