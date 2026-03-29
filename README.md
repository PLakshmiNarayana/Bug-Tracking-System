# 🐛 Bug Tracking System

A full-stack, role-based Bug Tracking and Management System developed 
as part of the TalentSprint Full Stack Developer Program. The system 
allows teams to report, assign, track, and resolve software bugs 
efficiently — with secure login, role-based dashboards, and email 
notifications built in.

---

## 👥 Team

| Name | Role |
|---|---|
| P. Lakshmi Narayana | Full Stack Developer |
| S. Akthar | Full Stack Developer |
| S. Krishna Nihar | Full Stack Developer |

> 🎓 TalentSprint Full Stack Developer — Cohort 69

---

## 🏗️ Project Structure
```
Bug-Tracking-System/
├── frontend/   → Angular 17 (Standalone Components)
└── backend/    → Spring Boot 3 + MySQL
```

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Angular 17, TypeScript, Standalone Components |
| Backend | Spring Boot 3, Java |
| Security | Spring Security 6, JWT Authentication |
| Database | MySQL, Hibernate / JPA |
| Build Tool | Maven |
| Communication | RESTful APIs |

---

## ✨ What This System Can Do

### 🔐 Authentication & Security
Every user must log in with a verified account. 
Passwords are protected and sessions are managed 
using JWT tokens — so only the right people see 
the right things.

- Secure login and logout with JWT
- Forgot Password and Reset Password via email (Gmail SMTP)
- Role-based route protection — users only see what they are allowed to

---

### 👨‍💼 Admin
The Admin has full control over the entire system.

- Create and manage Projects
- Register new users and assign them roles (Admin, Developer, Tester)
- Assign Developers to reported bugs
- View all bugs across all projects
- Monitor progress through a bug statistics dashboard

---

### 🧑‍💻 Developer
Developers focus on what is assigned to them.

- View all bugs assigned to them
- Update bug status as work progresses — Open → In Progress → Resolved
- View project details related to their work

---

### 🧪 Tester
Testers are responsible for finding and reporting issues.

- Report new bugs and link them to a project
- Upload screenshots or files as attachments
- Track the status of reported bugs in real time

---

## 🐞 Key Technical Challenges We Solved

Building this project was not just about writing code — 
we ran into real-world problems and solved them:

| Challenge | Solution |
|---|---|
| UI not updating after data changes | Fixed using `NgZone.run()` and `detectChanges()` in Angular |
| API calls returning 403 Forbidden | Corrected JWT SecurityConfig to allow proper endpoints |
| JWT token not reaching the backend | Built `auth-interceptor.ts` to attach token to every request |
| No way to assign bugs to developers | Added Assign Developer dropdown across bug management |
| Project name missing from bug details | Added `projectName` field across Bug and Build models |
| Users locked out with no recovery | Built complete Forgot Password and Reset Password email flow |

---

## ⚙️ How to Run This Project

### 🖥️ Backend (Spring Boot)

1. Clone this repository
2. Navigate to the `backend/` folder
3. Copy the example config file:
```
   src/main/resources/application.properties.example
   → src/main/resources/application.properties
```
4. Open `application.properties` and update:
   - `spring.datasource.url`
   - `spring.datasource.username`
   - `spring.datasource.password`
   - `spring.mail.username`
   - `spring.mail.password` ← use a Gmail App Password
5. Create the database in MySQL:
```sql
   CREATE DATABASE bugtracker;
```
6. Run the Spring Boot application —
   Hibernate will automatically create all required tables

---

### 🌐 Frontend (Angular)

1. Navigate to the `frontend/` folder
2. Install dependencies:
```
   npm install
```
3. Start the development server:
```
   ng serve
```
4. Open your browser and go to:
```
   http://localhost:4200
```

---

## 🔐 User Roles at a Glance

| Role | What They Can Do |
|---|---|
| **Admin** | Full access — manage users, projects, and bugs |
| **Developer** | View and resolve bugs assigned to them |
| **Tester** | Report new bugs and track their progress |

---

## 📁 Important Files to Know

| File | What It Does |
|---|---|
| `auth-interceptor.ts` | Automatically attaches JWT token to every HTTP request |
| `SecurityConfig.java` | Configures Spring Security with JWT rules |
| `BugController.java` | Handles all bug-related REST API endpoints |
| `application.properties.example` | Safe template showing required configuration |

---

## 📌 Note

The real `application.properties` file is excluded from this 
repository for security reasons. Please use the 
`application.properties.example` file as a reference to set up 
your own local configuration.
