'use client';

import { useEffect, useState } from 'react';
import { AlertCircle, Building2, MapPin, Briefcase } from 'lucide-react';
import { apiFetch } from '@/utils/api';

export default function RejectedJobsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ FIX: Use /candidates/me to get user's candidate profile from Candidate model
    // The Candidate model is the source of truth for applications (NOT Application model)
    // ✅ CRITICAL: Disable cache to ensure fresh data is always displayed
    apiFetch('/candidates/me', { cache: 'no-store' })
      .then((res) => {
        if (res.success && res.candidates && Array.isArray(res.candidates)) {
          // ✅ UPDATE: Backend now returns candidates array
          // Filter to show only REJECTED jobs
          const rejectedJobs = res.candidates.filter(
            (candidate) => candidate.status === 'REJECTED' && candidate.job
          );
          setApplications(rejectedJobs);
        } else {
          setApplications([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch rejected applications:', err);
        setApplications([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-slate-200 rounded w-1/4 animate-pulse"></div>
        <div className="grid grid-cols-1 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-slate-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Rejected Applications</h1>
        <p className="text-slate-600">Review positions where your application was not selected</p>
      </div>

      {applications.length === 0 ? (
        // UI improvement only – no logic change
        <div className="text-center py-16 bg-slate-50 rounded-xl border border-dashed border-slate-300">
          <Briefcase className="mx-auto mb-4 text-slate-400" size={48} />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No rejected applications</h3>
          <p className="text-slate-600">Keep applying to find your perfect match</p>
        </div>
      ) : (
        // UI improvement only – no logic change
        <div className="grid grid-cols-1 gap-4">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white border border-red-200 rounded-xl p-6 hover:shadow-lg transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-slate-900 mb-2">
                    {app.job?.title}
                  </h2>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Building2 size={16} className="text-slate-400" />
                      <span className="text-sm">{app.job?.company}</span>
                    </div>
                    {app.job?.location && (
                      <div className="flex items-center gap-2 text-slate-600">
                        <MapPin size={16} className="text-slate-400" />
                        <span className="text-sm">{app.job.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-red-100">
                <AlertCircle size={16} className="text-red-600" />
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
                  Rejected
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
