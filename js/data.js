// ==========================================
// CENTRALIZED DATA & STATE MANAGEMENT (MOCK DB)
// ==========================================

const INITIAL_USERS = [
    { id: 'u1', name: 'Sarah Chen', email: 'student@example.com', password: 'password123', role: 'Student', initial: 'S', regNo: 'CS23001', dept: 'CSE', year: '3rd Year', domain: 'Engineering' },
    { id: 'u2', name: 'Rahul Kumar', email: 'faculty@example.com', password: 'password123', role: 'Faculty', initial: 'R', regNo: 'FAC045', dept: 'ISE', year: 'N/A', domain: 'Tech' },
    { id: 'u3', name: 'Admin User', email: 'admin@example.com', password: 'password123', role: 'Admin', initial: 'A', regNo: 'ADM001', dept: 'Admin', year: 'N/A', domain: 'Admin' }
];

const INITIAL_PROGRAMS = [
    { id: 'p1', title: 'Infosys Springboard – Python Programming', type: 'Certification', desc: 'Comprehensive Python programming course with hands-on projects', duration: '8 weeks', tags: ['Python', 'Programming'], enrollments: 142 },
    { id: 'p2', title: 'AWS Cloud Practitioner', type: 'Training', desc: 'Learn AWS fundamentals and cloud computing basics', duration: '6 weeks', tags: ['AWS', 'Cloud'], enrollments: 98 },
    { id: 'p3', title: 'Data Science with Python', type: 'Certification', desc: 'Master data analysis, visualization, and machine learning', duration: '10 weeks', tags: ['Python', 'ML', 'Analytics'], enrollments: 54 },
    { id: 'p4', title: 'Faculty Development Program', type: 'Training', desc: 'Advanced teaching methodologies and curriculum development', duration: '6 weeks', tags: ['Teaching', 'Methodology'], enrollments: 32 },
    { id: 'p5', title: 'Virtual Internship - Web Development', type: 'Internship', desc: 'Build real-world web applications with modern technologies', duration: '8 weeks', tags: ['Web', 'React', 'HTML', 'CSS'], enrollments: 76 },
    { id: 'p6', title: 'HackWithInfy 2026', type: 'Workshop', desc: 'Competitive coding workshop and hackathon preparation', duration: '2 days', tags: ['Coding', 'Hackathon'], enrollments: 125 }
];

const INITIAL_ENROLLMENTS = [
    { id: 'e1', userId: 'u1', programId: 'p1', status: 'Completed', progress: 100, proofUrl: null, enrollMonth: 'Jan', hours: 45 },
    { id: 'e2', userId: 'u1', programId: 'p2', status: 'In Progress', progress: 75, proofUrl: null, enrollMonth: 'Feb', hours: 30 },
    { id: 'e3', userId: 'u2', programId: 'p4', status: 'Completed', progress: 100, proofUrl: null, enrollMonth: 'Jan', hours: 60 }
];

function initDB() {
    if (!localStorage.getItem('db_users')) {
        localStorage.setItem('db_users', JSON.stringify(INITIAL_USERS));
    }
    if (!localStorage.getItem('db_programs')) {
        localStorage.setItem('db_programs', JSON.stringify(INITIAL_PROGRAMS));
    }
    if (!localStorage.getItem('db_enrollments')) {
        localStorage.setItem('db_enrollments', JSON.stringify(INITIAL_ENROLLMENTS));
    }
}

// Database Helpers
const DB = {
    getUsers: () => JSON.parse(localStorage.getItem('db_users') || '[]'),
    getPrograms: () => JSON.parse(localStorage.getItem('db_programs') || '[]'),
    getEnrollments: () => JSON.parse(localStorage.getItem('db_enrollments') || '[]'),
    
    setEnrollments: (enrollments) => localStorage.setItem('db_enrollments', JSON.stringify(enrollments)),
    
    enrollUser: (userId, programId) => {
        const enrollments = DB.getEnrollments();
        const exists = enrollments.find(e => e.userId === userId && e.programId === programId);
        if (!exists) {
            enrollments.push({
                id: 'e' + Date.now(),
                userId: userId,
                programId: programId,
                status: 'In Progress', // Could be 'Pending'
                progress: 0,
                proofUrl: null,
                enrollMonth: new Date().toLocaleString('default', { month: 'short' }),
                hours: 0
            });
            DB.setEnrollments(enrollments);
            return true;
        }
        return false;
    },

    submitProof: (enrollmentId, fileData) => {
        const enrollments = DB.getEnrollments();
        const idx = enrollments.findIndex(e => e.id === enrollmentId);
        if (idx !== -1) {
            enrollments[idx].status = 'Under Review';
            enrollments[idx].proofUrl = fileData; // Mock base64 or file name
            enrollments[idx].progress = 100; // Assuming proof means 100% progress
            DB.setEnrollments(enrollments);
            return true;
        }
        return false;
    },

    verifyProof: (enrollmentId) => {
        const enrollments = DB.getEnrollments();
        const idx = enrollments.findIndex(e => e.id === enrollmentId);
        if (idx !== -1) {
            enrollments[idx].status = 'Completed';
            enrollments[idx].hours += 10; // add fixed hours just for simulation
            DB.setEnrollments(enrollments);
            return true;
        }
        return false;
    },
    
    rejectProof: (enrollmentId) => {
        const enrollments = DB.getEnrollments();
        const idx = enrollments.findIndex(e => e.id === enrollmentId);
        if (idx !== -1) {
            enrollments[idx].status = 'In Progress'; // Revert
            enrollments[idx].proofUrl = null;
            DB.setEnrollments(enrollments);
            return true;
        }
        return false;
    }
};

// Auto-init on load
initDB();

