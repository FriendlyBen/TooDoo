import { Injectable } from '@angular/core';
import {Firestore, collectionData, deleteDoc} from '@angular/fire/firestore';
import {collection} from '@firebase/firestore';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';
import { addDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  auth = getAuth();

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
    const usersRef =collection(this.firestore, 'users');
    addDoc(usersRef,user);
  }

  deleteUser(user:User){
    const usersDocRef = doc(this.firestore, `users/${user.Name}`);
    return deleteDoc(usersDocRef);
  }

  register(email: string, password: string){
    createUserWithEmailAndPassword(this.auth,email,password)
    .then((userCredential) =>{
      const user = userCredential.user;
      console.log('User successfully registered!');
    })
    .catch((error) =>{
      const errorCode = error.code;
      const errorMessage= error.message;
    })
  }

  signin(email: string, password: string){
    signInWithEmailAndPassword(this.auth,email,password)
    .then((userCredentail)=>{
      const user = userCredentail.user;
      console.log("User successfully signed in!");
    })
    .catch((error)=>{
      const errorCode = error.code;
      const errorMessage = error.message;
    })
  }
}
