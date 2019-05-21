import { Injectable, OnInit } from '@angular/core'
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MessageService implements OnInit {

    public messenger:Observable<any>=new Observable()

    constructor() {

    }

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

    sendMessage(msg) {
        this.messenger = new Observable<any>((observer) => {
            observer.next(msg)
        })

        return this.messenger
    }

}