// More robust mock data sets
const mockStudents = [
    { name: "Sarah Chen", initial: "S", regNo: "CS23001", dept: "CSE", year: "3rd Year", program: "Web Development", progress: 75, status: "In Progress", hours: 45, enrollMonth: "Jan", domain: "Engineering", role: "Student" },
    { name: "Rahul Kumar", initial: "R", regNo: "IS23045", dept: "ISE", year: "4th Year", program: "AWS Cloud", progress: 100, status: "Completed", hours: 120, enrollMonth: "Feb", domain: "Tech", role: "Faculty" },
    { name: "Priya Singh", initial: "P", regNo: "EC23102", dept: "ECE", year: "3rd Year", program: "Machine Learning", progress: 30, status: "In Progress", hours: 25, enrollMonth: "Apr", domain: "Engineering", role: "Student" },
    { name: "Arjun Reddy", initial: "A", regNo: "ME23019", dept: "MECH", year: "2nd Year", program: "Web Development", progress: 100, status: "Completed", hours: 130, enrollMonth: "Jan", domain: "Engineering", role: "Student" },
    { name: "Emily Davis", initial: "E", regNo: "CS23088", dept: "CSE", year: "4th Year", program: "Data Science", progress: 90, status: "In Progress", hours: 80, enrollMonth: "Mar", domain: "Tech", role: "Student" },
    { name: "Michael Chang", initial: "M", regNo: "IS23011", dept: "ISE", year: "3rd Year", program: "AWS Cloud", progress: 60, status: "In Progress", hours: 60, enrollMonth: "May", domain: "Tech", role: "Student" },
    { name: "Neha Patel", initial: "N", regNo: "CS23055", dept: "CSE", year: "3rd Year", program: "Web Development", progress: 100, status: "Completed", hours: 140, enrollMonth: "Jan", domain: "Engineering", role: "Student" },
    { name: "David Kim", initial: "D", regNo: "EC23077", dept: "ECE", year: "2nd Year", program: "Machine Learning", progress: 10, status: "Pending", hours: 5, enrollMonth: "Jun", domain: "Tech", role: "Faculty" },
    { name: "Sophia Martinez", initial: "S", regNo: "ISE23092", dept: "ISE", year: "4th Year", program: "Data Science", progress: 100, status: "Completed", hours: 150, enrollMonth: "Feb", domain: "Tech", role: "Student" },
    { name: "James Wilson", initial: "J", regNo: "ME23044", dept: "MECH", year: "3rd Year", program: "AWS Cloud", progress: 40, status: "In Progress", hours: 35, enrollMonth: "Apr", domain: "Engineering", role: "Student" },
    { name: "Linda Yang", initial: "L", regNo: "CS23101", dept: "CSE", year: "2nd Year", program: "UI/UX", progress: 85, status: "In Progress", hours: 65, enrollMonth: "Mar", domain: "Tech", role: "Student" },
    { name: "Omar Farooq", initial: "O", regNo: "EC23033", dept: "ECE", year: "4th Year", program: "Cybersec", progress: 100, status: "Completed", hours: 110, enrollMonth: "Feb", domain: "Tech", role: "Student" }
];

