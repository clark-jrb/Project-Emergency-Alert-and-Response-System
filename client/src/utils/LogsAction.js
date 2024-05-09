// import React from 'react';
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';

export const logUserAction = async ( action, userData ) => {
    try {
        console.log(userData);
        await addDoc(collection(db, 'user_logs'), {
            // userId: userData.uid,
            displayName: userData.displayName,
            email: userData.email,
            role: userData.role,
            action,
            timestamp: new Date()
        });
    } catch (error) {
        console.error(error.message);
    }
};