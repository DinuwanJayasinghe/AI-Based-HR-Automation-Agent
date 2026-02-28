-- AI HR Manager PostgreSQL Schema & Seed Data
-- Database: hr_manager

-- 1. Departments Table
CREATE TABLE departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);

-- 2. Employees Table
CREATE TABLE employees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_code VARCHAR(20) UNIQUE NOT NULL,
    full_name VARCHAR(200) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    department_id UUID REFERENCES departments(id),
    role VARCHAR(20) DEFAULT 'employee',
    status VARCHAR(20) DEFAULT 'active',
    hire_date DATE NOT NULL,
    base_salary FLOAT DEFAULT 0.0,
    hourly_rate FLOAT DEFAULT 0.0,
    face_enrolled BOOLEAN DEFAULT FALSE,
    password_hash VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. Face Embeddings Table
CREATE TABLE face_embeddings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES employees(id) UNIQUE,
    embedding_vector TEXT NOT NULL,
    enrolled_at TIMESTAMP DEFAULT NOW()
);

-- 4. Attendance Records Table
CREATE TABLE attendance_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES employees(id),
    event_type VARCHAR(10) NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    confidence_score FLOAT,
    status VARCHAR(20) DEFAULT 'on_time',
    created_at TIMESTAMP DEFAULT NOW()
);

-- 5. Leave Types Table
CREATE TABLE leave_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    default_days INTEGER
);

-- 6. Leave Applications Table
CREATE TABLE leave_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES employees(id),
    leave_type_id UUID REFERENCES leave_types(id),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    duration_days INTEGER NOT NULL,
    reason TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    ai_decision VARCHAR(20),
    ai_explanation TEXT,
    policy_references JSONB,
    reviewed_by UUID REFERENCES employees(id),
    reviewed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 7. Performance Evaluations Table
CREATE TABLE performance_evaluations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES employees(id),
    evaluation_period VARCHAR(7) NOT NULL,
    punctuality_score FLOAT,
    attendance_score FLOAT,
    overtime_hours FLOAT,
    overall_score FLOAT,
    evaluation_data JSONB,
    ai_summary TEXT,
    status VARCHAR(20) DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT NOW()
);

-- 8. Salary Records Table
CREATE TABLE salary_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES employees(id),
    month VARCHAR(7) NOT NULL,
    base_salary FLOAT NOT NULL,
    overtime_hours FLOAT DEFAULT 0.0,
    overtime_pay FLOAT DEFAULT 0.0,
    bonus FLOAT DEFAULT 0.0,
    penalties FLOAT DEFAULT 0.0,
    leave_deductions FLOAT DEFAULT 0.0,
    net_salary FLOAT NOT NULL,
    status VARCHAR(20) DEFAULT 'draft',
    calculation_log JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    processed_at TIMESTAMP
);

-- 9. Compensation Records Table
CREATE TABLE compensation_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES employees(id),
    type VARCHAR(50) NOT NULL,
    amount FLOAT NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    created_by UUID REFERENCES employees(id),
    created_at TIMESTAMP DEFAULT NOW(),
    approved_at TIMESTAMP
);

-- 10. Job Postings Table
CREATE TABLE job_postings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    department_id UUID REFERENCES departments(id),
    description TEXT,
    requirements JSONB,
    status VARCHAR(20) DEFAULT 'open',
    created_by UUID REFERENCES employees(id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- 11. Candidates Table
CREATE TABLE candidates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID REFERENCES job_postings(id),
    full_name VARCHAR(200) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    resume_url VARCHAR(500),
    resume_score FLOAT,
    interview_score FLOAT,
    overall_rank INTEGER,
    status VARCHAR(20) DEFAULT 'applied',
    ai_report JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 12. Audit Logs Table
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES employees(id),
    action VARCHAR(100) NOT NULL,
    module VARCHAR(50) NOT NULL,
    details JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT NOW()
);

-- SEED DATA
INSERT INTO departments (id, name, description) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Engineering', 'Software and Product Development'),
('6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'Human Resources', 'People and Operations'),
('4e2e2e2e-2e2e-2e2e-2e2e-2e2e2e2e2e2e', 'Management', 'Executive Leadership');

INSERT INTO leave_types (id, name, description, default_days) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Annual', 'Paid annual leave', 14),
('6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'Sick', 'Paid sick leave', 7),
('8d8d8d8d-8d8d-8d8d-8d8d-8d8d8d8d8d8d', 'Casual', 'Unplanned personal leave', 7);

-- System Admin User (Password: admin123)
INSERT INTO employees (id, employee_code, full_name, email, role, status, department_id, hire_date, base_salary, hourly_rate, password_hash) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'ADM001', 'System Administrator', 'admin@company.com', 'admin', 'active', '6ba7b810-9dad-11d1-80b4-00c04fd430c8', '2023-01-01', 150000, 850, '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6L6S5.7S.tQ6H5KO');
