import { Injectable } from '@angular/core';
import {Firestore, collectionData, deleteDoc, doc, docData} from '@angular/fire/firestore';
import {collection} from '@firebase/firestore';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';
import { addDoc } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private firestore: Firestore) { }

  getUsers(): Observable<User[]>{
    const usersRef = collection(this.firestore, 'users');
    return collectionData(usersRef) as Observable<User[]>;
  }

  getUserByName(name: string): Observable<User> {
    const usersDocRef = doc(this.firestore, `users/${name}`);
    console.log(name);
    return docData(usersDocRef) as Observable<User>;
  }

  addUser(user: User){
    const usersRef =collection(this.firestore, 'users');
    addDoc(usersRef,user);
  }

  deleteUser(user:User){
    const usersDocRef = doc(this.firestore, `users/${user.Name}`);
    return deleteDoc(usersDocRef);
  }
}
