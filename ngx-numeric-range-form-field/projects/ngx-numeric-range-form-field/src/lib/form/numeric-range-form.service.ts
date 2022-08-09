import { Injectable } from '@angular/core';
import {
	AsyncValidatorFn,
	FormControl,
	FormGroup,
	ValidatorFn
} from '@angular/forms';
import { numericRangeValues } from './numeric-range.validator';

@Injectable()
export class NumericRangeFormService {
	private form: FormGroup;
	private minimumControlName = 'minimum';
	private maximumControlName = 'maximum';

	constructor() {
		this.form = new FormGroup({});
	}

	get minimumControl(): FormControl {
		return this.form.get(this.minimumControlName) as FormControl;
	}

	get maximumControl(): FormControl {
		return this.form.get(this.maximumControlName) as FormControl;
	}

	get formGroup(): FormGroup {
		return this.form;
	}

	init(minimumControlName = 'minimum', maximumControlName = 'maximum', updateOn: 'blur' | 'change' | 'submit' = 'change'): FormGroup {
		this.minimumControlName = minimumControlName;
		this.maximumControlName = maximumControlName;
		this.form.addControl(this.minimumControlName, new FormControl(null, { updateOn }));
		this.form.addControl(this.maximumControlName, new FormControl(null, { updateOn }));
		this.form.setValidators(numericRangeValues(this.minimumControlName, this.maximumControlName));
		return this.form;
	}

	setSyncValidators(validator: ValidatorFn): void {
		if (!validator) {
			return;
		}

		this.minimumControl.addValidators(validator); // sets the validators on child control
		this.maximumControl.addValidators(validator); // sets the validators on child control
		this.formGroup.updateValueAndValidity();
	}

	setAsyncValidators(asyncValidator: AsyncValidatorFn): void {
		if (!asyncValidator) {
			return;
		}

		this.minimumControl.addAsyncValidators(asyncValidator);
		this.maximumControl.addAsyncValidators(asyncValidator);
		this.formGroup.updateValueAndValidity();
	}
}
