import firebase from 'firebase'

export const appName = 'advreact-1610-adamant'

firebase.initializeApp({
    apiKey: 'AIzaSyBlF9s8Qp784LNwNMVhwR48IT9_a9Pz0g0',
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: '',
    messagingSenderId: '397157634637'
})