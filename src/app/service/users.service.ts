import { Injectable } from '@angular/core';
import {Firestore, collectionData, deleteDoc, docData} from '@angular/fire/firestore';
import {collection} from '@firebase/firestore';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';
import { addDoc, doc, getDocs, query, where } from 'firebase/firestore';


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
    const usersCollectionRef = collection(this.firestore,'users');
    const q =query(usersCollectionRef,where('Name','==',name));
    
    return new Observable<User>((observer)=>{
      getDocs(q)
      .then((querySnapshot)=>{
        if(!querySnapshot.empty){
          const user = querySnapshot.docs[0].data() as User;
          observer.next(user);
        } else{
          observer.next(undefined); //no user with that name
        }
        observer.complete();
      })
      .catch((error)=>{
        observer.error(error);
      });
    });
  }

  addUser(user: User){
    console.log(typeof user);
    const usersRef =collection(this.firestore, 'users');
    addDoc(usersRef,user);
    console.log("Successful!")
  }

  deleteUser(user:User){
    const usersDocRef = doc(this.firestore, `users/${user.Name}`);
    return deleteDoc(usersDocRef);
  }
}
