import firebase from "firebase";
import firebaseConfig from "../../config/firebase.json";

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
} else {
	firebase.app();
}

export default abstract class Storage {
	public static async upload(file: any, file_name: string) {
		await firebase.storage().ref().child(`games/${file_name}`).put(file);

		const link = await firebase
			.storage()
			.ref(`games/${file_name}`)
			.getDownloadURL();

		return link;
	}
}
