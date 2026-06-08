// src\utils\messagesStore.ts
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

const exampleMessages: ContactMessage[] = [
  {
    id: '1',
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '+966 55 123 4567',
    subject: 'support',
    message: 'أواجه صعوبة في تحميل إحدى الدورات التعليمية. يرجى المساعدة في حل هذه المشكلة بأسرع وقت ممكن.',
    createdAt: '2024-01-15T10:30:00Z',
    read: false
  },
  {
    id: '2',
    name: 'سارة علي',
    email: 'sara@example.com',
    phone: '+966 50 987 6543',
    subject: 'partnership',
    message: 'نحن مؤسسة تعليمية ونود أن نعرض شراكة استراتيجية معكم. يرجى التواصل لمناقشة التفاصيل.',
    createdAt: '2024-01-14T14:20:00Z',
    read: true
  },
  {
    id: '3',
    name: 'عمر خالد',
    email: 'omar@example.com',
    phone: '+966 55 111 2222',
    subject: 'sales',
    message: 'أنا مهتم بخطط الاشتراك للعائلات. هل يمكنني الحصول على خصم عند الاشتراك السنوي؟',
    createdAt: '2024-01-13T09:15:00Z',
    read: true
  },
  {
    id: '4',
    name: 'منى عبدالله',
    email: 'muna@example.com',
    phone: '+966 53 333 4444',
    subject: 'general',
    message: 'شكراً لخدماتكم الممتازة. أود أن أستفسر عن إمكانية إضافة المزيد من الدورات في مجال التعليم الخاص.',
    createdAt: '2024-01-12T16:45:00Z',
    read: false
  },
  {
    id: '5',
    name: 'فاطمة حسن',
    email: 'fatima@example.com',
    phone: '+966 56 555 6666',
    subject: 'other',
    message: 'لدي اقتراح لتطوير تطبيق الهاتف المحمول لإتاحة التعلم أثناء التنقل. أتمنى أن يتم النظر فيه.',
    createdAt: '2024-01-11T11:00:00Z',
    read: true
  }
];

export const getMessages = (): ContactMessage[] => {
  return exampleMessages;
};

export const saveMessage = (_message: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>): void => {
  console.log('Message would be saved:', _message);
};

export const markMessageAsRead = (_id: string): void => {
  console.log('Message marked as read:', _id);
};

export const deleteMessage = (_id: string): void => {
  console.log('Message deleted:', _id);
};

export const getUnreadCount = (): number => {
  return exampleMessages.filter(msg => !msg.read).length;
};