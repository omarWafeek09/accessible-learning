// src\instructor\pages\SessionManager.ts
export interface LiveSession {
  id: string;
  title: string;
  courseName: string;
  scheduledAt: Date;
  duration: number;
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
  studentsCount: number;
  streamUrl?: string;
  description?: string;
}

export interface SessionAppointment {
  id: string;
  sessionId: string;
  studentId: string;
  studentName: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: Date;
}

class SessionManager {
  private sessions: LiveSession[] = [
    {
      id: '1',
      title: 'مقدمة في التواصل AAC - الجلسة الأولى',
      courseName: 'مقدمة في التواصل AAC',
      scheduledAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
      duration: 60,
      status: 'scheduled',
      studentsCount: 15,
      description: 'جلسة تعليمية افتراضية للحديث عن أساسيات التواصل المدعوم'
    },
    {
      id: '2',
      title: 'مهارات اجتماعية للمبتدئين',
      courseName: 'مهارات اجتماعية للمبتدئين',
      scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      duration: 45,
      status: 'scheduled',
      studentsCount: 8
    },
    {
      id: '3',
      title: 'التواصل مع الآخرين - مباشر',
      courseName: 'التواصل مع الآخرين',
      scheduledAt: new Date(Date.now() - 30 * 60 * 1000),
      duration: 60,
      status: 'live',
      studentsCount: 12,
      streamUrl: 'https://live.example.com/stream1'
    },
    {
      id: '4',
      title: 'جلسة مراجعة أسبوعية',
      courseName: 'مقدمة في التواصل AAC',
      scheduledAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      duration: 30,
      status: 'completed',
      studentsCount: 10
    },
    {
      id: '5',
      title: 'جلسة خاصة',
      courseName: 'مهارات اجتماعية للمبتدئين',
      scheduledAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      duration: 45,
      status: 'cancelled',
      studentsCount: 1
    }
  ];

  private appointments: SessionAppointment[] = [
    { id: 'a1', sessionId: '1', studentId: 's1', studentName: 'أحمد محمد', status: 'confirmed', createdAt: new Date() },
    { id: 'a2', sessionId: '1', studentId: 's2', studentName: 'سارة علي', status: 'pending', createdAt: new Date() },
    { id: 'a3', sessionId: '1', studentId: 's3', studentName: 'خالد عمر', status: 'confirmed', createdAt: new Date() },
    { id: 'a4', sessionId: '3', studentId: 's4', studentName: 'منى إبراهيم', status: 'confirmed', createdAt: new Date() },
    { id: 'a5', sessionId: '3', studentId: 's5', studentName: 'علي حسن', status: 'confirmed', createdAt: new Date() }
  ];

  getSessions(): LiveSession[] {
    return this.sessions;
  }

  getSessionById(id: string): LiveSession | undefined {
    return this.sessions.find(s => s.id === id);
  }

  getAppointmentsBySession(sessionId: string): SessionAppointment[] {
    return this.appointments.filter(a => a.sessionId === sessionId);
  }

  getAllAppointments(): SessionAppointment[] {
    return this.appointments;
  }

  createAppointment(appointment: Omit<SessionAppointment, 'id' | 'createdAt'>): SessionAppointment {
    const newAppointment: SessionAppointment = {
      ...appointment,
      id: `a${Date.now()}`,
      createdAt: new Date()
    };
    this.appointments.push(newAppointment);
    return newAppointment;
  }

  createSession(session: Omit<LiveSession, 'id'>): LiveSession {
    const newSession: LiveSession = {
      ...session,
      id: `s${Date.now()}`
    };
    this.sessions.push(newSession);
    return newSession;
  }

  updateSessionStatus(id: string, status: LiveSession['status']): LiveSession | undefined {
    const session = this.sessions.find(s => s.id === id);
    if (session) {
      session.status = status;
      return session;
    }
    return undefined;
  }

  getSessionStats() {
    return {
      total: this.sessions.length,
      scheduled: this.sessions.filter(s => s.status === 'scheduled').length,
      live: this.sessions.filter(s => s.status === 'live').length,
      completed: this.sessions.filter(s => s.status === 'completed').length,
      cancelled: this.sessions.filter(s => s.status === 'cancelled').length
    };
  }
}

export const sessionManager = new SessionManager();