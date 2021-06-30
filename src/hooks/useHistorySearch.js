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
