CREATE OR REPLACE FUNCTION update_modified_column() 
RETURNS TRIGGER AS $$
BEGIN
  NEW.modified = now();
  RETURN NEW; 
END;
$$ language 'plpgsql';

-- word

CREATE TABLE word (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  info jsonb NOT NULL,
  jlpt text NULL
);

COPY word(id, info, jlpt)
FROM '/processedJmdict.csv'
QUOTE E'\x01'
DELIMITER E'\t'
CSV HEADER;

CREATE INDEX ON word (info);

-- user account

CREATE TABLE user_account (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created timestamptz NOT NULL DEFAULT now(),
  modified timestamptz NOT NULL DEFAULT now(),
  display_name text NOT NULL
);

-- TODO: the id should be supplied centrally via Docker Compose
INSERT INTO user_account(id, display_name) VALUES ('6e41e9fd-c813-40e9-91fd-c51e47efab42', 'Nienke');

CREATE TRIGGER update_user_account_modified
BEFORE UPDATE ON user_account
FOR EACH ROW
EXECUTE PROCEDURE update_modified_column();

-- series

CREATE TABLE series (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created timestamptz NOT NULL DEFAULT now(),
  modified timestamptz NOT NULL DEFAULT now(),
  hapax_legomenon_count integer NULL,
  title text NOT NULL UNIQUE,
  total_word_count integer NULL,
  unique_word_count integer NULL
);

CREATE INDEX ON series (id);

CREATE TRIGGER update_series_modified
BEFORE UPDATE ON series
FOR EACH ROW
EXECUTE PROCEDURE update_modified_column();

-- work

CREATE TYPE worktype AS ENUM ('manga', 'novel');

CREATE TABLE work (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created timestamptz NOT NULL DEFAULT now(),
  modified timestamptz NOT NULL DEFAULT now(),
  hapax_legomenon_count integer NULL,
  max_progress integer NOT NULL,
  series_id uuid NULL DEFAULT NULL REFERENCES series ON DELETE CASCADE,
  title text NOT NULL,
  total_word_count integer NULL,
  type worktype NOT NULL,
  unique_word_count integer NULL,
  volume_number smallint NULL DEFAULT NULL,
  UNIQUE (series_id, volume_number)
);

CREATE INDEX ON work (series_id);
CREATE INDEX ON work (series_id, volume_number);

CREATE TRIGGER update_work_modified
BEFORE UPDATE ON work
FOR EACH ROW
EXECUTE PROCEDURE update_modified_column();

-- user_series

CREATE TYPE readstatus AS ENUM ('new', 'want_to_read', 'reading', 'read', 'abandoned');

CREATE TABLE user_series (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  created timestamptz NOT NULL DEFAULT now(),
  modified timestamptz NOT NULL DEFAULT now(),
  series_id uuid NOT NULL REFERENCES series ON DELETE CASCADE,
  status readstatus NOT NULL DEFAULT 'new',
  user_id uuid NOT NULL REFERENCES user_account ON DELETE CASCADE,
  UNIQUE (user_id, series_id)
);

CREATE INDEX ON user_series (series_id);
CREATE INDEX ON user_series (user_id);

CREATE TRIGGER update_user_series_modified
BEFORE UPDATE ON user_series
FOR EACH ROW
EXECUTE PROCEDURE update_modified_column();

-- user_work

CREATE TABLE user_work (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  created timestamptz NOT NULL DEFAULT now(),
  modified timestamptz NOT NULL DEFAULT now(),
  current_progress integer NULL DEFAULT 0,
  status readstatus NOT NULL DEFAULT 'new',
  user_id uuid NOT NULL REFERENCES user_account ON DELETE CASCADE,
  work_id uuid NOT NULL REFERENCES work ON DELETE CASCADE,
  UNIQUE (user_id, work_id)
);

CREATE INDEX ON user_work (user_id);
CREATE INDEX ON user_work (user_id, status);
CREATE INDEX ON user_work (work_id);

CREATE TRIGGER update_user_work_modified
BEFORE UPDATE ON user_work
FOR EACH ROW
EXECUTE PROCEDURE update_modified_column();

-- author

CREATE TABLE author (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created timestamptz NOT NULL DEFAULT now(),
  modified timestamptz NOT NULL DEFAULT now(),
  author_name text NOT NULL UNIQUE
);

