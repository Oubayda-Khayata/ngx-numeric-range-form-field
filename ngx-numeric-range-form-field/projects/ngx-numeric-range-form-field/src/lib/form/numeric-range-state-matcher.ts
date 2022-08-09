import {
	FormControl,
	FormGroup,
	FormGroupDirective,
	NgForm
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class NumericRangeStateMatcher implements ErrorStateMatcher {
	isErrorState(
		control: FormControl | null,
		form: FormGroup | FormGroupDirective | NgForm | null,
		minimumControlName = 'minimum',
		maximumControlName = 'maximum'
	): boolean {
		if (!control.parent && form instanceof FormGroup) {
			const minimumControl = form.get(minimumControlName) as FormControl;
			const maximumControl = form.get(maximumControlName) as FormControl;

			const isFormInvalid = form.touched && form.invalid;

			const areFormControlsInvalid =
				this.isControlTouchedInvalid(minimumControl) ||
				this.isControlTouchedInvalid(maximumControl);

			return isFormInvalid || areFormControlsInvalid;
		}

		return control.touched && control.invalid;
	}

	private isControlTouchedInvalid(control: FormControl): boolean {
		return control.touched && control.invalid;
	}
}
