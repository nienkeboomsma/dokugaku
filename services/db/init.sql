CREATE TABLE word (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  info jsonb NOT NULL
);

COPY word(id, info)
FROM '/processedJmdict.csv'
QUOTE E'\x01'
DELIMITER E'\t'
CSV HEADER;

CREATE TABLE user_account (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  display_name text NOT NULL
);

CREATE INDEX ON word (info);

-- TODO: the id should be supplied centrally via Docker Compose
INSERT INTO user_account(id, display_name) VALUES ('6e41e9fd-c813-40e9-91fd-c51e47efab42', 'Nienke');

CREATE TABLE series (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hapax_legomenon_count integer NULL,
  title text NOT NULL UNIQUE,
  total_word_count integer NULL,
  unique_word_count integer NULL
);

CREATE INDEX ON series (id);

CREATE TYPE worktype AS ENUM ('manga', 'novel');

CREATE TABLE work (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hapax_legomenon_count integer NULL,
  max_progress integer NOT NULL,
  series_id uuid NULL DEFAULT NULL REFERENCES series,
  title text NOT NULL,
  total_word_count integer NULL,
  type worktype NOT NULL,
  unique_word_count integer NULL,
  volume_number smallint NULL DEFAULT NULL,
  UNIQUE (series_id, volume_number)
);

CREATE INDEX ON work (series_id);
CREATE INDEX ON work (series_id, volume_number);

CREATE TYPE readstatus AS ENUM ('new', 'want_to_read', 'reading', 'read', 'abandoned');

CREATE TABLE user_series (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  series_id uuid NOT NULL REFERENCES series ON DELETE CASCADE,
  status readstatus NOT NULL DEFAULT 'new',
  user_id uuid NOT NULL REFERENCES user_account,
  UNIQUE (user_id, series_id)
 );

 CREATE INDEX ON user_series (series_id);
 CREATE INDEX ON user_series (user_id);

CREATE TABLE user_work (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  current_progress integer NULL DEFAULT 0,
  status readstatus NOT NULL DEFAULT 'new',
  user_id uuid NOT NULL REFERENCES user_account,
  work_id uuid NOT NULL REFERENCES work ON DELETE CASCADE,
  UNIQUE (user_id, work_id)
);

CREATE INDEX ON user_work (user_id);
CREATE INDEX ON user_work (user_id, status);
CREATE INDEX ON user_work (work_id);

CREATE TABLE author (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name text NOT NULL UNIQUE
);

CREATE TABLE author_work (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  author_id uuid NOT NULL REFERENCES author,
  work_id uuid NOT NULL REFERENCES work ON DELETE CASCADE,
  UNIQUE (author_id, work_id)
);

CREATE INDEX ON author_work (author_id);
CREATE INDEX ON author_work (work_id);

CREATE TABLE word_work (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
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

CREATE TABLE user_word (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  excluded boolean NOT NULL DEFAULT false,
  known boolean NOT NULL DEFAULT false,
  user_id uuid NOT NULL REFERENCES user_account,
  word_id integer NOT NULL REFERENCES word,
  UNIQUE (user_id, word_id)
);

CREATE INDEX ON user_word (user_id, excluded);
CREATE INDEX ON user_word (user_id, known);
CREATE INDEX ON user_word (user_id, word_id);

CREATE TABLE ignored_in_work (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  ignored boolean NOT NULL DEFAULT false,
  user_id uuid NOT NULL REFERENCES user_account,
  word_id integer NOT NULL REFERENCES word,
  work_id uuid NOT NULL REFERENCES work ON DELETE CASCADE,
  UNIQUE (user_id, word_id, work_id)
);

CREATE INDEX ON ignored_in_work (user_id, word_id, work_id);

CREATE TABLE ignored_in_series (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  ignored boolean NOT NULL DEFAULT false,
  series_id uuid NOT NULL REFERENCES series,
  user_id uuid NOT NULL REFERENCES user_account,
  word_id integer NOT NULL REFERENCES word,
  UNIQUE (series_id, user_id, word_id)
);

CREATE INDEX ON ignored_in_series (series_id, user_id, word_id);
