import { useState, useEffect } from 'react';
import { database } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

export function useImage() {
	const { currentUser } = useAuth();
	const [docs, setDocs] = useState(null);

	useEffect(() => {
		const query = database.images.where('userId', '==', currentUser.uid);

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
