import { ClearPlaceholderDirective } from './clear-placeholder.directive';

describe('ClearPlaceholderDirective', () => {
  const renderer: any = {
    setAttribute: _ => undefined,
    removeAttribute: _ => undefined
  };
  const element: any = {
    nativeElement: {}
  };

  it('should remove the placeholder from the element', () => {
    const directive = new ClearPlaceholderDirective(element, renderer);
    const spy = spyOn(renderer, 'removeAttribute');

    directive.removePlaceholder();
    expect(spy.calls.count()).toBe(1);
    expect(spy.calls.mostRecent().args).toEqual([element.nativeElement, 'placeholder']);
  });

  it('should add the placeholder to the element', () => {
    const directive = new ClearPlaceholderDirective(element, renderer);
    directive.placeholder = 'input something here';
    const spy = spyOn(renderer, 'setAttribute');

    directive.addPlaceholder();
    expect(spy.calls.count()).toBe(1);
    expect(spy.calls.mostRecent().args).toEqual([element.nativeElement, 'placeholder', 'input something here']);
  });
});
