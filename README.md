# Scope of this project

This project has been expressly designed to be used locally by a single user (it is called *Doku*gaku after all). While it would technically be possible to implement multi-user support, I would strongly advise against it due to the risk of copyright infringement.

# How to install

Create a `.env` file in the `dokugaku` root directory in line with the following example:

```
DB_PG_PASSWORD=password
ICHIRAN_PG_PASSWORD=password

WEB_PORT=3000
GRAPHQL_PORT=3001
ICHIRAN_PORT=3002
MOKURO_PORT=3003
WORK_PROCESSOR_PORT=3004
```

Then use `docker compose up` to spin up the containers.

# Uploading files

## Manga

### Cover

When uploading manga, please note that the first image will be used as the cover image.

### Page numbers

When manga files are uploaded each vocab item is assigned to the page on which it was found. It is assumed that the (alphabetically) first image is page 1, the second image is page 2, etc. Unfortunately this assumption is not always correct, so it is worthwhile to check this before you upload the images. It will sometimes be necessary to remove some of the first few pages to make the page numbers line up properly.

### Pre-mokuro'd manga

It might make more sense to run Mokuro on your host machine instead of leaving it to the mokuro container (on my own machine it's about 8 times as fast). In that case, check the relevant checkbox and upload the `.json` files along with the images.

## Novels

### Multiple files

It is possible to upload a novel across multiple files (for example, when using Calibre's edit function to extract a novel's `.html` files). Do make sure the files are named in alphabetically ascending order, otherwise the novel will be scrambled.

### 'Page numbers'

In the case of novels the 'page number' actually refers to the number of the chunk in which that particular vocab item happened to pass through the parsing engine. It is a rather arbitrary value, but it is crucial to have _some_ value in order to enable sorting vocab by first appearance.

### Texts with images

Please note that images inside of `.md` or `.html` files will be stripped during processing. This can be problematic if images are used for chapter titles (as they often are in Kindle books). In that case, be sure to manually replace the images with an appropriate text string before uploading the files.

# Managing vocab

Words can be marked as excluded, ignored and known. In all three cases they will be filtered out of frequency lists, glossaries and recommended vocab, but they are intended for different use cases.

## Excluded

Excluding words is intended to be used for words that have no business being in a frequency list or glossary. This includes particles (e.g. が, わよ), grammatical constructs (e.g. そう, たい) and exclamations (e.g. え, あー). Marking a word as excluded means it will be filtered out of _all_ frequency lists and glossaries and will not count toward the frequency score in the list of recommended vocab.

## Ignored

Ignoring words is intended to be used for words that have been spuriously parsed. In most cases this will be names (e.g. 臼井 儀人 being interpreted as four individual single-kanji words), but it can also happen when a word is written is an unusual script (e.g. カゼ being parsed as 'casein' instead of the intended 風邪 'cold'). Marking a word as ignored is work or series specific; it will only be filtered out of the frequency lists and glossaries of the same work (and of other works within the same series) and instances in unrelated works will still count towards the frequency score in the list of recommended vocab.

## Known

Self-explanatory. These words are filtered out from _all_ frequency lists, glossaries and recommended vocab because they are (fortunately!) no longer worth learning. Marking these words manually would be cumbersome, which is why there is an option to upload a list of known words and have them automatically marked as known.

// TODO: upload from Anki
