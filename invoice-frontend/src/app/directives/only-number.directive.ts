import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appOnlyNumber]'
})
export class OnlyNumberDirective {
  // Allow decimal numbers. The \. is only allowed once to occur
  private regex: RegExp = new RegExp(/^[0-9]+(\.[0-9]*)?$/g);
  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
  constructor(private el: ElementRef) { }
  @HostListener('contextmenu', ['$event'])
  onRightClick(event: PointerEvent): void {
    // cannot paste negative or any special value in other word disabled the pointer event
    event.preventDefault();
  }
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }

    let current: string = this.el.nativeElement.value;
    // We need this because the current value on the DOM element
    // is not yet updated with the value from this event
    let next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }

}
