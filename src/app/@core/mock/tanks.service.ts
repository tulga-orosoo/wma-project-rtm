
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database'; 
import { Injectable } from '@angular/core';
import { Tank } from '../data/tanks';

@Injectable()
export class TanksService {

    tanksRef: AngularFireList<any>;
    tankRef : AngularFireObject<any>;

    constructor(private db : AngularFireDatabase) {}

    AddTank(tank: Tank)  {
        this.tanksRef.push({
            code: tank.code,
            name : tank.name,
            capacity: tank.capacity,
            typeOfTank : tank.typeOfTank,
            location : tank.location,
            description : tank.description,
            status : tank.status,
            OilType : tank.oilType

        })
    }

    //update a tank
    UpdateTank(tank: Tank){
        this.tankRef.update({
            code: tank.code,
            name : tank.name,
            capacity: tank.capacity,
            typeOfTank : tank.typeOfTank,
            location : tank.location,
            description : tank.description,
            status : tank.status,
            OilType : tank.oilType
        })
    }

    //fetch tanks
    GetTanksList(){
        this.tanksRef = this.db.list('data/tanks');
        return this.tanksRef;
    }

    //fetch a tank
    GetTank(id:string){
        this.tankRef = this.db.object('data/tanks'+id);
        return this.tankRef;
    }

    //delete tank
    DeleteTank(id:string){
        this.tankRef = this.db.object('data/tanks'+id);
        this.tankRef.remove();
    }
 
}