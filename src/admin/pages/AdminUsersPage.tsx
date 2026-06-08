import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, FaFilter, FaPlus, FaEdit, FaTrash, FaEye,
  FaUserShield, FaBan, FaCheckCircle, FaTimes, FaDownload,
  FaChevronLeft, FaChevronRight, FaEllipsisV, FaUserPlus, FaMinusCircle
} from 'react-icons/fa';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: 'active' | 'banned' | 'pending';
  joinDate: string;
  lastActive: string;
  avatar?: string;
  parentName?: string;
}

interface Role {
  id: string;
  name: string;
  color: string;
  permissions: string[];
}

const roles: Role[] = [
  { id: '1', name: 'مدير النظام', color: '#dc2626', permissions: ['all'] },
  { id: '2', name: 'مشرف', color: '#7c3aed', permissions: ['manage_users', 'manage_content'] },
  { id: '3', name: 'معلم', color: '#059669', permissions: ['create_content', 'view_analytics'] },
  { id: '4', name: 'مستخدم', color: '#6b7280', permissions: ['view'] },
];

const mockUsers: User[] = [
  { id: '1', name: 'أحمد محمد', email: 'ahmed@example.com', phone: '+966501234567', role: 'مدير النظام', status: 'active', joinDate: '2024-01-15', lastActive: 'منذ ساعة' },
  { id: '2', name: 'سارة علي', email: 'sara@example.com', phone: '+966501234568', role: 'مشرف', status: 'active', joinDate: '2024-02-20', lastActive: 'منذ 3 ساعات' },
  { id: '3', name: 'خالد عمر', email: 'khaled@example.com', phone: '+966501234569', role: 'معلم', status: 'active', joinDate: '2024-03-10', lastActive: 'منذ يوم' },
  { id: '4', name: 'محمد احمد', email: 'mohammed@example.com', phone: '+966501234570', role: 'مستخدم', status: 'banned', joinDate: '2024-03-15', lastActive: 'منذ أسبوع' },
  { id: '5', name: 'فاطمة يوسف', email: 'fatima@example.com', phone: '+966501234571', role: 'معلم', status: 'active', joinDate: '2024-04-01', lastActive: 'منذ يومين' },
  { id: '6', name: 'علي حسن', email: 'ali@example.com', phone: '+966501234572', role: 'مستخدم', status: 'pending', joinDate: '2024-04-10', lastActive: 'جديد' },
  { id: '7', name: 'منى عبدالله', email: 'muna@example.com', phone: '+966501234573', role: 'مستخدم', status: 'active', joinDate: '2024-04-15', lastActive: 'منذ 5 أيام' },
  { id: '8', name: 'ياسر سعيد', email: 'yasser@example.com', phone: '+966501234574', role: 'مشرف', status: 'active', joinDate: '2024-05-01', lastActive: 'منذ ساعة' },
  { id: '9', name: 'رانية إبراهيم', email: 'rania@example.com', phone: '+966501234575', role: 'معلم', status: 'active', joinDate: '2024-05-10', lastActive: 'منذ 3 أيام' },
  { id: '10', name: 'سلطان فيصل', email: 'sultan@example.com', phone: '+966501234576', role: 'مستخدم', status: 'active', joinDate: '2024-05-15', lastActive: 'منذ أسبوع' },
];

