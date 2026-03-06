// ==================== البيانات ====================
        let users = JSON.parse(localStorage.getItem('users')) || [
            { id: 1, name: "احمد", password: "1111", tasks: [1] },
            { id: 2, name: "سعيد رجب", password: "2222", tasks: [2] },
            { id: 3, name: "محمد أيمن", password: "3333", tasks: [3] },
            { id: 4, name: "احمد اسماعيل", password: "4444", tasks: [4] },
            { id: 5, name: "عبد الرحمن", password: "5555", tasks: [5] },
            { id: 6, name: "اسامه سامي", password: "6666", tasks: [6] },
            { id: 7, name: "احمد شاذلي", password: "7777", tasks: [7] },
            { id: 8, name: "احمد رجب", password: "8888", tasks: [8] },
            { id: 9, name: "احمد السيد", password: "9999", tasks: [9] },
            { id: 10, name: "محمد فتحي", password: "1010", tasks: [10] },
            { id: 11, name: "امانى محمد", password: "1110", tasks: [11] },
            { id: 12, name: "مريم", password: "1210", tasks: [12] },
            { id: 13, name: "مارتينا نبيل", password: "1310", tasks: [13] },
            { id: 14, name: "ابراهيم محمد", password: "5678", tasks: [14] },
            { id: 15, name: "Ahmed", password: "a7med", tasks: [], isAdmin: true }
        ];

        // المهام مع الشرح
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [
            { id: 1, title: "Introduction", refs: "1.1, 1.2, 1.3, 2.1, 2.2", status: "لم تبدأ", description: "مقدمة عن المشروع وأهدافه. تشمل الأقسام: 1.1 نظرة عامة، 1.2 أهداف المشروع، 1.3 نطاق العمل، 2.1 المتطلبات الأساسية، 2.2 تحليل الجدوى" },
            { id: 2, title: "Introduction", refs: "2.3, 2.4", status: "لم تبدأ", description: "استكمال المقدمة: 2.3 دراسة السوق، 2.4 تحليل المنافسين" },
            { id: 3, title: "5G Radio Technology Fundamentals", refs: "2.5, 2.6, 2.9", status: "لم تبدأ", description: "أساسيات تقنية الراديو في 5G: 2.5 مبادئ الاتصالات، 2.6 تقنيات التعديل، 2.9 معايير الأداء" },
            { id: 4, title: "Planning Analysis", refs: "3.1, 3.2", status: "لم تبدأ", description: "تحليل التخطيط: 3.1 متطلبات التغطية، 3.2 سعة الشبكة" },
            { id: 5, title: "Planning Analysis", refs: "3.3", status: "لم تبدأ", description: "3.3 تحليل الموقع واختيار المواقع" },
            { id: 6, title: "Planning Analysis", refs: "3.4, 3.5, 3.6", status: "لم تبدأ", description: "3.4 تخطيط الترددات، 3.5 تحليل التداخل، 3.6 تحسين الأداء" },
            { id: 7, title: "Analysis", refs: "4.1, 4.2, 4.3", status: "لم تبدأ", description: "التحليل الفني: 4.1 تحليل الإشارة، 4.2 جودة الخدمة، 4.3 متطلبات الأجهزة" },
            { id: 8, title: "Analysis", refs: "4.4", status: "لم تبدأ", description: "4.4 تحليل التكاليف" },
            { id: 9, title: "Analysis", refs: "4.5, 4.6, 4.7", status: "لم تبدأ", description: "4.5 تحليل المخاطر، 4.6 تحليل الأمان، 4.7 تحليل الأداء" },
            { id: 10, title: "التنفيذ والنتائج", refs: "5.1, 5.2, 5.3, 5.4", status: "لم تبدأ", description: "مرحلة التنفيذ: 5.1 خطة التنفيذ، 5.2 تجهيز المواقع، 5.3 تركيب المعدات، 5.4 الاختبارات الأولية" },
            { id: 11, title: "التنفيذ والنتائج", refs: "5.5, 5.6", status: "لم تبدأ", description: "5.5 قياسات الأداء، 5.6 تحليل النتائج" },
            { id: 12, title: "التنفيذ والنتائج", refs: "5.7, 5.8", status: "لم تبدأ", description: "5.7 التعديلات والتحسينات، 5.8 النتائج النهائية" },
            { id: 13, title: "Massive MIMO", refs: "6", status: "لم تبدأ", description: "تقنية Massive MIMO في 5G: شرح المصفوفات الضخمة، فوائدها في زيادة السعة وتحسين التغطية" },
            { id: 14, title: "Radio Network Challenges", refs: "7", status: "لم تبدأ", description: "تحديات شبكات الراديو: التداخل، التغطية، سعة الشبكة، جودة الخدمة، حلول هذه التحديات" }
        ];

        // الرسائل
        let messages = JSON.parse(localStorage.getItem('messages')) || [];

        // متغيرات عامة
        let nextTaskId = tasks.length + 1;
        let nextUserId = users.length + 1;
        let nextMessageId = messages.length + 1;
        let currentSection = 'dashboard';
        let messagesVisible = false;
        let messagesContentVisible = false;
        let selectedTaskForDescription = null;

        // حفظ البيانات
        function saveAllData() {
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('tasks', JSON.stringify(tasks));
            localStorage.setItem('messages', JSON.stringify(messages));
        }

        // تحديث حالة المهمة
        function updateTaskStatus(taskId, newStatus) {
            const task = tasks.find(t => t.id === taskId);
            if (task) {
                task.status = newStatus;
                saveAllData();
                return true;
            }
            return false;
        }

        // ==================== إدارة الصفحات ====================
        const app = document.getElementById('app');
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));

        // دالة تسجيل الخروج
        function logout() {
            localStorage.removeItem('currentUser');
            currentUser = null;
            document.getElementById('messagesPanel').style.display = 'none';
            showLoginPage();
        }

        // دالة تسجيل الدخول
        function login(username, password) {
            const user = users.find(u => u.name === username && u.password === password);
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                currentUser = user;
                document.getElementById('messagesPanel').style.display = 'block';
                updateUnreadCount();
                if (user.isAdmin) {
                    showAdminDashboard();
                } else {
                    showUserPage();
                }
                return true;
            }
            return false;
        }

        // ==================== دوال الرسائل ====================
        function sendMessage() {
            const messageText = document.getElementById('newMessage').value.trim();
            if (!messageText) return;

            const recipientId = currentUser.isAdmin ? 
                (currentChatUserId || null) : 15; // إذا كان المستخدم عادي يرسل للمدير

            const newMessage = {
                id: nextMessageId++,
                senderId: currentUser.id,
                senderName: currentUser.name,
                recipientId: recipientId,
                text: messageText,
                time: new Date().toLocaleString('ar-EG'),
                read: false
            };

            messages.push(newMessage);
            saveAllData();
            document.getElementById('newMessage').value = '';
            
            if (currentUser.isAdmin && currentChatUserId) {
                showChatWithUser(currentChatUserId);
            } else {
                showMessages();
            }
            
            updateUnreadCount();
        }

        function getUnreadCount() {
            if (!currentUser) return 0;
            
            if (currentUser.isAdmin) {
                // المدير: عدد الرسائل غير المقروءة من كل المستخدمين
                return messages.filter(m => m.recipientId === 15 && !m.read).length;
            } else {
                // المستخدم: عدد الرسائل غير المقروءة من المدير
                return messages.filter(m => m.recipientId === currentUser.id && !m.read).length;
            }
        }

        function updateUnreadCount() {
            const count = getUnreadCount();
            document.getElementById('unreadCount').textContent = count;
            if (count > 0) {
                document.getElementById('unreadCount').style.display = 'inline';
            } else {
                document.getElementById('unreadCount').style.display = 'none';
            }
        }

        function markMessagesAsRead(userId) {
            messages.forEach(m => {
                if (m.recipientId === userId || (m.senderId === userId && m.recipientId === currentUser.id)) {
                    m.read = true;
                }
            });
            saveAllData();
            updateUnreadCount();
        }

        function toggleMessages() {
            messagesContentVisible = !messagesContentVisible;
            document.getElementById('messagesContent').style.display = messagesContentVisible ? 'block' : 'none';
            document.getElementById('messageInput').style.display = messagesContentVisible ? 'flex' : 'none';
            
            if (messagesContentVisible) {
                if (currentUser.isAdmin) {
                    showUserList();
                } else {
                    showMessages();
                }
            }
        }

        function showUserList() {
            const content = document.getElementById('messagesContent');
            let html = '<div style="padding: 10px;">';
            
            // عرض المستخدمين
            users.filter(u => !u.isAdmin).forEach(u => {
                const unreadFromUser = messages.filter(m => m.senderId === u.id && !m.read).length;
                html += `
                    <div onclick="showChatWithUser(${u.id})" style="
                        padding: 10px;
                        margin: 5px 0;
                        background: rgba(0,168,255,0.1);
                        border-radius: 10px;
                        cursor: pointer;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    ">
                        <span>${u.name}</span>
                        ${unreadFromUser > 0 ? `<span class="unread-badge">${unreadFromUser}</span>` : ''}
                    </div>
                `;
            });
            
            html += '</div>';
            content.innerHTML = html;
        }

        let currentChatUserId = null;

        function showChatWithUser(userId) {
            currentChatUserId = userId;
            const user = users.find(u => u.id === userId);
            const content = document.getElementById('messagesContent');
            
            // تعليم الرسائل كمقروءة
            markMessagesAsRead(userId);
            
            // عرض المحادثة
            let html = `<div style="padding: 10px;">
                <div onclick="showUserList()" style="
                    padding: 5px;
                    margin-bottom: 10px;
                    background: #00a8ff;
                    border-radius: 5px;
                    cursor: pointer;
                    text-align: center;
                ">🔙 رجوع</div>
            `;
            
            const chatMessages = messages.filter(m => 
                (m.senderId === currentUser.id && m.recipientId === userId) ||
                (m.senderId === userId && m.recipientId === currentUser.id)
            ).sort((a, b) => new Date(a.time) - new Date(b.time));
            
            chatMessages.forEach(m => {
                const messageClass = m.senderId === currentUser.id ? 'sent' : 'received';
                html += `
                    <div class="message ${messageClass}">
                        <div class="sender">${m.senderName}</div>
                        <div>${m.text}</div>
                        <div class="time">${m.time}</div>
                    </div>
                `;
            });
            
            html += '</div>';
            content.innerHTML = html;
            
            // تمرير لآخر رسالة
            setTimeout(() => {
                content.scrollTop = content.scrollHeight;
            }, 100);
        }

        function showMessages() {
            if (!currentUser) return;
            
            const content = document.getElementById('messagesContent');
            let html = '';
            
            const userMessages = messages.filter(m => 
                m.senderId === currentUser.id || m.recipientId === currentUser.id
            ).sort((a, b) => new Date(a.time) - new Date(b.time));
            
            // تعليم الرسائل كمقروءة
            markMessagesAsRead(currentUser.id);
            
            userMessages.forEach(m => {
                const messageClass = m.senderId === currentUser.id ? 'sent' : 'received';
                html += `
                    <div class="message ${messageClass}">
                        <div class="sender">${m.senderName}</div>
                        <div>${m.text}</div>
                        <div class="time">${m.time}</div>
                    </div>
                `;
            });
            
            if (html === '') {
                html = '<div style="text-align: center; color: #888; padding: 20px;">لا توجد رسائل بعد</div>';
            }
            
            content.innerHTML = html;
            
            // تمرير لآخر رسالة
            setTimeout(() => {
                content.scrollTop = content.scrollHeight;
            }, 100);
        }

        // ==================== دوال المستخدمين ====================
        function addUser(userData) {
            const newUser = {
                id: nextUserId++,
                ...userData,
                tasks: []
            };
            users.push(newUser);
            saveAllData();
            return newUser;
        }

        function deleteUser(userId) {
            if (userId === 15) { // منع حذف المدير
                alert('لا يمكن حذف المدير');
                return false;
            }
            users = users.filter(u => u.id !== userId);
            saveAllData();
            return true;
        }

        function updateUser(userId, newData) {
            const user = users.find(u => u.id === userId);
            if (user) {
                Object.assign(user, newData);
                saveAllData();
                return true;
            }
            return false;
        }

        // ==================== دوال المهام ====================
        function addTask(taskData) {
            const newTask = {
                id: nextTaskId++,
                ...taskData,
                status: "لم تبدأ"
            };
            tasks.push(newTask);
            saveAllData();
            return newTask;
        }

        function deleteTask(taskId) {
            tasks = tasks.filter(t => t.id !== taskId);
            // حذف المهمة من المستخدمين
            users.forEach(u => {
                u.tasks = u.tasks.filter(id => id !== taskId);
            });
            saveAllData();
            return true;
        }

        function updateTask(taskId, newData) {
            const task = tasks.find(t => t.id === taskId);
            if (task) {
                Object.assign(task, newData);
                saveAllData();
                return true;
            }
            return false;
        }

        function assignTaskToUser(taskId, userId) {
            const user = users.find(u => u.id === userId);
            if (user && !user.tasks.includes(taskId)) {
                user.tasks.push(taskId);
                saveAllData();
                return true;
            }
            return false;
        }

        // دالة عرض شرح المهمة
        function showTaskDescription(taskId) {
            selectedTaskForDescription = taskId;
            if (currentUser.isAdmin) {
                if (currentSection === 'tasks') {
                    showTaskManagement();
                }
            } else {
                showUserPage();
            }
        }

        function closeTaskDescription() {
            selectedTaskForDescription = null;
            if (currentUser.isAdmin) {
                if (currentSection === 'tasks') {
                    showTaskManagement();
                }
            } else {
                showUserPage();
            }
        }

        // ==================== عرض صفحات الموقع ====================
        
        // صفحة تسجيل الدخول
        function showLoginPage() {
            app.innerHTML = `
                <div class="login-container">
                    <h2>🔐 تسجيل الدخول</h2>
                    <input type="text" id="username" placeholder="اسم المستخدم" autocomplete="off">
                    <input type="password" id="password" placeholder="الرقم السري">
                    <button onclick="handleLogin()">دخول ⚡</button>
                    <p id="error" style="color:#ff6b6b; margin-top:15px;"></p>
                   
                </div>
            `;
        }

        // صفحة المستخدم العادي (مع صندوق شرح لمهامه)
        function showUserPage() {
            const userTasks = tasks.filter(t => currentUser.tasks.includes(t.id));
            
            // عرض شرح المهمة المحددة
            let descriptionHtml = '';
            if (selectedTaskForDescription) {
                const task = tasks.find(t => t.id === selectedTaskForDescription);
                if (task && currentUser.tasks.includes(task.id)) {
                    descriptionHtml = `
                        <div class="task-description-box">
                            <h3>📖 شرح المهمة: ${task.title}</h3>
                            <p>${task.description || 'لا يوجد شرح لهذه المهمة'}</p>
                            <button class="close-btn" onclick="closeTaskDescription()">إغلاق</button>
                        </div>
                    `;
                } else {
                    selectedTaskForDescription = null;
                }
            }
            
            let tasksHtml = '';
            userTasks.forEach(t => {
                const statusClass = t.status === 'تمت' ? 'status-done' : 'status-pending';
                tasksHtml += `<tr>
                    <td>${t.id}</td>
                    <td>
                        ${t.title}
                        <button class="edit-btn" onclick="showTaskDescription(${t.id})" style="font-size: 10px; padding: 2px 5px; background: #00a8ff;">📖 شرح</button>
                    </td>
                    <td>
                        <select class="status-select" onchange="changeUserTaskStatus(${t.id}, this.value)">
                            <option value="لم تبدأ" ${t.status === 'لم تبدأ' ? 'selected' : ''}>لم تبدأ</option>
                            <option value="قيد التنفيذ" ${t.status === 'قيد التنفيذ' ? 'selected' : ''}>قيد التنفيذ</option>
                            <option value="تمت" ${t.status === 'تمت' ? 'selected' : ''}>تمت</option>
                        </select>
                    </td>
                    <td>${t.refs}</td>
                </tr>`;
            });

            app.innerHTML = `
                <div class="container">
                    <div class="header">
                        <h2>👋 مرحباً ${currentUser.name}</h2>
                        <button class="logout-btn" onclick="logout()">خروج من الشبكة 🚪</button>
                    </div>
                    
                    <div class="tasks-summary">
                        <p>📋 مهامك في شبكة 5G: <span>${userTasks.length}</span></p>
                    </div>

                    ${descriptionHtml}

                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>الموضوع</th>
                                <th>الحالة</th>
                                <th>الأرقام المرجعية</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tasksHtml || '<tr><td colspan="4">لا توجد مهام مخصصة لك</td></tr>'}
                        </tbody>
                    </table>
                </div>
            `;
        }

        // صفحة المدير - لوحة التحكم الرئيسية
        function showAdminDashboard() {
            currentSection = 'dashboard';
            const totalTasks = tasks.length;
            const completedTasks = tasks.filter(t => t.status === 'تمت').length;
            const pendingTasks = tasks.filter(t => t.status !== 'تمت').length;
            const totalUsers = users.length - 1; // من غير المدير

            let tasksHtml = '';
            tasks.forEach(t => {
                const assigned = users.find(u => u.tasks.includes(t.id))?.name || 'غير معين';
                const statusClass = t.status === 'تمت' ? 'status-done' : 'status-pending';
                
                tasksHtml += `<tr>
                    <td>${t.id}</td>
                    <td>${t.title}</td>
                    <td class="${statusClass}">${t.status}</td>
                    <td>${t.refs}</td>
                    <td>${assigned}</td>
                    <td>
                        <select class="status-select" onchange="changeStatus(${t.id}, this.value)">
                            <option value="لم تبدأ" ${t.status === 'لم تبدأ' ? 'selected' : ''}>لم تبدأ</option>
                            <option value="قيد التنفيذ" ${t.status === 'قيد التنفيذ' ? 'selected' : ''}>قيد التنفيذ</option>
                            <option value="تمت" ${t.status === 'تمت' ? 'selected' : ''}>تمت</option>
                        </select>
                    </td>
                </tr>`;
            });

            app.innerHTML = `
                <div class="container dashboard">
                    <div class="header">
                        <h2>👑 لوحة تحكم شبكة 5G</h2>
                        <button class="logout-btn" onclick="logout()">خروج من الشبكة 🚪</button>
                    </div>

                    <div class="nav-menu">
                        <button class="nav-btn active" onclick="showAdminDashboard()">📊 الرئيسية</button>
                        <button class="nav-btn" onclick="showUserManagement()">👥 إدارة المستخدمين</button>
                        <button class="nav-btn" onclick="showTaskManagement()">📋 إدارة المهام</button>
                    </div>

                    <div class="stats">
                        <div class="stat-card">
                            <h3>إجمالي المهام</h3>
                            <p class="stat-number">${totalTasks}</p>
                        </div>
                        <div class="stat-card">
                            <h3>المهام المنجزة</h3>
                            <p class="stat-number">${completedTasks}</p>
                        </div>
                        <div class="stat-card">
                            <h3>المهام قيد التنفيذ</h3>
                            <p class="stat-number">${pendingTasks}</p>
                        </div>
                        <div class="stat-card">
                            <h3>عدد المستخدمين</h3>
                            <p class="stat-number">${totalUsers}</p>
                        </div>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>الموضوع</th>
                                <th>الحالة</th>
                                <th>الأرقام المرجعية</th>
                                <th>المسؤول</th>
                                <th>تحديث الحالة</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tasksHtml}
                        </tbody>
                    </table>
                </div>
            `;
        }

        // صفحة إدارة المستخدمين
        function showUserManagement() {
            currentSection = 'users';
            
            let usersHtml = '';
            users.forEach(u => {
                if (!u.isAdmin) {
                    usersHtml += `<tr>
                        <td>${u.id}</td>
                        <td>${u.name}</td>
                        <td>${u.password}</td>
                        <td>${u.tasks.length}</td>
                        <td>
                            <button class="edit-btn" onclick="editUser(${u.id})">✏️ تعديل</button>
                            <button class="delete-btn" onclick="deleteUserHandler(${u.id})">🗑️ حذف</button>
                            <button class="message-btn" onclick="showChatWithUser(${u.id})">📨 محادثة</button>
                        </td>
                    </tr>`;
                }
            });

            app.innerHTML = `
                <div class="container">
                    <div class="header">
                        <h2>👥 إدارة المستخدمين</h2>
                        <button class="logout-btn" onclick="logout()">خروج من الشبكة 🚪</button>
                    </div>

                    <div class="nav-menu">
                        <button class="nav-btn" onclick="showAdminDashboard()">📊 الرئيسية</button>
                        <button class="nav-btn active" onclick="showUserManagement()">👥 إدارة المستخدمين</button>
                        <button class="nav-btn" onclick="showTaskManagement()">📋 إدارة المهام</button>
                    </div>

                    <div class="add-form">
                        <h3>➕ إضافة مستخدم جديد</h3>
                        <div class="form-row">
                            <input type="text" id="newUserName" placeholder="اسم المستخدم">
                            <input type="password" id="newUserPassword" placeholder="الرقم السري">
                            <button onclick="addUserHandler()">إضافة مستخدم</button>
                        </div>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>الاسم</th>
                                <th>الرقم السري</th>
                                <th>عدد المهام</th>
                                <th>الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${usersHtml}
                        </tbody>
                    </table>
                </div>
            `;
        }

        // صفحة إدارة المهام (مع صندوق شرح المهمة)
        function showTaskManagement() {
            currentSection = 'tasks';
            
            let tasksHtml = '';
            tasks.forEach(t => {
                const assignedUsers = users.filter(u => u.tasks.includes(t.id)).map(u => u.name).join('، ') || 'غير معين';
                
                tasksHtml += `<tr>
                    <td>${t.id}</td>
                    <td>${t.title}</td>
                    <td>${t.refs}</td>
                    <td>${t.status}</td>
                    <td>${assignedUsers}</td>
                    <td>
                        <button class="edit-btn" onclick="editTask(${t.id})">✏️ تعديل</button>
                        <button class="delete-btn" onclick="deleteTaskHandler(${t.id})">🗑️ حذف</button>
                        <button class="edit-btn" onclick="assignTask(${t.id})">👥 تعيين</button>
                        <button class="edit-btn" onclick="showTaskDescription(${t.id})">📖 عرض الشرح</button>
                    </td>
                </tr>`;
            });

            // عرض شرح المهمة المحددة
            let descriptionHtml = '';
            if (selectedTaskForDescription) {
                const task = tasks.find(t => t.id === selectedTaskForDescription);
                if (task) {
                    descriptionHtml = `
                        <div class="task-description-box">
                            <h3>📖 شرح المهمة: ${task.title}</h3>
                            <p>${task.description || 'لا يوجد شرح لهذه المهمة'}</p>
                            <button onclick="editTaskDescription(${task.id})" style="background: #f39c12; color: white; border: none; padding: 8px 20px; border-radius: 5px; cursor: pointer; font-size: 14px; margin-left: 10px;">✏️ تعديل الشرح</button>
                            <button class="close-btn" onclick="closeTaskDescription()">إغلاق</button>
                        </div>
                    `;
                }
            }

            app.innerHTML = `
                <div class="container">
                    <div class="header">
                        <h2>📋 إدارة المهام</h2>
                        <button class="logout-btn" onclick="logout()">خروج من الشبكة 🚪</button>
                    </div>

                    <div class="nav-menu">
                        <button class="nav-btn" onclick="showAdminDashboard()">📊 الرئيسية</button>
                        <button class="nav-btn" onclick="showUserManagement()">👥 إدارة المستخدمين</button>
                        <button class="nav-btn active" onclick="showTaskManagement()">📋 إدارة المهام</button>
                    </div>

                    <div class="add-form">
                        <h3>➕ إضافة مهمة جديدة</h3>
                        <div class="form-row">
                            <input type="text" id="newTaskTitle" placeholder="عنوان المهمة">
                            <input type="text" id="newTaskRefs" placeholder="الأرقام المرجعية">
                            <textarea id="newTaskDescription" placeholder="شرح المهمة" rows="3"></textarea>
                            <button onclick="addTaskHandler()">إضافة مهمة</button>
                        </div>
                    </div>

                    ${descriptionHtml}

                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>العنوان</th>
                                <th>الأرقام المرجعية</th>
                                <th>الحالة</th>
                                <th>المسؤولون</th>
                                <th>الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tasksHtml}
                        </tbody>
                    </table>
                </div>
            `;
        }

        // ==================== دوال المعالجة ====================
        window.handleLogin = function() {
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            
            if (login(username, password)) {
                // تم تسجيل الدخول بنجاح
            } else {
                document.getElementById('error').innerText = '❌ اسم المستخدم أو الرقم السري خطأ';
            }
        };

        window.changeStatus = function(taskId, newStatus) {
            if (updateTaskStatus(taskId, newStatus)) {
                showAdminDashboard();
            }
        };

        window.changeUserTaskStatus = function(taskId, newStatus) {
            if (updateTaskStatus(taskId, newStatus)) {
                showUserPage();
            }
        };

        // دوال إدارة المستخدمين
        window.addUserHandler = function() {
            const name = document.getElementById('newUserName').value.trim();
            const password = document.getElementById('newUserPassword').value.trim();
            
            if (name && password) {
                addUser({ name, password });
                showUserManagement();
            } else {
                alert('الرجاء إدخال جميع البيانات');
            }
        };

        window.deleteUserHandler = function(userId) {
            if (confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
                if (deleteUser(userId)) {
                    showUserManagement();
                }
            }
        };

        window.editUser = function(userId) {
            const user = users.find(u => u.id === userId);
            const newName = prompt('أدخل الاسم الجديد:', user.name);
            const newPassword = prompt('أدخل الرقم السري الجديد:', user.password);
            
            if (newName && newPassword) {
                updateUser(userId, { name: newName, password: newPassword });
                showUserManagement();
            }
        };

        // دوال إدارة المهام
        window.addTaskHandler = function() {
            const title = document.getElementById('newTaskTitle').value.trim();
            const refs = document.getElementById('newTaskRefs').value.trim();
            const description = document.getElementById('newTaskDescription').value.trim();
            
            if (title && refs) {
                addTask({ title, refs, description });
                showTaskManagement();
            } else {
                alert('الرجاء إدخال جميع البيانات');
            }
        };

        window.deleteTaskHandler = function(taskId) {
            if (confirm('هل أنت متأكد من حذف هذه المهمة؟')) {
                deleteTask(taskId);
                if (selectedTaskForDescription === taskId) {
                    selectedTaskForDescription = null;
                }
                showTaskManagement();
            }
        };

        window.editTask = function(taskId) {
            const task = tasks.find(t => t.id === taskId);
            const newTitle = prompt('أدخل العنوان الجديد:', task.title);
            const newRefs = prompt('أدخل الأرقام المرجعية الجديدة:', task.refs);
            
            if (newTitle && newRefs) {
                updateTask(taskId, { title: newTitle, refs: newRefs });
                showTaskManagement();
            }
        };

        window.editTaskDescription = function(taskId) {
            const task = tasks.find(t => t.id === taskId);
            const newDescription = prompt('أدخل الشرح الجديد للمهمة:', task.description || '');
            
            if (newDescription !== null) {
                updateTask(taskId, { description: newDescription });
                selectedTaskForDescription = taskId;
                showTaskManagement();
            }
        };

        window.assignTask = function(taskId) {
            const availableUsers = users.filter(u => !u.isAdmin);
            let userList = 'اختر المستخدم:\n';
            availableUsers.forEach((u, index) => {
                userList += `${index + 1}. ${u.name}\n`;
            });
            
            const choice = prompt(userList + 'أدخل رقم المستخدم:');
            const userIndex = parseInt(choice) - 1;
            
            if (userIndex >= 0 && userIndex < availableUsers.length) {
                const userId = availableUsers[userIndex].id;
                assignTaskToUser(taskId, userId);
                showTaskManagement();
            }
        };

        window.showTaskDescription = function(taskId) {
            selectedTaskForDescription = taskId;
            if (currentUser.isAdmin) {
                showTaskManagement();
            } else {
                showUserPage();
            }
        };

        window.closeTaskDescription = function() {
            selectedTaskForDescription = null;
            if (currentUser.isAdmin) {
                showTaskManagement();
            } else {
                showUserPage();
            }
        };

        window.logout = logout;

        // ==================== تشغيل الموقع ====================
        if (currentUser) {
            document.getElementById('messagesPanel').style.display = 'block';
            updateUnreadCount();
            if (currentUser.isAdmin) {
                showAdminDashboard();
            } else {
                showUserPage();
            }
        } else {
            showLoginPage();
        }

        // تحديث عدد الرسائل كل 5 ثواني
        setInterval(updateUnreadCount, 5000);