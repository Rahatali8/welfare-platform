-- Clear existing data
DELETE FROM donations;
DELETE FROM assistance_requests;
DELETE FROM users;

-- Reset auto-increment counters
ALTER TABLE users AUTO_INCREMENT = 1;
ALTER TABLE assistance_requests AUTO_INCREMENT = 1;
ALTER TABLE donations AUTO_INCREMENT = 1;

-- Note: No test users are created
-- Users must sign up through the application to create accounts
-- This ensures proper authentication flow and data integrity

-- Insert some sample donation records for statistics (without linking to specific users)
INSERT INTO donations (donor_id, request_id, amount, status, created_at) VALUES
(NULL, NULL, 50000, 'completed', DATE_SUB(NOW(), INTERVAL 30 DAY)),
(NULL, NULL, 25000, 'completed', DATE_SUB(NOW(), INTERVAL 25 DAY)),
(NULL, NULL, 75000, 'completed', DATE_SUB(NOW(), INTERVAL 20 DAY)),
(NULL, NULL, 30000, 'completed', DATE_SUB(NOW(), INTERVAL 15 DAY)),
(NULL, NULL, 40000, 'completed', DATE_SUB(NOW(), INTERVAL 10 DAY)),
(NULL, NULL, 60000, 'completed', DATE_SUB(NOW(), INTERVAL 5 DAY)),
(NULL, NULL, 35000, 'completed', DATE_SUB(NOW(), INTERVAL 3 DAY)),
(NULL, NULL, 45000, 'completed', DATE_SUB(NOW(), INTERVAL 1 DAY));
