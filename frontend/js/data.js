// ==========================================
// DATA MANAGEMENT & MOCK DATABASE
// ==========================================

const DB = {
    getUsers: () => {
        return [
            {
                id: 1,
                name: 'John Doe',
                email: 'student@infosys.com',
                role: 'Student',
                initial: 'J',
                password: 'password123'
            },
            {
                id: 2,
                name: 'Dr. Smith',
                email: 'faculty@infosys.com',
                role: 'Faculty',
                initial: 'S',
                password: 'password123'
            },
            {
                id: 3,
                name: 'Admin User',
                email: 'admin@infosys.com',
                role: 'Admin',
                initial: 'A',
                password: 'password123'
            }
        ];
    },

    getPrograms: () => {
        return [
            {
                id: 1,
                name: 'HackWithInfy',
                type: 'Workshop',
                participants: 245,
                stages: ['Registration', 'Workshop Attendance', 'Project Submission', 'Final Assessment'],
                stageRequirements: {
                    'Registration': 'Submit registration confirmation',
                    'Workshop Attendance': 'Upload attendance certificate',
                    'Project Submission': 'Submit project files and report',
                    'Final Assessment': 'Complete assessment and upload certificate'
                }
            },
            {
                id: 2,
                name: 'Infosys Springboard',
                type: 'Training',
                participants: 180,
                stages: ['Enrollment', 'Module 1 Completion', 'Module 2 Completion', 'Final Project', 'Certification'],
                stageRequirements: {
                    'Enrollment': 'Submit enrollment confirmation',
                    'Module 1 Completion': 'Upload module 1 completion certificate',
                    'Module 2 Completion': 'Upload module 2 completion certificate',
                    'Final Project': 'Submit final project and documentation',
                    'Certification': 'Upload Infosys Springboard certificate'
                }
            },
            {
                id: 3,
                name: 'Virtual Internship',
                type: 'Internship',
                participants: 95,
                stages: ['Application', 'Week 1-2 Tasks', 'Week 3-4 Tasks', 'Final Report', 'Completion Certificate'],
                stageRequirements: {
                    'Application': 'Submit application confirmation',
                    'Week 1-2 Tasks': 'Upload completed tasks and weekly report',
                    'Week 3-4 Tasks': 'Upload completed tasks and weekly report',
                    'Final Report': 'Submit comprehensive internship report',
                    'Completion Certificate': 'Upload internship completion certificate'
                }
            },
            {
                id: 4,
                name: 'UI/UX Design',
                type: 'Course',
                participants: 120,
                stages: ['Course Enrollment', 'Design Fundamentals', 'Prototyping', 'Final Project', 'Course Certificate'],
                stageRequirements: {
                    'Course Enrollment': 'Submit enrollment confirmation',
                    'Design Fundamentals': 'Upload design exercises and assignments',
                    'Prototyping': 'Submit prototype files and documentation',
                    'Final Project': 'Upload complete UI/UX project portfolio',
                    'Course Certificate': 'Upload course completion certificate'
                }
            },
            {
                id: 5,
                name: 'Cybersecurity Track',
                type: 'Bootcamp',
                participants: 85,
                stages: ['Registration', 'Basic Security', 'Advanced Topics', 'Capstone Project', 'Certification'],
                stageRequirements: {
                    'Registration': 'Submit registration confirmation',
                    'Basic Security': 'Upload basic security module completion',
                    'Advanced Topics': 'Upload advanced topics completion certificate',
                    'Capstone Project': 'Submit capstone project and presentation',
                    'Certification': 'Upload cybersecurity certification'
                }
            },
            {
                id: 6,
                name: 'Faculty Development Program',
                type: 'Training',
                participants: 45,
                stages: ['Registration', 'Workshop Participation', 'Project Implementation', 'Final Assessment', 'Certification'],
                stageRequirements: {
                    'Registration': 'Submit faculty registration confirmation',
                    'Workshop Participation': 'Upload workshop attendance certificate',
                    'Project Implementation': 'Submit teaching methodology project',
                    'Final Assessment': 'Complete final assessment and upload certificate',
                    'Certification': 'Upload faculty development certification'
                }
            },
            {
                id: 7,
                name: 'Research Methodology Workshop',
                type: 'Workshop',
                participants: 28,
                stages: ['Initial Submission', 'Review Process', 'Final Approval', 'Implementation'],
                stageRequirements: {
                    'Initial Submission': 'Submit research proposal',
                    'Review Process': 'Upload peer review feedback',
                    'Final Approval': 'Submit approved research plan',
                    'Implementation': 'Upload research implementation report'
                }
            }
        ];
    },

    getStudentSubmissions: () => {
        return [
            {
                id: 1,
                studentId: 1,
                studentName: 'John Doe',
                programId: 2,
                programName: 'Infosys Springboard',
                currentStage: 2, // Currently at Module 2 Completion
                submissions: [
                    {
                        stage: 'Enrollment',
                        status: 'Approved',
                        submittedDate: '2026-01-15',
                        fileName: 'enrollment_john.pdf',
                        fileType: 'Certificate',
                        adminComment: 'Enrollment confirmed'
                    },
                    {
                        stage: 'Module 1 Completion',
                        status: 'Approved',
                        submittedDate: '2026-02-10',
                        fileName: 'module1_john.pdf',
                        fileType: 'Certificate',
                        adminComment: 'Module 1 completed successfully'
                    },
                    {
                        stage: 'Module 2 Completion',
                        status: 'Pending',
                        submittedDate: '2026-03-15',
                        fileName: 'module2_john.pdf',
                        fileType: 'Certificate',
                        adminComment: ''
                    }
                ]
            },
            {
                id: 2,
                studentId: 1,
                studentName: 'John Doe',
                programId: 3,
                programName: 'Virtual Internship',
                currentStage: 1, // Currently at Week 1-2 Tasks
                submissions: [
                    {
                        stage: 'Application',
                        status: 'Approved',
                        submittedDate: '2026-01-20',
                        fileName: 'application_john.pdf',
                        fileType: 'Certificate',
                        adminComment: 'Application approved'
                    },
                    {
                        stage: 'Week 1-2 Tasks',
                        status: 'Pending',
                        submittedDate: '2026-02-28',
                        fileName: 'week1-2_john.zip',
                        fileType: 'Project Files',
                        adminComment: ''
                    }
                ]
            },
            {
                id: 3,
                studentId: 2,
                studentName: 'Sarah Chen',
                programId: 4,
                programName: 'UI/UX Design',
                currentStage: 3, // Currently at Prototyping
                submissions: [
                    {
                        stage: 'Course Enrollment',
                        status: 'Approved',
                        submittedDate: '2026-01-10',
                        fileName: 'enrollment_sarah.pdf',
                        fileType: 'Certificate',
                        adminComment: 'Enrollment verified'
                    },
                    {
                        stage: 'Design Fundamentals',
                        status: 'Approved',
                        submittedDate: '2026-02-05',
                        fileName: 'fundamentals_sarah.pdf',
                        fileType: 'Report/Document',
                        adminComment: 'Good foundation work'
                    },
                    {
                        stage: 'Prototyping',
                        status: 'Pending',
                        submittedDate: '2026-03-20',
                        fileName: 'prototype_sarah.fig',
                        fileType: 'Project Files',
                        adminComment: ''
                    }
                ]
            },
            {
                id: 4,
                studentId: 3,
                studentName: 'Rahul Kumar',
                programId: 1,
                programName: 'HackWithInfy',
                currentStage: 4, // Currently at Final Assessment
                submissions: [
                    {
                        stage: 'Registration',
                        status: 'Approved',
                        submittedDate: '2026-01-05',
                        fileName: 'registration_rahul.pdf',
                        fileType: 'Certificate',
                        adminComment: 'Registration confirmed'
                    },
                    {
                        stage: 'Workshop Attendance',
                        status: 'Approved',
                        submittedDate: '2026-01-25',
                        fileName: 'attendance_rahul.pdf',
                        fileType: 'Certificate',
                        adminComment: 'Attendance verified'
                    },
                    {
                        stage: 'Project Submission',
                        status: 'Approved',
                        submittedDate: '2026-02-15',
                        fileName: 'project_rahul.zip',
                        fileType: 'Project Files',
                        adminComment: 'Excellent project work'
                    },
                    {
                        stage: 'Final Assessment',
                        status: 'Pending',
                        submittedDate: '2026-03-10',
                        fileName: 'assessment_rahul.pdf',
                        fileType: 'Certificate',
                        adminComment: ''
                    }
                ]
            },
            {
                id: 5,
                studentId: 4,
                studentName: 'Priya Sharma',
                programId: 5,
                programName: 'Cybersecurity Track',
                currentStage: 2, // Currently at Advanced Topics
                submissions: [
                    {
                        stage: 'Registration',
                        status: 'Approved',
                        submittedDate: '2026-01-08',
                        fileName: 'registration_priya.pdf',
                        fileType: 'Certificate',
                        adminComment: 'Registration approved'
                    },
                    {
                        stage: 'Basic Security',
                        status: 'Approved',
                        submittedDate: '2026-02-01',
                        fileName: 'basic_security_priya.pdf',
                        fileType: 'Certificate',
                        adminComment: 'Basic concepts well understood'
                    },
                    {
                        stage: 'Advanced Topics',
                        status: 'Pending',
                        submittedDate: '2026-03-25',
                        fileName: 'advanced_topics_priya.pdf',
                        fileType: 'Report/Document',
                        adminComment: ''
                    }
                ]
            },
            {
                id: 6,
                studentId: 5,
                studentName: 'Amit Patel',
                programId: 2,
                programName: 'Infosys Springboard',
                currentStage: 5, // Program completed
                submissions: [
                    {
                        stage: 'Enrollment',
                        status: 'Approved',
                        submittedDate: '2026-01-12',
                        fileName: 'enrollment_amit.pdf',
                        fileType: 'Certificate',
                        adminComment: 'Enrollment confirmed'
                    },
                    {
                        stage: 'Module 1 Completion',
                        status: 'Approved',
                        submittedDate: '2026-02-08',
                        fileName: 'module1_amit.pdf',
                        fileType: 'Certificate',
                        adminComment: 'Module 1 completed'
                    },
                    {
                        stage: 'Module 2 Completion',
                        status: 'Approved',
                        submittedDate: '2026-03-05',
                        fileName: 'module2_amit.pdf',
                        fileType: 'Certificate',
                        adminComment: 'Module 2 completed successfully'
                    },
                    {
                        stage: 'Final Project',
                        status: 'Approved',
                        submittedDate: '2026-03-28',
                        fileName: 'final_project_amit.zip',
                        fileType: 'Project Files',
                        adminComment: 'Outstanding final project'
                    },
                    {
                        stage: 'Certification',
                        status: 'Approved',
                        submittedDate: '2026-04-05',
                        fileName: 'certification_amit.pdf',
                        fileType: 'Certificate',
                        adminComment: 'Program completed successfully'
                    }
                ]
            }
        ];
    },

    getFacultySubmissions: () => {
        return [
            {
                id: 1,
                facultyId: 2,
                facultyName: 'Dr. Smith',
                programId: 6,
                programName: 'Faculty Development Program',
                currentStage: 2, // Currently at Workshop Participation
                submissions: [
                    {
                        stage: 'Registration',
                        status: 'Approved',
                        submittedDate: '2026-01-15',
                        fileName: 'faculty_registration_smith.pdf',
                        fileType: 'Certificate',
                        adminComment: 'Faculty registration confirmed'
                    },
                    {
                        stage: 'Workshop Participation',
                        status: 'Pending',
                        submittedDate: '2026-02-20',
                        fileName: 'workshop_participation_smith.pdf',
                        fileType: 'Certificate',
                        adminComment: ''
                    }
                ]
            },
            {
                id: 2,
                facultyId: 2,
                facultyName: 'Dr. Smith',
                programId: 7,
                programName: 'Research Methodology Workshop',
                currentStage: 1, // Currently at Initial Submission
                submissions: [
                    {
                        stage: 'Initial Submission',
                        status: 'Pending',
                        submittedDate: '2026-03-01',
                        fileName: 'research_proposal_smith.pdf',
                        fileType: 'Report/Document',
                        adminComment: ''
                    }
                ]
            },
            {
                id: 3,
                facultyId: 6,
                facultyName: 'Prof. Johnson',
                programId: 6,
                programName: 'Faculty Development Program',
                currentStage: 4, // Currently at Final Assessment
                submissions: [
                    {
                        stage: 'Registration',
                        status: 'Approved',
                        submittedDate: '2026-01-10',
                        fileName: 'faculty_registration_johnson.pdf',
                        fileType: 'Certificate',
                        adminComment: 'Registration approved'
                    },
                    {
                        stage: 'Workshop Participation',
                        status: 'Approved',
                        submittedDate: '2026-02-05',
                        fileName: 'workshop_participation_johnson.pdf',
                        fileType: 'Certificate',
                        adminComment: 'Active participation noted'
                    },
                    {
                        stage: 'Project Implementation',
                        status: 'Approved',
                        submittedDate: '2026-02-28',
                        fileName: 'project_implementation_johnson.pdf',
                        fileType: 'Report/Document',
                        adminComment: 'Excellent project implementation'
                    },
                    {
                        stage: 'Final Assessment',
                        status: 'Pending',
                        submittedDate: '2026-03-15',
                        fileName: 'final_assessment_johnson.pdf',
                        fileType: 'Certificate',
                        adminComment: ''
                    }
                ]
            }
        ];
    },

    getStats: () => {
        return {
            totalStudents: 2456,
            internshipsCompleted: 847,
            certifications: 1234,
            eventsParticipated: 3891
        };
    }
};