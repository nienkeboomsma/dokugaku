(in-package #:ichiran/conn)

(defparameter *connection* '("jmdict" "postgres" "password" "ichiran-db"))

(in-package #:ichiran/dict)

(defparameter *jmdict-path* #p"/home/you/dump/JMdict_e")

(defparameter *jmdict-data* #p"/root/jmdictdb/jmdictdb/data/")

(in-package #:ichiran/kanji)

(defparameter *kanjidic-path* #P"/home/you/dump/kanjidic2.xml")
