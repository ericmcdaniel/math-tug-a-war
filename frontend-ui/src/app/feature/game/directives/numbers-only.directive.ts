import { FormControl } from "@angular/forms";

/**
 * Discard all user input during the game that isn't a number or space
 */
export class NumbersOnlyFormControl extends FormControl {

  override setValue(value: string, options?: any): void {
    if (isNaN(Number(value)) || value.includes(' ')) {
      super.setValue(this.value, { ...options, emitModelToViewChange: true });
      return;
    }
    super.setValue(value, options);
  }
}
