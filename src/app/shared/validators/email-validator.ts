import { ValidatorFn } from "@angular/forms";

export function emailValidator(domains: string[]): ValidatorFn {
  // /^[^@]{6,}@gmail\.(com|bg)$/
  const domainString = domains.join('|');
  const regex = new RegExp(`^[^@]{6,}@gmail\.(${domainString})$`);
  return (control) => {
    return (control.value === '' || regex.test(control.value)) ? null : { emailValidator: true };
  };
}