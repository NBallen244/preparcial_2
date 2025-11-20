-- ============================================
-- INSERCIONES PARA BASE DE DATOS POSTGRESQL
-- ============================================

-- Paso 1: Insertar 3 roles (incluyendo Admin)
INSERT INTO role_entity (id, role_name, description, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'admin', 'Administrator with full system access', NOW()),
('550e8400-e29b-41d4-a716-446655440002', 'paciente', 'Regular user with limited access', NOW()),
('550e8400-e29b-41d4-a716-446655440003', 'doctor', 'Moderator with content management permissions', NOW());

-- Paso 2: Insertar 5 usuarios (2 desactivados)
INSERT INTO user_entity (id, name, email, password, phone, is_active, created_at) VALUES
-- Password: admin123
('650e8400-e29b-41d4-a716-446655440001', 'Juan Pérez', 'juan.perez@example.com', '$2b$10$2cbr5qj9akmkAnfBLwnIN.LCbfdfX2IUvM7XPjW7sxeyiZV3dTNLy', 3001234567, true, NOW()),
-- Password: password123
('650e8400-e29b-41d4-a716-446655440002', 'María García', 'maria.garcia@example.com', '$2b$10$ZsUsL4RWfcTHgHYL6VvUTeKcwJlskyZg0LCgingIqfVSyxXNujSvy', 3002345678, false, NOW()),
-- Password: user123
('650e8400-e29b-41d4-a716-446655440003', 'Carlos López', 'carlos.lopez@example.com', '$2b$10$7E2H.otd3GkyIJ1gOxEyQOEQojluYRb/VGEA303TQA1CMrpon7eV6', 3003456789, true, NOW()),
-- Password: test123
('650e8400-e29b-41d4-a716-446655440004', 'Ana Martínez', 'ana.martinez@example.com', '$2b$10$yCEtvPizx6MYE4HsEiA/6.wL6/GQeIFusiw2bHQ/6R/k1Ye8WxM2K', 3004567890, false, NOW()),
-- Password: demo123
('650e8400-e29b-41d4-a716-446655440005', 'Diego Rodríguez', 'diego.rodriguez@example.com', '$2b$10$jWSaLglqx0andFMlaI2Zg.35McXVgF4uwA6rOvPz.m4cdDJoSyYOm', 3005678901, true, NOW());

-- Paso 3: Relacionar usuarios con roles (2 usuarios con rol admin)
INSERT INTO user_entity_roles_role_entity ("userEntityId", "roleEntityId") VALUES
-- Juan Pérez (activo) tiene rol admin
('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001'),
-- María García (desactivada) tiene rol admin
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001'),
-- Carlos López (activo) tiene rol user
('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440002'),
-- Ana Martínez (desactivada) tiene rol moderator
('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440003'),
-- Diego Rodríguez (activo) tiene rol user
('650e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440002');
