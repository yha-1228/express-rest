DELETE FROM
  users;

ALTER TABLE
  users AUTO_INCREMENT = 1;

INSERT INTO
  users(username, email, password, deptId)
VALUES
  ('system', 'system@system.domain', 'password', 1);