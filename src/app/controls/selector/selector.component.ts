import { Component, OnInit, Input, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements AfterViewInit {

  @Input() id
  @Input() name
  @Input() title
  @Input() link
  @Input() linkQuery
  
  @Output() 
  select = new EventEmitter();

  onSelect() {
    this.elRef.nativeElement.id=this.id
    this.select.emit(this.elRef)
  }

  constructor(private elRef: ElementRef) { }

  ngAfterViewInit() {

  }

  getId = () => this.id
  getName = () => this.name
  getTitle = () => this.title

}
