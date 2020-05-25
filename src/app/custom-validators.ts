import * as moment from 'moment';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static dateMinimum(date: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value == null) {
        return null;
      }
      const FORMAT_DATE = 'YYYY-MM-DD';
      const controlDate = moment(control.value, FORMAT_DATE);

      if (!controlDate.isValid()) {
        return null;
      }

      const validationDate = moment(date);

      return controlDate.isAfter(validationDate)
        ? null
        : {
            'date-minimum': {
              'date-minimum': validationDate.format(FORMAT_DATE),
              actual: controlDate.format(FORMAT_DATE),
            },
          };
    };
  }
  static dateMaximum(date: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value == null) {
        return null;
      }
      const FORMAT_DATE = 'YYYY-MM-DD';
      const controlDate = moment(control.value, FORMAT_DATE);

      if (!controlDate.isValid()) {
        return null;
      }

      const validationDate = moment(date);

      return controlDate.isBefore(validationDate)
        ? null
        : {
            'date-maximum': {
              'date-maximum': validationDate.format(FORMAT_DATE),
              actual: controlDate.format(FORMAT_DATE),
            },
          };
    };
  }
}
