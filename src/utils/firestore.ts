// src/utils/firestore.ts
import { auth, db } from "./firebase";
import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    Timestamp
} from 'firebase/firestore';

// interface data
export interface katalog {
    id?: string;
    title: string;
    description: string;
    status: boolean;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

// operasi CRUD
export const firestoreService = {
    // get collection ref
    getkatalogRef() {
        const uid = auth.currentUser?.uid;
        if (!uid) throw new Error('User not authenticated');
        return collection(db, 'users', uid, 'katalogs');
    },

		// create
    async addkatalog(katalog: Omit<katalog, 'id'>) {
        try {
            const katalogRef = this.getkatalogRef();
            const docRef = await addDoc(katalogRef, {
                ...katalog,
                status: false,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now()
            });
            return docRef.id;
        } catch (error) {
            console.error('Error Tambah katalog:', error);
            throw error;
        }
    },

		// read
    async getkatalogs(): Promise<katalog[]> {
        try {
            const katalogRef = this.getkatalogRef();
            const q = query(katalogRef, orderBy('updatedAt', 'desc'));
            const snapshot = await getDocs(q);
            return snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            } as katalog));
        } catch (error) {
            console.error('Error Get katalogs:', error);
            throw error;
        }
    },

		// update
    async updatekatalog(id: string, katalog: Partial<katalog>) {
        try {
            const katalogRef = this.getkatalogRef();
            const docRef = doc(katalogRef, id);
            await updateDoc(docRef, {
                ...katalog,
                updatedAt: Timestamp.now()
            });
        } catch (error) {
            console.error('Error Update katalog:', error);
            throw error;
        }
    },

		// delete
    async deletekatalog(id: string) {
        try {
            const katalogRef = this.getkatalogRef();
            const docRef = doc(katalogRef, id);
            await deleteDoc(docRef);
        } catch (error) {
            console.error('Error Delete katalog:', error);
            throw error;
        }
    },

		// update status
    async updateStatus(id: string, status: boolean) {
        try {
            const katalogRef = this.getkatalogRef();
            const docRef = doc(katalogRef, id);
            await updateDoc(docRef, { status: status, updatedAt: Timestamp.now() });
        } catch (error) {
            console.error('Error Update Status:', error);
            throw error;
        }
    }

}