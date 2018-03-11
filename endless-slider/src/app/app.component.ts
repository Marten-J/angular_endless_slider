import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'app';
    sliderContent: any[] = [{ color: "#e63a3a", text: "one" }, { color: "#3a76e6", text: "two" }, { color: "#3ae688", text: "three" }, { color: "#e6a23a", text: "four" }, { color: "#8d3ae6", text: "five" }, { color: "#c2e63a", text: "six" }, { color: "#4e3ae6", text: "seven" }, { color: "#e63a98", text: "eight" }]
}
