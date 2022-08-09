import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	form: FormGroup;

	constructor() {
		this.form = new FormGroup({
			range: new FormControl(
				{
					x: 10,
					y: 100,
				},
				[Validators.required]
			),
		});
	}

	get rangeControl(): FormControl {
		return this.form.get('range') as FormControl;
	}

	onBlur(): void {
		console.log('Value', this.rangeControl.value);
	}

	onEnter(): void {
		console.log('Enter pressed!');
		this.rangeControl.disable();
	}

	onValueChange(value: any): void {
		console.log(
			'Changed value: ',
			value,
			this.rangeControl.hasError('notValidRange')
		);

		//this.rangeControl.updateValueAndValidity();
		console.log('RANGE CONTROL', this.rangeControl);
	}
}
