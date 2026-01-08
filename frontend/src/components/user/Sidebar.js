'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: 'Profile', href: '/user/dashboard/profile' },
    { name: 'Job Openings', href: '/user/dashboard/job-openings' },
    { name: 'Applied Jobs', href: '/user/dashboard/applied-jobs' },
    { name: 'Rejected Jobs', href: '/user/dashboard/rejected-jobs' },
  ];

  return (
    <div className="h-full p-4">
      <h2 className="text-xl font-bold mb-6">User Dashboard</h2>

      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block px-4 py-2 rounded ${
              pathname === link.href
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
