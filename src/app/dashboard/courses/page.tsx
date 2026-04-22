"use client";
import { MOCK_COURSES } from '@/lib/mockData';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function CoursesPage() {
  const { data: session } = useSession();
  const plan = session?.user?.plan || "none";
  
  // Only allow Pro ($49.99) and Elite ($499)
  const isUnlocked = plan === "pro" || plan === "elite";

  return (
    <div className="animate-in fade-in duration-500 pb-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Tu Academia</h1>
        <p className="text-muted">Proteje tus redes de suspensiones e inhabilitaciones permanentes</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_COURSES.map((course) => {
          // If the plan is not unlocked, force locked state. Otherwise respect course.locked.
          const isCourseLocked = !isUnlocked || course.locked;

          return (
            <Card key={course.id} className="flex flex-col h-full bg-surface border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48 bg-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                {isCourseLocked && (
                  <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex flex-col items-center justify-center text-white p-4 text-center">
                    <svg className="w-8 h-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="font-semibold text-lg">Bloqueado</span>
                    <span className="text-sm text-slate-300">Mejora tu plan para acceder</span>
                  </div>
                )}
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="default" className="text-[10px]">{course.modules} Módulos</Badge>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 leading-tight">{course.title}</h3>
                <p className="text-muted text-sm mb-6 flex-1">{course.description}</p>
                
                <Link href={isCourseLocked ? "/pricing" : "#"} className="w-full block">
                  <Button 
                    variant={isCourseLocked ? 'secondary' : 'primary'} 
                    className="w-full"
                  >
                    {isCourseLocked ? 'Desbloquear Curso' : 'Continuar Aprendiendo'}
                  </Button>
                </Link>
              </div>
            </Card>
          )
        })}
      </div>
      
      <div className="mt-16 p-10 bg-slate-900 rounded-[2rem] text-center text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-3 tracking-tight">Proteje tus redes de suspensiones e inhabilitaciones permanentes.</h3>
          <p className="text-slate-400 mb-8 font-medium">¿Dudas?</p>
          <a href="https://wa.me/15558561197" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-slate-100 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-white/10">
            <svg className="w-6 h-6 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Escríbenos a +1 (555) 856-1197
          </a>
        </div>
      </div>
    </div>
  );
}
