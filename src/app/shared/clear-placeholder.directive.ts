import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[cgClearPlaceholder]'
})
export class ClearPlaceholderDirective {

  @Input() placeholder: string;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('focus')
  removePlaceholder() {
    this.renderer.removeAttribute(this.el.nativeElement, 'placeholder');
  }

  @HostListener('blur')
  addPlaceholder() {
    this.renderer.setAttribute(this.el.nativeElement, 'placeholder', this.placeholder);
  }

}
