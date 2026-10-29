import React, { useState, useEffect } from 'react';
import { TopNav, ActiveTab } from './components/TopNav.tsx';
import { CourseHero } from './components/CourseHero.tsx';
import { RpsMeetingGrid } from './components/RpsMeetingGrid.tsx';
import { MeetingDetailModal } from './components/MeetingDetailModal.tsx';
import { GradeSimulator } from './components/GradeSimulator.tsx';
import { InteractiveLabs } from './components/InteractiveLabs.tsx';
import { ClassRosterView } from './components/ClassRosterView.tsx';
import { ReferenceSection } from './components/ReferenceSection.tsx';
import { SyllabusPrintModal } from './components/SyllabusPrintModal.tsx';
import { MeetingItem, COURSE_IDENTITY, RPS_MEETINGS } from './data/rpsData.ts';
import {
  testConnection,
  fetchCourseProgressFromFirestore,
  saveCourseProgressToFirestore,
} from './lib/firebase.ts';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('rps');
  const [selectedMeeting, setSelectedMeeting] = useState<MeetingItem | null>(null);
  const [activeLabId, setActiveLabId] = useState<string | undefined>(undefined);
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);

  // Local storage and Firestore for completed meetings checklist
  const [completedMeetings, setCompletedMeetings] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('pti_completed_meetings');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [1, 2]; // default meeting 1 & 2 completed for initial delight
  });

  // Sync with Firestore on mount
  useEffect(() => {
    async function loadProgress() {
      try {
        await testConnection();
        const cloudProgress = await fetchCourseProgressFromFirestore();
        if (cloudProgress && cloudProgress.completedMeetings) {
          setCompletedMeetings(cloudProgress.completedMeetings);
          localStorage.setItem(
            'pti_completed_meetings',
            JSON.stringify(cloudProgress.completedMeetings)
          );
        }
      } catch (err) {
        console.warn('Could not fetch cloud progress, using local state:', err);
      }
    }
    loadProgress();
  }, []);

  const handleToggleComplete = (meetingId: number) => {
    setCompletedMeetings((prev) => {
      const updated = prev.includes(meetingId)
        ? prev.filter((id) => id !== meetingId)
        : [...prev, meetingId];

      try {
        localStorage.setItem('pti_completed_meetings', JSON.stringify(updated));
      } catch {
        // ignore
      }

      // Persist to Cloud Firestore
      saveCourseProgressToFirestore(updated).catch((err) => {
        console.warn('Failed to sync progress to Firestore:', err);
      });

      return updated;
    });
  };


  const handleOpenLab = (labId: string) => {
    setActiveLabId(labId);
    setActiveTab('labs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectMeeting = (meeting: MeetingItem) => {
    setSelectedMeeting(meeting);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 selection:bg-indigo-600 selection:text-white">
      {/* 3-Zone Top Navigation Bar */}
      <TopNav
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenPrintModal={() => setShowPrintModal(true)}
        completedCount={completedMeetings.length}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {activeTab === 'rps' && (
          <>
            <CourseHero
              completedCount={completedMeetings.length}
              totalMeetings={RPS_MEETINGS.length}
              onSelectMeeting={(id) => {
                const found = RPS_MEETINGS.find((m) => m.id === id);
                if (found) setSelectedMeeting(found);
              }}
              onOpenSimulator={() => setActiveTab('simulator')}
            />

            <RpsMeetingGrid
              completedMeetings={completedMeetings}
              onToggleComplete={handleToggleComplete}
              onSelectMeeting={handleSelectMeeting}
              onOpenLab={handleOpenLab}
            />
          </>
        )}

        {activeTab === 'simulator' && <GradeSimulator />}

        {activeTab === 'labs' && <InteractiveLabs initialLabId={activeLabId} />}

        {activeTab === 'kelas' && <ClassRosterView />}

        {activeTab === 'referensi' && <ReferenceSection />}
      </main>

      {/* Meeting Detail & Quiz Modal */}
      {selectedMeeting && (
        <MeetingDetailModal
          meeting={selectedMeeting}
          onClose={() => setSelectedMeeting(null)}
          onOpenLab={handleOpenLab}
          isCompleted={completedMeetings.includes(selectedMeeting.id)}
          onToggleComplete={handleToggleComplete}
        />
      )}

      {/* Official Syllabus Print / PDF Modal */}
      {showPrintModal && (
        <SyllabusPrintModal onClose={() => setShowPrintModal(false)} />
      )}

      {/* Clean, Non-slop Academic Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="font-semibold text-slate-700">
              {COURSE_IDENTITY.courseName} ({COURSE_IDENTITY.courseCode})
            </span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <span>{COURSE_IDENTITY.credits} SKS · Ruang {COURSE_IDENTITY.room}</span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <span>{COURSE_IDENTITY.schedule} WIB</span>
          </div>

          <div className="text-center sm:text-right text-[11px] text-slate-400">
            Fakultas Ilmu Komputer & Teknologi · {COURSE_IDENTITY.studyProgram}
          </div>
        </div>
      </footer>
    </div>
  );
}
