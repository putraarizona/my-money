import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyCpDgqZ5njTP1_laB0CRsRroHUmmliJAME",
	authDomain: "mymoney-78ef9.firebaseapp.com",
	projectId: "mymoney-78ef9",
	storageBucket: "mymoney-78ef9.appspot.com",
	messagingSenderId: "798753458601",
	appId: "1:798753458601:web:95f2b5d0583a2ca8691cb8",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

// timestamp
const timestamp = firebase.firestore.Timestamp;
export { projectFirestore, projectAuth, timestamp };
