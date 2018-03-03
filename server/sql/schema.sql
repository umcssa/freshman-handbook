CREATE TABLE article (
  title   VARCHAR(64) PRIMARY KEY    NOT NULL,
  content VARCHAR(32768)             NOT NULL
);

CREATE TABLE image (
  image_id INTEGER PRIMARY KEY AUTOINCREMENT,
  title    VARCHAR(64) NOT NULL,
  FOREIGN KEY (title) REFERENCES article (title)
);
