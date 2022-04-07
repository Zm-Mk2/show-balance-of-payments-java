CREATE TABLE incomedatas (
  id SERIAL,
  date DATE NOT NULL,
  content VARCHAR(255),
  amount INTEGER NOT NULL,
  litem VARCHAR(255) NOT NULL,
  mitem VARCHAR(255),
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  PRIMARY KEY (id)
);