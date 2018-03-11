import { Directive, OnInit, OnDestroy, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs';
import { EndlessSliderItem } from './endless-slider-item.directive';

@Directive({
    selector: '[endlessSlider]'
})
export class EndlessSliderDirective implements OnInit, OnDestroy {

    @Input() itemWidth: number = 300;
    @Input() itemSpace: number = 20;
    @Input() items: any[] = [];

    @Output() updateItem: EventEmitter<EndlessSliderItem[]> = new EventEmitter();

    // Click/Touch Properties
    counter$: Subscription;
    currentPosX: number = 0;
    lastPosX: number = 0;
    isClicked = false;

    // Item Properties
    sliderItemsPos: EndlessSliderItem[] = [];
    itemTotalWidth: number;
    lastItemIndex: number = 0;
    firstItemIndex: number = 0;

    constructor(private el: ElementRef) { }

    ngOnInit() {
        this.itemTotalWidth = Number(this.itemWidth) + Number(this.itemSpace);
        if (this.items.length > 0) {
            let requiredItems = Math.ceil(this.el.nativeElement.clientWidth / this.itemTotalWidth) + 5;

            while (this.items.length < requiredItems) {
                this.items = this.items.concat(this.items);
            }

            for (let index = 0; index < this.items.length; index++) {
                const item = new EndlessSliderItem(this.itemWidth);
                item.leftPos = this.itemTotalWidth * index - (2.3 * this.itemTotalWidth)
                item.attributes = this.items[index]
                this.sliderItemsPos.push(item);
            }
            this.lastItemIndex = this.items.length - 1;
            this.updateItem.emit(this.sliderItemsPos);
            this.el.nativeElement.style['overflow-x'] = "hidden";
            this.el.nativeElement.style['max-width'] = "100%";
        }
    }

    ngOnDestroy() {
        if (this.counter$) {
            this.counter$.unsubscribe();
        }
    }

    @HostListener('mousemove', ['$event']) onMouseMove(event) {
        this.currentPosX = event.screenX;
    }

    @HostListener('mouseleave', ['$event']) onMouseLeave() {
        this.isClicked = false;
        if (this.counter$) {
            this.counter$.unsubscribe();
        }
    }

    @HostListener('mousedown', ['$event']) onMouseDown(event) {
        this.lastPosX = event.screenX;
        this.currentPosX = event.screenX;
        this.isClicked = true;
        if (this.counter$) {
            this.counter$.unsubscribe();
        }

        const timer = Observable.timer(0, 20);
        this.counter$ = timer.subscribe(t => {
            const dif = this.lastPosX - this.currentPosX;
            this.setNewPos(dif);
            this.lastPosX = this.currentPosX;
        });
    }

    @HostListener('mouseup', ['$event']) onMouseUp(event) {
        this.isClicked = false;
        if (this.counter$) {
            this.counter$.unsubscribe();
        }
    }
    @HostListener('touchmove', ['$event']) onTouchMove(event) {
        this.currentPosX = event.targetTouches[0].clientX;
        const dif = this.lastPosX - this.currentPosX;
        this.setNewPos(dif);
        this.lastPosX = event.targetTouches[0].clientX;
    }
    @HostListener('touchstart', ['$event']) onTouchStart(event) {
        this.lastPosX = event.targetTouches[0].clientX;
        this.currentPosX = event.targetTouches[0].clientX;
    }

    private setNewPos(dif) {
        this.itemTotalWidth = Number(this.itemWidth) + Number(this.itemSpace);
        for (let index = 0; index < this.sliderItemsPos.length; index++) {
            this.sliderItemsPos[index].leftPos = this.sliderItemsPos[index].leftPos - dif;
            this.sliderItemsPos[index].width = this.itemWidth;
        }
        for (let index = 0; index < this.sliderItemsPos.length; index++) {
            if (this.sliderItemsPos[index].leftPos < -(3 * this.itemTotalWidth)) {
                this.sliderItemsPos[index].leftPos = this.sliderItemsPos[this.lastItemIndex].leftPos + this.itemTotalWidth;
                this.lastItemIndex = index;
                this.firstItemIndex = index + 1 < this.sliderItemsPos.length - 1 ? index + 1 : 0;
            } else if (this.sliderItemsPos[index].leftPos > ((this.sliderItemsPos.length - 2) * this.itemTotalWidth)) {
                this.sliderItemsPos[index].leftPos = this.sliderItemsPos[this.firstItemIndex].leftPos - this.itemTotalWidth;
                this.firstItemIndex = index;
                this.lastItemIndex = index - 1 > 0 ? index - 1 : this.sliderItemsPos.length - 1;
            }
        }
        this.updateItem.emit(this.sliderItemsPos);
    }
}