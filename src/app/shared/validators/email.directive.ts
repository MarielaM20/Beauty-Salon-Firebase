import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { emailValidator } from './email-validator';

@Directive({
  selector: '[appEmail]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailDirective,
      multi: true
    }
  ]
})
export class EmailDirective implements OnChanges, Validator {

  @Input() appEmail: string[] = [];

  validator: ValidatorFn = () => null;

  ngOnChanges(changes: SimpleChanges): void {
    const emailChange = changes['appEmail'];
    if (emailChange) {
      this.validator = emailValidator(emailChange.currentValue);
    }
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.validator(control);
  }

}