const AdminUsersPage = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBanModal, setShowBanModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [userToBan, setUserToBan] = useState<User | null>(null);
  const [actionMenu, setActionMenu] = useState<string | null>(null);
  const [showRoleDropdown, setShowRoleDropdown] = useState<string | null>(null);
  const [rolesList, setRolesList] = useState<Role[]>(roles);
  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '', role: 'مستخدم', parentName: '' });
  const itemsPerPage = 10;

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'active':
        return { backgroundColor: 'rgba(88, 204, 2, 0.15)', color: 'var(--primary)' };
      case 'banned':
        return { backgroundColor: 'rgba(220, 38, 38, 0.15)', color: '#dc2626' };
      case 'pending':
        return { backgroundColor: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24' };
      default:
        return {};
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'banned': return 'محظور';
      case 'pending': return 'قيد الانتظار';
      default: return status;
    }
  };

  const getRoleColor = (roleName: string) => {
    const role = rolesList.find(r => r.name === roleName);
    return role?.color || '#6b7280';
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedUsers(paginatedUsers.map(u => u.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleAddUser = () => {
    const user: User = {
      id: Date.now().toString(),
      ...newUser,
      role: newUser.role,
      status: 'pending',
      joinDate: new Date().toISOString().split('T')[0],
      lastActive: 'جديد'
    };
    setUsers([user, ...users]);
    setShowAddModal(false);
    setNewUser({ name: '', email: '', phone: '', role: 'مستخدم', parentName: '' });
  };

  const handleEditUser = (user: User) => {
    setUsers(users.map(u => u.id === user.id ? user : u));
    setEditingUser(null);
  };

  const handleDeleteUser = () => {
    if (userToDelete) {
      setUsers(users.filter(u => u.id !== userToDelete.id));
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  const handleBanUser = () => {
    if (userToBan) {
      setUsers(users.map(u => 
        u.id === userToBan.id 
          ? { ...u, status: u.status === 'banned' ? 'active' : 'banned' }
          : u
      ));
      setShowBanModal(false);
      setUserToBan(null);
    }
  };

  const handleChangeRole = (userId: string, newRole: string) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, role: newRole } : u
    ));
    setShowRoleDropdown(null);
  };

  const handleAddRole = (roleName: string) => {
    const newRole: Role = {
      id: Date.now().toString(),
      name: roleName,
      color: '#' + Math.floor(Math.random()*16777215).toString(16),
      permissions: ['view']
    };
    setRolesList([...rolesList, newRole]);
    setShowRoleModal(false);
  };

  const handleRemoveRole = (roleId: string) => {
    setRolesList(rolesList.filter(r => r.id !== roleId));
  };

  const exportToCSV = () => {
    const headers = ['الاسم', 'البريد الإلكترو��ي', 'الهاتف', 'الدور', 'الحالة', 'تاريخ التسجيل'];
    const rows = filteredUsers.map(u => [u.name, u.email, u.phone, u.role, getStatusText(u.status), u.joinDate]);
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'users.csv';
    link.click();
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h1 className="h3 fw-bold mb-1" style={{ color: 'var(--text)' }}>إدارة المستخدمين</h1>
          <p style={{ color: 'var(--text-light)' }}>
            {filteredUsers.length} مستخدم | {users.filter(u => u.status === 'active').length} نشط | 
            {users.filter(u => u.status === 'banned').length} محظور
          </p>
        </div>
        <div className="d-flex gap-2">
          <button 
            onClick={() => setShowRoleModal(true)}
            className="btn d-flex align-items-center gap-2"
            style={{
              backgroundColor: 'var(--surface-elevated)',
              color: 'var(--text)',
              borderRadius: '10px',
              padding: '10px 20px',
              border: '1px solid var(--border)'
            }}
          >
            <FaUserShield />
            إدارة الأدوار
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="btn d-flex align-items-center gap-2"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'white',
              borderRadius: '10px',
              padding: '10px 20px'
            }}
          >
            <FaPlus />
            إضافة مستخدم
          </button>
        </div>
      </div>

      <div className="card border-0 mb-4" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
        <div className="card-body p-4">
          <div className="row g-3 align-items-center">
            <div className="col-md-4">
              <div className="position-relative">
                <FaSearch className="position-absolute" style={{ top: '50%', right: '12px', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                <input
                  type="text"
                  placeholder="البحث بالاسم أو البريد الإلكتروني..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control"
                  style={{ 
                    borderRadius: '10px', 
                    backgroundColor: 'var(--surface-elevated)',
                    border: '1px solid var(--border)',
                    paddingRight: '40px'
                  }}
                />
              </div>
            </div>
            <div className="col-md-3">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="form-select"
                style={{ 
                  borderRadius: '10px', 
                  backgroundColor: 'var(--surface-elevated)',
                  border: '1px solid var(--border)'
                }}
              >
                <option value="all">جميع الأدوار</option>
                {rolesList.map(role => (
                  <option key={role.id} value={role.name}>{role.name}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="form-select"
                style={{ 
                  borderRadius: '10px', 
                  backgroundColor: 'var(--surface-elevated)',
                  border: '1px solid var(--border)'
                }}
              >
                <option value="all">جميع الحالات</option>
                <option value="active">نشط</option>
                <option value="banned">محظور</option>
                <option value="pending">قيد الانتظار</option>
              </select>
            </div>
            <div className="col-md-2">
              <button 
                onClick={exportToCSV}
                className="btn w-100 d-flex align-items-center justify-content-center gap-2"
                style={{
                  backgroundColor: 'var(--surface-elevated)',
                  color: 'var(--text)',
                  borderRadius: '10px',
                  padding: '10px',
                  border: '1px solid var(--border)'
                }}
              >
                <FaDownload />
                تصدير
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table mb-0">
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ padding: '16px', width: '50px' }}>
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                      className="form-check-input"
                    />
                  </th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>المستخدم</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الدور</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الحالة</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>تاريخ التسجيل</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>آخر نشاط</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px', width: '100px' }}>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map(user => (
                  <tr key={user.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '16px' }}>
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                        className="form-check-input"
                      />
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div className="d-flex align-items-center gap-3">
                        <div 
                          className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                          style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: getRoleColor(user.role),
                            flexShrink: 0
                          }}
                        >
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="fw-bold" style={{ color: 'var(--text)' }}>{user.name}</div>
                          <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div className="position-relative">
                        <button
                          onClick={() => setShowRoleDropdown(showRoleDropdown === user.id ? null : user.id)}
                          className="btn d-flex align-items-center gap-2 px-3 py-1"
                          style={{
                            backgroundColor: getRoleColor(user.role) + '20',
                            color: getRoleColor(user.role),
                            borderRadius: '20px',
                            border: 'none',
                            fontSize: '0.85rem'
                          }}
                        >
                          {user.role}
                          <FaChevronLeft style={{ fontSize: '0.7rem', transform: showRoleDropdown === user.id ? 'rotate(-90deg)' : 'rotate(90deg)' }} />
                        </button>
                        <AnimatePresence>
                          {showRoleDropdown === user.id && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="position-absolute start-0 mt-1 py-2 rounded-3"
                              style={{
                                backgroundColor: 'var(--surface)',
                                border: '1px solid var(--border)',
                                minWidth: '150px',
                                zIndex: 1000,
                                boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
                              }}
                            >
                              {rolesList.filter(r => r.name !== user.role).map(role => (
                                <button
                                  key={role.id}
                                  onClick={() => handleChangeRole(user.id, role.name)}
                                  className="w-100 d-flex align-items-center gap-2 px-3 py-2"
                                  style={{
                                    backgroundColor: 'transparent',
                                    color: 'var(--text)',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '0.85rem'
                                  }}
                                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--surface-elevated)'}
                                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                  <span className="rounded-circle" style={{ width: '8px', height: '8px', backgroundColor: role.color }} />
                                  {role.name}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span 
                        className="px-3 py-1 rounded-pill"
                        style={{ 
                          ...getStatusStyle(user.status),
                          fontSize: '0.8rem',
                          fontWeight: 500
                        }}
                      >
                        {getStatusText(user.status)}
                      </span>
                    </td>
                    <td style={{ padding: '16px', color: 'var(--text)' }}>
                      {user.joinDate}
                    </td>
                    <td style={{ padding: '16px', color: 'var(--text-light)' }}>
                      {user.lastActive}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div className="d-flex gap-1">
                        <button 
                          onClick={() => {
                            setEditingUser(user);
                            setShowAddModal(true);
                          }}
                          className="btn p-2" 
                          style={{ color: 'var(--primary)' }}
                          aria-label="تعديل"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => {
                            setUserToBan(user);
                            setShowBanModal(true);
                          }}
                          className="btn p-2" 
                          style={{ color: user.status === 'banned' ? 'var(--primary)' : 'var(--warning)' }}
                          aria-label={user.status === 'banned' ? 'تفعيل' : 'حظر'}
                        >
                          {user.status === 'banned' ? <FaCheckCircle /> : <FaBan />}
                        </button>
                        <button 
                          onClick={() => {
                            setUserToDelete(user);
                            setShowDeleteModal(true);
                          }}
                          className="btn p-2" 
                          style={{ color: 'var(--danger)' }}
                          aria-label="حذف"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {paginatedUsers.length === 0 && (
            <div className="text-center py-5">
              <p style={{ color: 'var(--text-light)' }}>لا توجد نتائج</p>
            </div>
          )}

          {paginatedUsers.length > 0 && (
            <div className="d-flex align-items-center justify-content-between p-4" style={{ borderTop: '1px solid var(--border)' }}>
              <div style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
                عرض {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredUsers.length)} من {filteredUsers.length}
              </div>
              <div className="d-flex align-items-center gap-2">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="btn d-flex align-items-center justify-content-center"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--surface-elevated)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)'
                  }}
                >
                  <FaChevronRight />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).slice(
                  Math.max(0, currentPage - 3),
                  Math.min(totalPages, currentPage + 2)
                ).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className="btn d-flex align-items-center justify-content-center"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      backgroundColor: currentPage === page ? 'var(--primary)' : 'var(--surface-elevated)',
                      border: '1px solid var(--border)',
                      color: currentPage === page ? 'white' : 'var(--text)'
                    }}
                  >
                    {page}
                  </button>
                ))}
                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="btn d-flex align-items-center justify-content-center"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--surface-elevated)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)'
                  }}
                >
                  <FaChevronLeft />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000 }}
            onClick={() => { setShowAddModal(false); setEditingUser(null); }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="card border-0 p-4"
              style={{ 
                borderRadius: '20px', 
                backgroundColor: 'var(--surface)', 
                maxWidth: '500px',
                width: '90%'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h5 fw-bold mb-0" style={{ color: 'var(--text)' }}>
                  {editingUser ? 'تعديل مستخدم' : 'إضافة مستخدم جديد'}
                </h2>
                <button 
                  onClick={() => { setShowAddModal(false); setEditingUser(null); }}
                  className="btn p-2"
                  style={{ color: 'var(--text-light)' }}
                >
                  <FaTimes />
                </button>
              </div>
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label" style={{ color: 'var(--text)' }}>الاسم</label>
                  <input
                    type="text"
                    value={editingUser ? editingUser.name : newUser.name}
                    onChange={(e) => editingUser 
                      ? setEditingUser({ ...editingUser, name: e.target.value })
                      : setNewUser({ ...newUser, name: e.target.value })
                    }
                    className="form-control"
                    style={{ 
                      borderRadius: '10px', 
                      backgroundColor: 'var(--surface-elevated)',
                      border: '1px solid var(--border)'
                    }}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label" style={{ color: 'var(--text)' }}>البريد الإلكتروني</label>
                  <input
                    type="email"
                    value={editingUser ? editingUser.email : newUser.email}
                    onChange={(e) => editingUser
                      ? setEditingUser({ ...editingUser, email: e.target.value })
                      : setNewUser({ ...newUser, email: e.target.value })
                    }
                    className="form-control"
                    style={{ 
                      borderRadius: '10px', 
                      backgroundColor: 'var(--surface-elevated)',
                      border: '1px solid var(--border)'
                    }}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label" style={{ color: 'var(--text)' }}>رقم الهاتف</label>
                  <input
                    type="tel"
                    value={editingUser ? editingUser.phone : newUser.phone}
                    onChange={(e) => editingUser
                      ? setEditingUser({ ...editingUser, phone: e.target.value })
                      : setNewUser({ ...newUser, phone: e.target.value })
                    }
                    className="form-control"
                    style={{ 
                      borderRadius: '10px', 
                      backgroundColor: 'var(--surface-elevated)',
                      border: '1px solid var(--border)'
                    }}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label" style={{ color: 'var(--text)' }}>اسم ولي الأمر</label>
                  <input
                    type="text"
                    value={editingUser ? editingUser.parentName || '' : newUser.parentName}
                    onChange={(e) => editingUser
                      ? setEditingUser({ ...editingUser, parentName: e.target.value })
                      : setNewUser({ ...newUser, parentName: e.target.value })
                    }
                    className="form-control"
                    placeholder="أدخل اسم ولي الأمر"
                    style={{ 
                      borderRadius: '10px', 
                      backgroundColor: 'var(--surface-elevated)',
                      border: '1px solid var(--border)'
                    }}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label" style={{ color: 'var(--text)' }}>الدور</label>
                  <select
                    value={editingUser ? editingUser.role : newUser.role}
                    onChange={(e) => editingUser
                      ? setEditingUser({ ...editingUser, role: e.target.value })
                      : setNewUser({ ...newUser, role: e.target.value })
                    }
                    className="form-select"
                    style={{ 
                      borderRadius: '10px', 
                      backgroundColor: 'var(--surface-elevated)',
                      border: '1px solid var(--border)'
                    }}
                  >
                    {rolesList.map(role => (
                      <option key={role.id} value={role.name}>{role.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="d-flex gap-2 mt-4">
                <button 
                  onClick={() => { setShowAddModal(false); setEditingUser(null); }}
                  className="btn flex-grow-1"
                  style={{
                    backgroundColor: 'var(--surface-elevated)',
                    color: 'var(--text)',
                    borderRadius: '10px',
                    padding: '12px'
                  }}
                >
                  إلغاء
                </button>
                <button 
                  onClick={() => {
                    if (editingUser) {
                      handleEditUser(editingUser);
                    } else {
                      handleAddUser();
                    }
                  }}
                  className="btn flex-grow-1"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    borderRadius: '10px',
                    padding: '12px'
                  }}
                >
                  {editingUser ? 'حفظ التغييرات' : 'إضافة'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showRoleModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000 }}
            onClick={() => setShowRoleModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="card border-0 p-4"
              style={{ 
                borderRadius: '20px', 
                backgroundColor: 'var(--surface)', 
                maxWidth: '500px',
                width: '90%'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h5 fw-bold mb-0" style={{ color: 'var(--text)' }}>إدارة الأدوار</h2>
                <button 
                  onClick={() => setShowRoleModal(false)}
                  className="btn p-2"
                  style={{ color: 'var(--text-light)' }}
                >
                  <FaTimes />
                </button>
              </div>
              <div className="d-flex flex-column gap-2 mb-4">
                {rolesList.map(role => (
                  <div 
                    key={role.id}
                    className="d-flex align-items-center justify-content-between p-3 rounded-3"
                    style={{ backgroundColor: 'var(--surface-elevated)' }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <span className="rounded-circle" style={{ width: '12px', height: '12px', backgroundColor: role.color }} />
                      <span style={{ color: 'var(--text)', fontWeight: 500 }}>{role.name}</span>
                    </div>
                    <button 
                      onClick={() => handleRemoveRole(role.id)}
                      className="btn p-2"
                      style={{ color: 'var(--danger)' }}
                      aria-label="حذف الدور"
                    >
                      <FaMinusCircle />
                    </button>
                  </div>
                ))}
              </div>
              <div className="d-flex gap-2">
                <input
                  type="text"
                  placeholder="اسم الدور جديد..."
                  id="newRoleInput"
                  className="form-control flex-grow-1"
                  style={{ 
                    borderRadius: '10px', 
                    backgroundColor: 'var(--surface-elevated)',
                    border: '1px solid var(--border)'
                  }}
                />
                <button 
                  onClick={() => {
                    const input = document.getElementById('newRoleInput') as HTMLInputElement;
                    if (input.value.trim()) {
                      handleAddRole(input.value.trim());
                      input.value = '';
                    }
                  }}
                  className="btn d-flex align-items-center justify-content-center"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    borderRadius: '10px',
                    padding: '10px 20px'
                  }}
                >
                  <FaPlus />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000 }}
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="card border-0 p-4"
              style={{ 
                borderRadius: '20px', 
                backgroundColor: 'var(--surface)', 
                maxWidth: '400px',
                width: '90%'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-4">
                <div 
                  className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{ width: '60px', height: '60px', backgroundColor: 'rgba(220, 38, 38, 0.15)', color: 'var(--danger)' }}
                >
                  <FaTrash style={{ fontSize: '1.5rem' }} />
                </div>
                <h2 className="h5 fw-bold mb-2" style={{ color: 'var(--text)' }}>حذف المستخدم</h2>
                <p style={{ color: 'var(--text-light)' }}>
                  هل أنت متأكد من حذف المستخدم "{userToDelete?.name}"؟ لا يمكن التراجع عن هذا الإجراء.
                </p>
              </div>
              <div className="d-flex gap-2">
                <button 
                  onClick={() => setShowDeleteModal(false)}
                  className="btn flex-grow-1"
                  style={{
                    backgroundColor: 'var(--surface-elevated)',
                    color: 'var(--text)',
                    borderRadius: '10px',
                    padding: '12px'
                  }}
                >
                  إلغاء
                </button>
                <button 
                  onClick={handleDeleteUser}
                  className="btn flex-grow-1"
                  style={{
                    backgroundColor: 'var(--danger)',
                    color: 'white',
                    borderRadius: '10px',
                    padding: '12px'
                  }}
                >
                  حذف
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBanModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000 }}
            onClick={() => setShowBanModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="card border-0 p-4"
              style={{ 
                borderRadius: '20px', 
                backgroundColor: 'var(--surface)', 
                maxWidth: '400px',
                width: '90%'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-4">
                <div 
                  className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{ width: '60px', height: '60px', backgroundColor: userToBan?.status === 'banned' ? 'rgba(88, 204, 2, 0.15)' : 'rgba(251, 191, 36, 0.15)', color: userToBan?.status === 'banned' ? 'var(--primary)' : '#fbbf24' }}
                >
                  {userToBan?.status === 'banned' ? <FaCheckCircle style={{ fontSize: '1.5rem' }} /> : <FaBan style={{ fontSize: '1.5rem' }} />}
                </div>
                <h2 className="h5 fw-bold mb-2" style={{ color: 'var(--text)' }}>
                  {userToBan?.status === 'banned' ? 'إلغاء حظر المستخدم' : 'حظر المستخدم'}
                </h2>
                <p style={{ color: 'var(--text-light)' }}>
                  {userToBan?.status === 'banned' 
                    ? `هل تريد إلغاء حظر المستخدم "${userToBan?.name}"؟`
                    : `هل أنت متأكد من حظر المستخدم "${userToBan?.name}"؟`
                  }
                </p>
              </div>
              <div className="d-flex gap-2">
                <button 
                  onClick={() => setShowBanModal(false)}
                  className="btn flex-grow-1"
                  style={{
                    backgroundColor: 'var(--surface-elevated)',
                    color: 'var(--text)',
                    borderRadius: '10px',
                    padding: '12px'
                  }}
                >
                  إلغاء
                </button>
                <button 
                  onClick={handleBanUser}
                  className="btn flex-grow-1"
                  style={{
                    backgroundColor: userToBan?.status === 'banned' ? 'var(--primary)' : 'var(--warning)',
                    color: 'white',
                    borderRadius: '10px',
                    padding: '12px'
                  }}
                >
                  {userToBan?.status === 'banned' ? 'إلغاء الحظر' : 'حظر'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminUsersPage;