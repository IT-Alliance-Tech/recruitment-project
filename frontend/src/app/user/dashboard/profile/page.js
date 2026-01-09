'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, FileCheck, TrendingUp, Award, AlertCircle } from 'lucide-react';
import { apiFetch } from '@/utils/api';

export default function ProfilePage() {
  const [counts, setCounts] = useState({
    applied: 0,
    rejected: 0,
    selected: 0,
  });

  useEffect(() => {
    apiFetch('/applications')
      .then((res) => {
        const apps = res.applications || [];

        setCounts({
          applied: apps.filter(a => a.status === 'Applied').length,
          rejected: apps.filter(a => a.status === 'Rejected').length,
          selected: apps.filter(a => a.status === 'Selected').length,
        });
      })
      .catch(console.error);
  }, []);

  const statCards = [
    {
      label: 'Applied',
      value: counts.applied,
      icon: FileCheck,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconBg: 'bg-blue-600',
      textColor: 'text-blue-600',
      description: 'Active applications',
    },
    {
      label: 'Selected',
      value: counts.selected,
      icon: CheckCircle2,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      iconBg: 'bg-green-600',
      textColor: 'text-green-600',
      description: 'Successful outcomes',
    },
    {
      label: 'Rejected',
      value: counts.rejected,
      icon: XCircle,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      iconBg: 'bg-red-600',
      textColor: 'text-red-600',
      description: 'Closed applications',
    },
  ];

  const totalApplications = counts.applied + counts.rejected + counts.selected;
  const successRate = totalApplications > 0 ? ((counts.selected / totalApplications) * 100).toFixed(1) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-slate-900 rounded-xl shadow-lg">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900">Profile Overview</h1>
              <p className="text-slate-600 mt-1">Track your application status and career progress</p>
            </div>
          </div>

          {/* Quick Stats Bar */}
          {totalApplications > 0 && (
            <div className="mt-6 inline-flex items-center gap-8 px-8 py-5 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="text-center">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">Total Applications</p>
                <p className="text-3xl font-bold text-slate-900">{totalApplications}</p>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="text-center">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">Success Rate</p>
                <p className="text-3xl font-bold text-green-600">{successRate}%</p>
              </div>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="bg-white rounded-2xl p-7 border border-gray-200 shadow-sm">
                <div className="flex items-start justify-between mb-5">
                  <div className={`p-3.5 ${card.iconBg} rounded-xl shadow-md`}>
                    <Icon className="text-white" size={28} />
                  </div>
                  <div className={`px-3 py-1.5 ${card.bgColor} ${card.borderColor} border rounded-lg`}>
                    <Award className={`w-4 h-4 ${card.textColor}`} />
                  </div>
                </div>
                
                <p className="text-sm text-gray-500 font-semibold uppercase tracking-wide mb-2">
                  {card.label}
                </p>
                
                <p className="text-5xl font-bold text-slate-900 mb-2">
                  {card.value}
                </p>

                <p className="text-sm text-gray-500 mb-4">{card.description}</p>

                {/* Progress Bar */}
                {totalApplications > 0 && (
                  <div className="space-y-2">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${card.iconBg}`}
                        style={{ width: `${(card.value / totalApplications) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 font-medium">
                      {totalApplications > 0 ? ((card.value / totalApplications) * 100).toFixed(0) : 0}% of total applications
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {totalApplications === 0 && (
          <div className="mt-16 text-center">
            <div className="inline-block p-10 bg-white rounded-2xl border border-gray-200 shadow-sm mb-6">
              <AlertCircle className="text-gray-300" size={64} />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Applications Yet</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Start your journey by applying to exciting opportunities and track your progress here
            </p>
          </div>
        )}

        {/* Insights Section */}
        {totalApplications > 0 && (
          <div className="mt-10">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-slate-900 rounded-full"></div>
                Quick Insights
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="text-xs text-blue-600 font-bold uppercase tracking-wide mb-2">Active Pipeline</p>
                  <p className="text-4xl font-bold text-blue-700 mb-1">{counts.applied}</p>
                  <p className="text-sm text-blue-600">applications in progress</p>
                </div>
                
                <div className="p-6 bg-green-50 rounded-xl border border-green-100">
                  <p className="text-xs text-green-600 font-bold uppercase tracking-wide mb-2">Win Rate</p>
                  <p className="text-4xl font-bold text-green-700 mb-1">{successRate}%</p>
                  <p className="text-sm text-green-600">of completed applications</p>
                </div>
                
                <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-xs text-slate-600 font-bold uppercase tracking-wide mb-2">Total Reach</p>
                  <p className="text-4xl font-bold text-slate-700 mb-1">{totalApplications}</p>
                  <p className="text-sm text-slate-600">opportunities explored</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}