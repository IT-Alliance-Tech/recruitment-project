'use client';

import { useEffect, useState } from 'react';
import { Clock, Building2, MapPin, Briefcase, Calendar, CheckCircle } from 'lucide-react';
import { apiFetch } from '@/utils/api';

export default function AppliedJobsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch('/candidates/me', { cache: 'no-store' })
      .then((res) => {
        if (res.success && res.candidates && Array.isArray(res.candidates)) {
          const appliedJobs = res.candidates.filter(
            (candidate) => candidate.status === 'APPLIED' && candidate.job
          );
          setApplications(appliedJobs);
        } else {
          setApplications([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch applications:', err);
        setApplications([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="h-10 bg-gray-200 rounded-lg w-1/3"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="grid grid-cols-1 gap-5 mt-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 bg-white rounded-xl border border-gray-200 p-6">
                <div className="space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-10">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="p-3 bg-blue-600 rounded-xl shadow-md">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900">Applied Jobs</h1>
              <p className="text-slate-600 mt-1">Track your job applications and their current status</p>
            </div>
          </div>

          {/* Stats Bar */}
          {applications.length > 0 && (
            <div className="mt-6 inline-flex items-center gap-3 px-6 py-3 bg-white rounded-xl border border-gray-200 shadow-sm">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {applications.length} {applications.length === 1 ? 'Application' : 'Applications'} Active
                </p>
              </div>
            </div>
          )}
        </div>

        {applications.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-300 shadow-sm">
            <div className="inline-block p-8 bg-gray-50 rounded-2xl mb-5">
              <Briefcase className="text-gray-300" size={56} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No Applied Jobs Yet</h3>
            <p className="text-slate-600 max-w-md mx-auto">
              Browse available job openings and submit your applications to get started on your career journey
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-white border-2 border-gray-200 rounded-2xl p-7 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300"
              >
                {/* Job Title and Company */}
                <div className="mb-5">
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">
                    {app.job?.title}
                  </h2>
                  <div className="flex flex-wrap gap-5">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Building2 size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Company</p>
                        <span className="text-sm font-semibold text-slate-800">{app.job?.company}</span>
                      </div>
                    </div>
                    {app.job?.location && (
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-green-50 rounded-lg">
                          <MapPin size={18} className="text-green-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Location</p>
                          <span className="text-sm font-semibold text-slate-800">{app.job.location}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Job Description */}
                {app.job?.description && (
                  <div className="mb-5 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-sm text-slate-700 line-clamp-2">{app.job.description}</p>
                  </div>
                )}

                {/* Footer Section */}
                <div className="flex items-center justify-between pt-5 border-t-2 border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Clock size={18} className="text-blue-600" />
                    </div>
                    <span className="px-4 py-2 bg-blue-100 text-blue-800 text-sm font-bold rounded-lg border border-blue-200">
                      Application Submitted
                    </span>
                  </div>
                  
                  {app.appliedDate && (
                    <div className="flex items-center gap-2 text-slate-500">
                      <Calendar size={16} />
                      <span className="text-sm font-medium">
                        {new Date(app.appliedDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}