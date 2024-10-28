import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'ng-task-18-76534',
        appId: '1:1038027551169:web:33b0707faf4fd5b1513f40',
        storageBucket: 'ng-task-18-76534.appspot.com',
        apiKey: 'AIzaSyChiiceOU4BKvyyflw6YV8LpNGt-_rhYfI',
        authDomain: 'ng-task-18-76534.firebaseapp.com',
        messagingSenderId: '1038027551169',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
