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

-- TODO: the id should be supplied centrally via Docker Compose
INSERT INTO user_account(id, display_name) VALUES ('6e41e9fd-c813-40e9-91fd-c51e47efab42', 'Nienke');

CREATE TABLE series (
  hapax_legomenon_count integer NULL,
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL UNIQUE,
  total_word_count integer NULL,
  unique_word_count integer NULL
);

CREATE TYPE worktype AS ENUM ('manga', 'novel');

CREATE TABLE work (
  hapax_legomenon_count integer NULL,
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  max_progress integer NOT NULL,
  series_id uuid NULL DEFAULT NULL REFERENCES series,
  title text NOT NULL,
  total_word_count integer NULL,
  type worktype NOT NULL,
  unique_word_count integer NULL,
  volume_number smallint NULL DEFAULT NULL,
  UNIQUE (series_id, volume_number)
);

CREATE TYPE readstatus AS ENUM ('none', 'want_to_read', 'reading', 'read', 'abandoned');

CREATE TABLE user_series (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id uuid NOT NULL REFERENCES user_account,
  series_id uuid NOT NULL REFERENCES series ON DELETE CASCADE,
  status readstatus NOT NULL DEFAULT 'none',
  UNIQUE (user_id, series_id)
 );

CREATE TABLE user_work (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id uuid NOT NULL REFERENCES user_account,
  work_id uuid NOT NULL REFERENCES work ON DELETE CASCADE,
  status readstatus NOT NULL DEFAULT 'none',
  current_progress integer NULL DEFAULT 0,
  UNIQUE (user_id, work_id)
);

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

CREATE TABLE word_work (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  word_id integer NOT NULL REFERENCES word,
  work_id uuid NOT NULL REFERENCES work ON DELETE CASCADE,
  volume_number smallint NULL DEFAULT NULL, 
  page_number smallint NOT NULL,
  sentence_number smallint NOT NULL,
  entry_number smallint NOT NULL,
  component_number smallint NULL DEFAULT NULL,
  UNIQUE (word_id, work_id, volume_number, page_number, sentence_number, entry_number, component_number)
);

CREATE TABLE user_word (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id uuid NOT NULL REFERENCES user_account,
  word_id integer NOT NULL REFERENCES word,
  excluded boolean NOT NULL DEFAULT false,
  known boolean NOT NULL DEFAULT false,
  UNIQUE (user_id, word_id)
);

CREATE TABLE ignored_in_work (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  word_id integer NOT NULL REFERENCES word,
  work_id uuid NOT NULL REFERENCES work ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES user_account,
  ignored boolean NOT NULL DEFAULT false,
  UNIQUE (word_id, work_id, user_id)
);

CREATE TABLE ignored_in_series (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  series_id uuid NOT NULL REFERENCES series,
  user_id uuid NOT NULL REFERENCES user_account,
  word_id integer NOT NULL REFERENCES word,
  ignored boolean NOT NULL DEFAULT false,
  UNIQUE (word_id, series_id, user_id)
);
