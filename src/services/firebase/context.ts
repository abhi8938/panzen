import React from 'react';

export interface firebaseContextInterface {
  value:any
}

const FirebaseContext = React.createContext<firebaseContextInterface | null>(null);

export default FirebaseContext;
