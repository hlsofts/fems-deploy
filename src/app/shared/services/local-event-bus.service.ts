import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalEventBusService {
  private id = new BehaviorSubject(0);
  currentId = this.id.asObservable();

  constructor() { }  

  changeId(id: number) {
    this.id.next(id);
  }
}
