import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidatorFn, Validator, FormControl } from '@angular/forms';
import { AdminService } from '../services/admin.service';
// validation function

function validateJuriNameFactory(adminService: AdminService, username: string[]): ValidatorFn {
    return (c: AbstractControl) => {

        adminService.GetUserNames().subscribe(
            data => {
                username = data;
            });
        let isValid = username.includes(c.value);

        if (isValid) {
            return {
                matchusername: {
                    valid: false
                }
            };
        } else {
            return null;
        }

    }
}


@Directive({
    selector: '[matchusername]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: CustomValidatorDirective, multi: true }
    ]
})
export class CustomValidatorDirective implements Validator {
    validator: ValidatorFn;
    usernames: string[] = [];
    constructor(private adminService: AdminService) {
        this.validator = validateJuriNameFactory(adminService, this.usernames);
    }

    validate(c: FormControl) {
        return this.validator(c);
    }

}