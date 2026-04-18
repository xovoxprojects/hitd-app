// src/app/dashboard/courses/page.tsx
"use client";
import { MOCK_COURSES } from '@/lib/mockData';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function CoursesPage() {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Your Training Library</h1>
        <p className="text-muted">Master the systems and scripts used by top creators.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_COURSES.map((course) => (
          <Card key={course.id} className="flex flex-col h-full bg-surface border-border overflow-hidden">
            <div className="relative h-48 bg-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
              {course.locked && (
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex flex-col items-center justify-center text-white p-4 text-center">
                  <svg className="w-8 h-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="font-semibold text-lg">Locked</span>
                  <span className="text-sm text-slate-300">Upgrade plan to access</span>
                </div>
              )}
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="default" className="text-[10px]">{course.modules} Modules</Badge>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2 leading-tight">{course.title}</h3>
              <p className="text-muted text-sm mb-6 flex-1">{course.description}</p>
              
              <Button 
                variant={course.locked ? 'secondary' : 'primary'} 
                className="w-full"
                disabled={course.locked}
              >
                {course.locked ? 'Unlock Course' : 'Continue Learning'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
