import { Directive, OnInit, OnDestroy, HostListener, Input, ElementRef, OnChanges } from '@angular/core';

@Directive({
    selector: '[endlessSliderItem]'
})
export class EndlessSliderItemDirective implements OnInit, OnChanges {

    @Input() endlessSliderItem: EndlessSliderItem = new EndlessSliderItem();
    @Input() itemPos: number = this.endlessSliderItem.leftPos;

    constructor(private el: ElementRef) { }

    ngOnInit() {
        this.setProperties();
    }

    ngOnChanges() {
        this.endlessSliderItem.leftPos = this.itemPos;
        this.setProperties();
    }

    private setProperties() {
        this.el.nativeElement.style.position = "absolute";
        this.el.nativeElement.style.width = this.endlessSliderItem.width + "px"
        this.el.nativeElement.style.height = "100%"
        this.el.nativeElement.style.left = this.endlessSliderItem.leftPos + "px"
    }
}

export class EndlessSliderItem {
    public width: number;
    public leftPos: number;
    public attributes: any;

    constructor(width: number = 0, leftPos: number = 0) {
        this.width = width;
        this.leftPos = leftPos;
    }
}