document.addEventListener('DOMContentLoaded', () => {

    // --- GLOBALS ---
    let enrollmentChart, performanceChart;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

    // Global defaults for dark theme
    Chart.defaults.color = '#94a3b8';
    Chart.defaults.font.family = 'Inter';

    // --- CHART INITIALIZATION ---
    function initCharts() {
        const ctxEnrollment = document.getElementById('enrollmentChart');
        if(ctxEnrollment) {
            enrollmentChart = new Chart(ctxEnrollment, {
                type: 'line',
                data: {
                    labels: months,
                    datasets: [{
                        label: 'Enrollments',
                        data: [0,0,0,0,0,0],
                        borderColor: '#a855f7',
                        backgroundColor: 'rgba(168, 85, 247, 0.1)',
                        borderWidth: 3,
                        tension: 0.4,
                        fill: true,
                        pointBackgroundColor: '#0a1128',
                        pointBorderColor: '#a855f7',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            backgroundColor: '#1e293b',
                            padding: 12,
                            titleColor: '#fff',
                            bodyColor: '#cbd5e1',
                            borderColor: 'rgba(255,255,255,0.1)',
                            borderWidth: 1
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: { precision: 0 },
                            grid: { color: 'rgba(255,255,255,0.05)' },
                            border: { display: false }
                        },
                        x: {
                            grid: { display: false },
                            border: { display: false }
                        }
                    }
                }
            });
        }

        const ctxPerformance = document.getElementById('performanceChart');
        if(ctxPerformance) {
            performanceChart = new Chart(ctxPerformance, {
                type: 'bar',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'Avg Completion (%)',
                        data: [],
                        backgroundColor: 'rgba(6, 182, 212, 0.8)',
                        borderRadius: 6,
                        borderWidth: 0,
                        hoverBackgroundColor: '#22d3ee'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            backgroundColor: '#1e293b',
                            padding: 12,
                            titleColor: '#fff',
                            bodyColor: '#cbd5e1',
                            borderColor: 'rgba(255,255,255,0.1)',
                            borderWidth: 1,
                            callbacks: {
                                label: function(context) {
                                    return context.raw.toFixed(1) + '%';
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            grid: { color: 'rgba(255,255,255,0.05)' },
                            border: { display: false }
                        },
                        x: {
                            grid: { display: false },
                            border: { display: false }
                        }
                    }
                }
            });
        }
    }

    // --- TABLE LOGIC ---
    const tableBody = document.getElementById('table-body');
    const searchInput = document.getElementById('table-search');
    
    // Setup pill click events
    const pillGroups = document.querySelectorAll('.filter-pills');
    pillGroups.forEach(group => {
        const pills = group.querySelectorAll('.fpill');
        pills.forEach(pill => {
            pill.addEventListener('click', () => {
                pills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                filterData();
            });
        });
    });

    // Setup toggle button click events
    const toggleGroups = document.querySelectorAll('.toggle-group');
    toggleGroups.forEach(group => {
        const btns = group.querySelectorAll('.toggle-btn');
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                btns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                filterData();
            });
        });
    });

    const selYear = document.getElementById('sel-year');
    const selProgress = document.getElementById('sel-progress');
    const selStatus = document.getElementById('sel-status');
    const selProgram = document.getElementById('sel-program');
    
    if(selYear) selYear.addEventListener('change', filterData);
    if(selProgress) selProgress.addEventListener('change', filterData);
    if(selStatus) selStatus.addEventListener('change', filterData);
    if(selProgram) selProgram.addEventListener('change', filterData);

    const clearBtn = document.getElementById('btn-clear-filters');
    if(clearBtn) {
        clearBtn.addEventListener('click', () => {
            if(searchInput) searchInput.value = '';
            
            document.querySelectorAll('.fpill[data-val="all"]').forEach(p => {
                let siblings = p.parentElement.querySelectorAll('.fpill');
                siblings.forEach(s => s.classList.remove('active'));
                p.classList.add('active');
            });
            
            document.querySelectorAll('.toggle-btn[data-val="all"]').forEach(t => {
                let siblings = t.parentElement.querySelectorAll('.toggle-btn');
                siblings.forEach(s => s.classList.remove('active'));
                t.classList.add('active');
            });
            
            if(selYear) selYear.value = 'all';
            if(selProgress) selProgress.value = 'all';
            if(selStatus) selStatus.value = 'all';
            if(selProgram) selProgram.value = 'all';
            filterData();
        });
    }

    // Pagination State
    let currentPage = 1;
    const itemsPerPage = 5;
    let currentFilteredData = [];

    // Stat Elements
    const elStatTotal = document.getElementById('stat-total');
    const elStatCompleted = document.getElementById('stat-completed');
    const elStatActive = document.getElementById('stat-active');
    const elStatHours = document.getElementById('stat-hours');

    function getStatusBadge(status) {
        if(status === 'Completed') return '<span class="ptag green">Completed</span>';
        if(status === 'In Progress') return '<span class="ptag blue">In Progress</span>';
        return '<span class="ptag orange">Pending</span>';
    }

    function getProgressBar(progress, status) {
        const fillClass = status === 'Completed' ? 'fill-blue' : 'fill-cyan';
        return `
            <div class="table-progress">
                <div class="progress-container">
                    <div class="progress-text">
                        <span>Overall</span>
                        <strong>${progress}%</strong>
                    </div>
                    <div class="progress-bar-bg">
                        <div class="progress-bar-fill ${fillClass}" style="width: ${progress}%;"></div>
                    </div>
                </div>
            </div>
        `;
    }

    function renderTable(data) {
        if(!tableBody) return;
        tableBody.innerHTML = '';
        
        if (data.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: #64748b; padding: 2rem;">No matching records found.</td></tr>`;
            return;
        }

        data.forEach(student => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <div class="t-name">
                        <div class="t-avatar">${student.initial}</div>
                        ${student.name}
                    </div>
                </td>
                <td><span style="color:#94a3b8">${student.regNo}</span></td>
                <td><span class="t-dept">${student.dept}</span></td>
                <td>${student.year}</td>
                <td>${student.program}</td>
                <td>${getProgressBar(student.progress, student.status)}</td>
                <td>${getStatusBadge(student.status)}</td>
            `;
            tableBody.appendChild(tr);
        });
    }

    function updateStats(data) {
        if (!elStatTotal) return;

        const total = data.length;
        const completed = data.filter(d => d.status === 'Completed').length;
        const active = data.filter(d => d.status === 'In Progress').length;
        const hours = data.reduce((acc, curr) => acc + curr.hours, 0);

        elStatTotal.textContent = total.toLocaleString();
        elStatCompleted.textContent = completed.toLocaleString();
        elStatActive.textContent = active.toLocaleString();
        elStatHours.textContent = hours.toLocaleString() + ' hrs';
    }

    function updateCharts(data) {
        if (!enrollmentChart || !performanceChart) return;

        // Update Line Chart (Enrollment Trends)
        const enrollmentsByMonth = months.map(m => {
            return data.filter(d => d.enrollMonth === m).length;
        });
        enrollmentChart.data.datasets[0].data = enrollmentsByMonth;
        enrollmentChart.update();

        // Update Bar Chart (Program Performance)
        const programMap = {};
        data.forEach(d => {
            if (!programMap[d.program]) {
                programMap[d.program] = { sum: 0, count: 0 };
            }
            programMap[d.program].sum += d.progress;
            programMap[d.program].count += 1;
        });

        const activePrograms = Object.keys(programMap);
        const avgCompletion = activePrograms.map(p => {
            return programMap[p].sum / programMap[p].count;
        });

        performanceChart.data.labels = activePrograms;
        performanceChart.data.datasets[0].data = avgCompletion;
        performanceChart.update();
    }

    function filterData() {
        const query = searchInput ? searchInput.value.toLowerCase() : '';
        const domain = document.querySelector('#tgg-domain .toggle-btn.active')?.dataset.val.toLowerCase() || 'all';
        const role = document.querySelector('#tgg-role .toggle-btn.active')?.dataset.val.toLowerCase() || 'all';
        const dept = document.querySelector('#pill-group-dept .fpill.active')?.dataset.val.toLowerCase() || 'all';
        const status = selStatus ? selStatus.value.toLowerCase() : 'all';
        const program = selProgram ? selProgram.value.toLowerCase() : 'all';
        const year = selYear ? selYear.value.toLowerCase() : 'all';
        const progressRange = selProgress ? selProgress.value : 'all';

        const filteredRecords = mockStudents.filter(student => {
            // Search
            const matchesSearch = student.name.toLowerCase().includes(query) || student.regNo.toLowerCase().includes(query);
            
            // Toggles
            const matchesDomain = domain === 'all' || student.domain.toLowerCase() === domain;
            const matchesRole = role === 'all' || student.role.toLowerCase() === role;
            
            // Pills & Selects
            const matchesDept = dept === 'all' || student.dept.toLowerCase() === dept;
            const matchesYear = year === 'all' || student.year.toLowerCase() === year;
            
            // Status
            const matchesStatus = status === 'all' || 
                (status === 'completed' && student.status === 'Completed') ||
                (status === 'in_progress' && student.status === 'In Progress') ||
                (status === 'pending' && student.status === 'Pending');
            
            // Program
            let mappedProgram = program;
            if(program === 'web') mappedProgram = 'web development';
            if(program === 'aws') mappedProgram = 'aws cloud';
            if(program === 'ml') mappedProgram = 'machine learning';
            if(program === 'uiux') mappedProgram = 'ui/ux';
            const matchesProgram = program === 'all' || student.program.toLowerCase() === mappedProgram;

            // Progress Logic
            let matchesProgress = true;
            if (progressRange !== 'all') {
                const parts = progressRange.split('-');
                if(parts.length === 2) {
                    const min = parseInt(parts[0]);
                    const max = parseInt(parts[1]);
                    matchesProgress = student.progress >= min && student.progress <= max;
                }
            }

            return matchesSearch && matchesDomain && matchesRole && matchesDept && matchesStatus && matchesProgram && matchesYear && matchesProgress;
        });

        currentFilteredData = filteredRecords;
        currentPage = 1;
        renderPagination();
        updateStats(filteredRecords);
        updateCharts(filteredRecords);
    }

    function renderPagination() {
        const totalItems = currentFilteredData.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
        
        if (currentPage < 1) currentPage = 1;
        if (currentPage > totalPages) currentPage = totalPages;

        const startIdx = (currentPage - 1) * itemsPerPage;
        const endIdx = startIdx + itemsPerPage;
        const slicedData = currentFilteredData.slice(startIdx, endIdx);

        renderTable(slicedData);

        // Update Page Info
        const infoEl = document.querySelector('.page-info');
        if (infoEl) {
            infoEl.textContent = `Showing ${totalItems === 0 ? 0 : startIdx + 1} to ${Math.min(endIdx, totalItems)} of ${totalItems} entries`;
        }

        // Update Page Controls HTML
        const controlsEl = document.querySelector('.page-controls');
        if (controlsEl) {
            let html = `<button class="btn-page" id="btn-prev"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg></button>`;
            
            for (let i = 1; i <= totalPages; i++) {
                html += `<button class="btn-page ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
            }
            
            html += `<button class="btn-page" id="btn-next"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg></button>`;
            
            controlsEl.innerHTML = html;

            const pageBtns = controlsEl.querySelectorAll('.btn-page[data-page]');
            pageBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    currentPage = parseInt(e.target.dataset.page);
                    renderPagination();
                });
            });

            document.getElementById('btn-prev').addEventListener('click', () => {
                if (currentPage > 1) { currentPage--; renderPagination(); }
            });
            document.getElementById('btn-next').addEventListener('click', () => {
                if (currentPage < totalPages) { currentPage++; renderPagination(); }
            });
        }
    }

    // Event Listeners for Filters
    if(searchInput) searchInput.addEventListener('input', filterData);

    // Initial Execution
    initCharts();
    filterData(); // Applies initial data to all features

    // Export Excel Feature
    const btnExport = document.getElementById('btn-export');
    if (btnExport) {
        btnExport.addEventListener('click', () => {
            const originalOutput = btnExport.innerHTML;
            btnExport.innerHTML = `Exporting...`;
            setTimeout(() => {
                btnExport.innerHTML = originalOutput;
                alert('Success: Excel Report based on current filters has been downloaded.');
            }, 1200);
        });
    }

    // Generate Quick Reports Feature
    const recButtons = document.querySelectorAll('.btn-enroll');
    recButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.rec-card');
            const title = card.querySelector('h3').textContent;
            const originalHTML = e.target.innerHTML;
            
            e.target.innerHTML = `Generating...`;
            setTimeout(() => {
                e.target.innerHTML = originalHTML;
                alert(`Success: ${title} generated successfully.`);
            }, 1000);
        });
    });

});

