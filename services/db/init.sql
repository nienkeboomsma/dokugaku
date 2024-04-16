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
  username text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  email text NOT NULL UNIQUE,
  name text NULL
);


CREATE TABLE series (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL UNIQUE
);

CREATE TYPE worktype AS ENUM ('manga', 'novel');

CREATE TABLE work (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type worktype NOT NULL,
  title text NOT NULL,
  series_id uuid NULL DEFAULT NULL REFERENCES series,
  volume_number smallint NULL DEFAULT NULL,
  max_progress integer NOT NULL,
  UNIQUE (series_id, volume_number)
);

CREATE TABLE author (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name text NOT NULL UNIQUE
);

CREATE TABLE author_work (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  author_id uuid NOT NULL REFERENCES author,
  work_id uuid NOT NULL REFERENCES work,
  UNIQUE (author_id, work_id)
);

CREATE TABLE user_word (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id integer NOT NULL REFERENCES user_account,
  word_id integer NOT NULL REFERENCES word,
  excluded boolean NOT NULL DEFAULT false,
  known boolean NOT NULL DEFAULT false,
  UNIQUE (user_id, word_id)
);

CREATE TYPE readstatus AS ENUM ('want to read', 'reading', 'read', 'abandoned');

CREATE TABLE user_series (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id integer NOT NULL REFERENCES user_account,
  series_id uuid NOT NULL REFERENCES series,
  status readstatus NOT NULL DEFAULT 'want to read',
  UNIQUE (user_id, series_id)
 );

CREATE TABLE user_work (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id integer NOT NULL REFERENCES user_account,
  work_id uuid NOT NULL REFERENCES work,
  status readstatus NOT NULL DEFAULT 'want to read',
  current_progress integer NULL DEFAULT 0,
  UNIQUE (user_id, work_id)
);

CREATE TABLE word_work (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  word_id integer NOT NULL REFERENCES word,
  work_id uuid NOT NULL REFERENCES work,
  page_number smallint NULL,
  sentence_number integer NOT NULL,
  entry_number smallint NOT NULL,
  component_number smallint NULL,
  UNIQUE (word_id, work_id, page_number, sentence_number, entry_number, component_number)
);

CREATE TABLE ignored_in_work (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  word_id integer NOT NULL REFERENCES word,
  work_id uuid NOT NULL REFERENCES work,
  user_id integer NOT NULL REFERENCES user_account,
  ignored boolean NOT NULL DEFAULT false,
  UNIQUE (word_id, work_id, user_id)
);

CREATE TABLE ignored_in_series (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  word_id integer NOT NULL REFERENCES word,
  series_id uuid NOT NULL REFERENCES series,
  user_id integer NOT NULL REFERENCES user_account,
  ignored boolean NOT NULL DEFAULT false,
  UNIQUE (word_id, series_id, user_id)
);
