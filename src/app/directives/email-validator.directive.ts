import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidatorFn, Validator, FormControl } from '@angular/forms';
import { AdminService } from '../services/admin.service';
// validation function

function validateJuriNameFactory(adminService: AdminService, username: string[]): ValidatorFn {
    return (c: AbstractControl) => {

        adminService.GetEmails().subscribe(
            data => {
                username = data;
            });
        let isValid = username.includes(c.value);

        if (isValid) {
            return {
                matchemail: {
                    valid: false
                }
            };
        } else {
            return null;
        }

    }
}


@Directive({
    selector: '[matchemail]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true }
    ]
})
export class EmailValidatorDirective implements Validator {
    validator: ValidatorFn;
    usernames: string[] = [];
    constructor(private adminService: AdminService) {
        this.validator = validateJuriNameFactory(adminService, this.usernames);
    }

    validate(c: FormControl) {
        return this.validator(c);
    }

}