CREATE TRIGGER update_author_modified
BEFORE UPDATE ON author
FOR EACH ROW
EXECUTE PROCEDURE update_modified_column();

CREATE OR REPLACE FUNCTION delete_orphaned_authors() 
RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM author
  WHERE id = OLD.author_id
  AND NOT EXISTS (SELECT 1 FROM author_work WHERE author_id = OLD.author_id);
  RETURN OLD;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER delete_orphaned_authors_trigger
AFTER DELETE ON author_work
FOR EACH ROW
EXECUTE FUNCTION delete_orphaned_authors();

-- author_work

CREATE TABLE author_work (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  created timestamptz NOT NULL DEFAULT now(),
  modified timestamptz NOT NULL DEFAULT now(),
  author_id uuid NOT NULL REFERENCES author,
  work_id uuid NOT NULL REFERENCES work ON DELETE CASCADE,
  UNIQUE (author_id, work_id)
);

CREATE INDEX ON author_work (author_id);
CREATE INDEX ON author_work (work_id);

CREATE TRIGGER update_author_work_modified
BEFORE UPDATE ON author_work
FOR EACH ROW
EXECUTE PROCEDURE update_modified_column();

-- word_work

CREATE TABLE word_work (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  created timestamptz NOT NULL DEFAULT now(),
  modified timestamptz NOT NULL DEFAULT now(),
  component_number smallint NULL DEFAULT NULL,
  entry_number smallint NOT NULL,
  page_number smallint NOT NULL,
  sentence_number smallint NOT NULL,
  volume_number smallint NULL DEFAULT NULL, 
  word_id integer NOT NULL REFERENCES word,
  work_id uuid NOT NULL REFERENCES work ON DELETE CASCADE,
  UNIQUE (component_number, entry_number, page_number, sentence_number, volume_number, word_id, work_id)
);

CREATE INDEX ON word_work (word_id);
CREATE INDEX ON word_work (work_id);

CREATE TRIGGER update_word_work_modified
BEFORE UPDATE ON word_work
FOR EACH ROW
EXECUTE PROCEDURE update_modified_column();

-- user_word

CREATE TABLE user_word (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  created timestamptz NOT NULL DEFAULT now(),
  modified timestamptz NOT NULL DEFAULT now(),
  excluded boolean NOT NULL DEFAULT false,
  known boolean NOT NULL DEFAULT false,
  user_id uuid NOT NULL REFERENCES user_account ON DELETE CASCADE,
  word_id integer NOT NULL REFERENCES word,
  UNIQUE (user_id, word_id)
);

CREATE INDEX ON user_word (user_id, excluded);
CREATE INDEX ON user_word (user_id, known);
CREATE INDEX ON user_word (user_id, word_id);

CREATE TRIGGER update_user_word_modified
BEFORE UPDATE ON user_word
FOR EACH ROW
EXECUTE PROCEDURE update_modified_column();

-- ignored_in_work

CREATE TABLE ignored_in_work (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  created timestamptz NOT NULL DEFAULT now(),
  modified timestamptz NOT NULL DEFAULT now(),
  ignored boolean NOT NULL DEFAULT false,
  user_id uuid NOT NULL REFERENCES user_account, ON DELETE CASCADE,
  word_id integer NOT NULL REFERENCES word,
  work_id uuid NOT NULL REFERENCES work ON DELETE CASCADE,
  UNIQUE (user_id, word_id, work_id)
);

CREATE INDEX ON ignored_in_work (user_id, word_id, work_id);

CREATE TRIGGER update_ignored_in_work_modified
BEFORE UPDATE ON ignored_in_work
FOR EACH ROW
EXECUTE PROCEDURE update_modified_column();

-- ignored_in_series

CREATE TABLE ignored_in_series (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  created timestamptz NOT NULL DEFAULT now(),
  modified timestamptz NOT NULL DEFAULT now(),
  ignored boolean NOT NULL DEFAULT false,
  series_id uuid NOT NULL REFERENCES series ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES user_account ON DELETE CASCADE,
  word_id integer NOT NULL REFERENCES word,
  UNIQUE (series_id, user_id, word_id)
);

CREATE INDEX ON ignored_in_series (series_id, user_id, word_id);

CREATE TRIGGER update_ignored_in_series_modified
BEFORE UPDATE ON ignored_in_series
FOR EACH ROW
EXECUTE PROCEDURE update_modified_column();
