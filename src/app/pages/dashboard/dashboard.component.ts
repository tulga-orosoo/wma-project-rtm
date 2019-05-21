import { Component, ViewChild, ContentChild, OnInit, ElementRef } from '@angular/core';
import { MessageService } from '../../@core/mock/message.service';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  
  message:String

  onclose(){
     console.log("Blah blah")
  }

  constructor(private msgService:MessageService,private elemReference:ElementRef){}
  
    ngOnInit(): void {
      this.msgService.sendMessage("Hello")
      this.msgService.messenger.subscribe(msg=>{
        this.message=msg
        this.elemReference.nativeElement.children[0].hidden=false
      })
    }
}
