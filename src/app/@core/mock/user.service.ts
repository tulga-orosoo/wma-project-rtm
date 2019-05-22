import { Injectable } from '@angular/core'
import { XUser } from '../data/user';
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class XUserService {

    constructor(private http: HttpClient) {

    }

    createUser(user: XUser): Observable<XUser> {

        //code for creating a user
        return null
    }

    serverCreateUser(user: XUser): Observable<any> {

        const xUserObject = {
            "email": user.getEmail(),
            "firstName": user.getFirstName(),
            "lastName": user.getLastName(),
            "phoneNumber": user.getPhoneNumber(),
            "photoURL": user.getPhotoURL(),
            "password": user.getPassword()
        }

        return this.http.post('https://us-central1-montorkh-rtm.cloudfunctions.net/users/user', xUserObject)
    }

    getSingleUser(id): Observable<any> {

        return this.http.get(`https://us-central1-montorkh-rtm.cloudfunctions.net/users/user?id=${id}`)
    }

    getUsers(): Observable<any> {

        let userObservable: Observable<Array<XUser>>

        //code for getting Users
        return this.http.get("https://us-central1-montorkh-rtm.cloudfunctions.net/users/")
    }

    updateUser(id,user: XUser): Observable<any> {

        const xUserObject = {
            "email": user.getEmail(),
            "firstName": user.getFirstName(),
            "lastName": user.getLastName(),
            "phoneNumber": user.getPhoneNumber(),
            "photoURL": user.getPhotoURL(),
            "password": user.getPassword()
        }

        //code for updating a user
        return this.http.put(`https://us-central1-montorkh-rtm.cloudfunctions.net/users/user?id=${id}`,xUserObject)
    }

    deleteUser(id:String): Observable<any> {

        //code for deleting a user
        return this.http.delete(`https://us-central1-montorkh-rtm.cloudfunctions.net/users/user?id=${id}`)
    }

}