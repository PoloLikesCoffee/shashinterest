import { useState, useEffect } from 'react';
import { database } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

export function useHistorySearch() {
	const { currentUser } = useAuth();
	const [docs, setDocs] = useState(null);

	useEffect(() => {
		const query = database.historySearch
			.where('userId', '==', currentUser.uid)
			.orderBy('createdAt');

		// delete history before last 12 hours

		// let yesterday = database.yesterday;
		// yesterday.seconds = yesterday.seconds - 24 * 60 * 60;
		let lastTwelveHours = database.yesterday;
		lastTwelveHours.seconds = lastTwelveHours.seconds - 12 * 60 * 60;
		// query
		// 	.where('createdAt', '>', lastTwelveHours)
		// 	.get()
		// 	.then(function (querySnapshote) {
		// 		querySnapshote.forEach(function (doc) {
		// 			console.log(doc.id, ' => ', doc.data());
		// 		});
		// 	})
		// 	.catch(function (error) {
		// 		console.log('Error getting documents: ', error);
		// 	});

		query
			.where('createdAt', '<', lastTwelveHours)
			.get()
			.then(function (querySnapshote) {
				querySnapshote.forEach((element) => {
					element.ref.delete();
				});
			});

		const unsub = query.onSnapshot((snap) => {
			const documents = snap.docs.map((doc) => {
				return {
					id: doc.id,
					...doc.data(),
				};
			});
			setDocs(documents);
		});
		return () => unsub();
	}, [currentUser]);

	return docs;
}
