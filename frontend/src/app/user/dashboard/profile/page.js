'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, FileCheck } from 'lucide-react';
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

  // UI improvement only – no logic change
  const statCards = [
    {
      label: 'Applied',
      value: counts.applied,
      icon: FileCheck,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-600',
      badgeColor: 'bg-blue-100 text-blue-800',
    },
    {
      label: 'Selected',
      value: counts.selected,
      icon: CheckCircle2,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      iconColor: 'text-green-600',
      badgeColor: 'bg-green-100 text-green-800',
    },
    {
      label: 'Rejected',
      value: counts.rejected,
      icon: XCircle,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      iconColor: 'text-red-600',
      badgeColor: 'bg-red-100 text-red-800',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Profile Overview</h1>
        <p className="text-slate-600">Track your application status across all opportunities</p>
      </div>

      {/* UI improvement only – no logic change */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className={`${card.bgColor} border ${card.borderColor} rounded-xl p-6 transition-all hover:shadow-lg`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${card.iconColor} p-3 rounded-lg bg-white`}>
                  <Icon size={24} />
                </div>
                <span className={`${card.badgeColor} text-xs font-semibold px-3 py-1 rounded-full`}>
                  Total
                </span>
              </div>
              <p className="text-slate-600 text-sm font-medium mb-1">{card.label}</p>
              <p className="text-4xl font-bold text-slate-900">{card.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
