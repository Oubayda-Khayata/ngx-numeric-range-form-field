import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const numericRangeValues = (
	minimumControlName = 'minimum',
	maximumControlName = 'maximum') => (
	group: AbstractControl
): ValidationErrors | null => {
	const max = group.get(maximumControlName).value
		? Number(group.get(maximumControlName).value)
		: null;
	const min = group.get(minimumControlName).value
		? Number(group.get(minimumControlName).value)
		: null;

	if (max !== null && min !== null) {
		if (max < min) {
			return { notValidRange: true };
		}
	}
	return null;
};
