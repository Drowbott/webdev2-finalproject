import { db } from "../_utils/firebase";
import {
    collection,
    getDocs,
    addDoc,
    doc,
    deleteDoc,
    updateDoc,
    where,
    query,
} from "firebase/firestore";

export const getTasks = async (userId) => {
    try {
        const tasks = [];
        const itemsCollectionRef = collection(db, "items");
        const q = query(itemsCollectionRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            tasks.push({ id: doc.id, ...doc.data() });
        });

        return tasks;
    } catch (error) {
        console.error("Error getting tasks:", error);
        throw error;
    }
};

export const addTask = async (userId, task) => {
    try {
        const itemsCollectionRef = collection(db, "items");
        const docRef = await addDoc(itemsCollectionRef, task);
        return docRef.id;
    } catch (error) {
        console.error("Error adding task:", error);
        throw error;
    }
};

export const deleteTask = async (userId, taskId) => {
    try {
        const taskDocRef = doc(collection(db, "items"), taskId);
        await deleteDoc(taskDocRef);
    } catch (error) {
        console.error("Error deleting task:", error);
        throw error;
    }
};

export const updateTask = async (userId, taskId, updatedTask) => {
    try {
        const taskDocRef = doc(collection(db, "items"), taskId);
        await updateDoc(taskDocRef, updatedTask);
    } catch (error) {
        console.error("Error updating task:", error);
        throw error;
    }
};
