CREATE TABLE Banner (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  description VARCHAR(255),
  timer INT,
  link VARCHAR(255),
  offer VARCHAR(255),
  visibility BOOLEAN,
  startTime INT
);


-- Dummy entry:

-- INSERT INTO Banner (title, description, timer, link, offer, visibility, startTime)
-- VALUES ('Independence Day Sale!', 'Get upto 30% off on all courses. Offer valid till August 15, Hurry!.', 3600, 'http://example.com', 'Use code INDIA', TRUE, UNIX_TIMESTAMP());
