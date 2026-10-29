import { initializeApp, getApps } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  collection,
  getDocFromServer,
  onSnapshot,
} from 'firebase/firestore';
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import { Student } from '../data/rpsData.ts';

// 1. Initialize Firebase App
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// CRITICAL: Must pass firebaseConfig.firestoreDatabaseId as the second parameter
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Operation types for standard error handling
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((p) => ({
          providerId: p.providerId,
          email: p.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Probe / test connection as mandated by skill
export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline, check connection.');
      return false;
    }
    // Probe is informational, we return true if we reached server or handle accordingly
    return true;
  }
}

// ----------------- Auth helpers -----------------
export async function loginWithGoogle(): Promise<User | null> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (err) {
    console.error('Login error:', err);
    throw err;
  }
}

export async function logoutUser(): Promise<void> {
  await signOut(auth);
}

export function subscribeToAuthState(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

// ----------------- Firestore Database Services -----------------

export interface CourseProgressData {
  courseCode: string;
  completedMeetings: number[];
  currentMeeting: number;
  academicYear?: string;
  announcement?: string;
  updatedAt?: string;
}

export interface QuizSubmissionData {
  meetingId: number;
  score: number;
  correctCount: number;
  totalQuestions: number;
  studentNim?: string;
  studentName?: string;
  submittedAt?: string;
}

/**
 * Fetch all students from Firestore /students collection
 */
export async function fetchStudentsFromFirestore(): Promise<Student[]> {
  const colPath = 'students';
  try {
    const snap = await getDocs(collection(db, colPath));
    const list: Student[] = [];
    snap.forEach((d) => {
      list.push(d.data() as Student);
    });
    return list;
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, colPath);
  }
}

/**
 * Save or update a single student record in Firestore
 */
export async function saveStudentToFirestore(student: Student): Promise<void> {
  const docPath = `students/${student.id}`;
  try {
    const payload = {
      id: student.id,
      nim: student.nim,
      name: student.name,
      email: student.email || '',
      attendance: student.attendance,
      tugas: Number(student.tugas),
      keaktifan: Number(student.keaktifan),
      uts: Number(student.uts),
      uas: Number(student.uas),
      catatanDosen: student.catatanDosen || '',
      updatedAt: new Date().toISOString(),
    };
    await setDoc(doc(db, 'students', student.id), payload);
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, docPath);
  }
}

/**
 * Seed initial students into Firestore if the collection is currently empty
 */
export async function seedInitialStudentsIfEmpty(initialList: Student[]): Promise<Student[]> {
  const colPath = 'students';
  try {
    const snap = await getDocs(collection(db, colPath));
    if (snap.empty) {
      console.log('Seeding initial 8 students to Firestore...');
      for (const st of initialList) {
        await setDoc(doc(db, 'students', st.id), {
          id: st.id,
          nim: st.nim,
          name: st.name,
          email: st.email || '',
          attendance: st.attendance,
          tugas: st.tugas,
          keaktifan: st.keaktifan,
          uts: st.uts,
          uas: st.uas,
          catatanDosen: st.catatanDosen || '',
          updatedAt: new Date().toISOString(),
        });
      }
      return initialList;
    } else {
      const existing: Student[] = [];
      snap.forEach((d) => existing.push(d.data() as Student));
      // Sort by NIM or ID
      return existing.sort((a, b) => a.nim.localeCompare(b.nim));
    }
  } catch (err) {
    console.warn('Seeding fallback: using local initial list', err);
    return initialList;
  }
}

/**
 * Real-time listener for students collection
 */
export function subscribeToStudents(
  onData: (students: Student[]) => void,
  onError?: (err: Error) => void
) {
  const colPath = 'students';
  return onSnapshot(
    collection(db, colPath),
    (snap) => {
      const list: Student[] = [];
      snap.forEach((d) => list.push(d.data() as Student));
      list.sort((a, b) => a.nim.localeCompare(b.nim));
      onData(list);
    },
    (err) => {
      if (onError) onError(err);
      handleFirestoreError(err, OperationType.GET, colPath);
    }
  );
}

/**
 * Fetch course progress from Firestore
 */
export async function fetchCourseProgressFromFirestore(): Promise<CourseProgressData | null> {
  const docPath = 'course_settings/ti001';
  try {
    const snap = await getDoc(doc(db, 'course_settings', 'ti001'));
    if (snap.exists()) {
      return snap.data() as CourseProgressData;
    }
    return null;
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, docPath);
  }
}

/**
 * Save course progress to Firestore
 */
export async function saveCourseProgressToFirestore(
  completedMeetings: number[],
  currentMeeting: number = 1
): Promise<void> {
  const docPath = 'course_settings/ti001';
  try {
    await setDoc(doc(db, 'course_settings', 'ti001'), {
      courseCode: 'TI001',
      completedMeetings,
      currentMeeting,
      academicYear: 'Ganjil 2026/2027',
      announcement: 'Kelas Pengantar Teknologi Informasi Kelas A berjalan aktif di Ruang K1.8.',
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, docPath);
  }
}

/**
 * Save a quiz practice submission into Firestore
 */
export async function recordQuizSubmission(
  submission: QuizSubmissionData
): Promise<void> {
  const subId = `quiz_${submission.meetingId}_${Date.now()}`;
  const docPath = `quiz_submissions/${subId}`;
  try {
    await setDoc(doc(db, 'quiz_submissions', subId), {
      ...submission,
      submittedAt: new Date().toISOString(),
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, docPath);
  }
}
