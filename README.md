# What is it?

Dokugaku is a tool to help Japanese learners read manga and novels.

You upload the manga and novels you want to read and it will show you (1) what percentage of the words in that work you already know and (2) what words are most common in that particular work, in the series it belongs to or across all uploaded works. This way you can make an informed decision about what works to read first and what words would be most useful to learn.

# Scope of this project

This project is expressly intended to be used locally by a single user (it is called *Doku*gaku after all). While the backend has been designed with multiple users in mind, I would strongly advise against it due to the risk of copyright infringement.

# How to install

1. Make sure you have [Docker](https://docs.docker.com/engine/install/) installed.

2. Click on the green 'Code' button in the top right and download the ZIP file.

3. Use your text editor of choice to create a file named `.env` inside of the `dokugaku` folder you just unzipped. It should contain the following information (except you replace `password` with your own unique passwords of course!):

```
DB_PG_PASSWORD=password
ICHIRAN_PG_PASSWORD=password

WEB_PORT=3000
GRAPHQL_PORT=3001
ICHIRAN_PORT=3002
MOKURO_PORT=3003
WORK_PROCESSOR_PORT=3004
```

4. Use your terminal of choice to navigate to the `dokugaku` folder and run `docker compose up`.

5. Go to `http://localhost:3000` in your browser.

# Uploading files

## Manga

### File formats

The manga page files can be `.jpg`, `.jpeg`, `.png` and `.webp`.

### Page numbers

When manga files are uploaded each vocab item is assigned to the page on which it was found. It is assumed that the (alphabetically) first image is page 1, the second image is page 2, etc. Unfortunately this assumption is not always correct, so it is worthwhile to check this before you upload the images. It will sometimes be necessary to remove some of the first few pages to make the page numbers line up properly.

### Cover

The alphabetically first image will be used as the cover image.

### Pre-mokuro'd manga

It probably makes more sense to run Mokuro on your host machine instead of leaving it to the Mokuro container, [especially if you are using Apple Silicon](https://github.com/sonoisa/arm64-docker-pytorch-tensorflow/issues/1#issuecomment-1382653203). In that case, check the relevant checkbox and upload the `.json` files along with the images.

## Novels

### File formats

The cover image can be `.jpg`, `.jpeg`, `.png` or `.webp`. The text files can be `.html`, `.md` and `.txt`.

### Multiple files

It is possible to upload a novel across multiple files (for example, when using Calibre's edit function to extract a novel's `.html` files). These separate files will automatically be stitched together. It is important that they are named in alphabetically ascending order, otherwise they will be stitched together in the wrong order.

### Text formatting

Uploaded texts will be converted to a barebones `.html` file containing only headers, paragraphs and ruby. There are some things to keep in mind:

#### Title

An `h1` header will automatically be inserted based on the title provided in the upload form. It is therefore not necessary to include one in the uploaded text files.

#### Paragraphs

In `.html` files paragraphs can be clearly distinguished by their `p` tags. In `.md` files paragraphs must be separated by a blank line. In `.txt` files a single newline is sufficient, but a blank line works as well.

#### Blank lines

Empty lines (besides those that demarcate paragraphs) are filtered out. This can be problematic if those blank lines demarcate different scenes within the same chapter. It is advisable to go through the text files before uploading them to check whether the work contains such empty lines and replace them with `hr` tags.

#### Emphasis dots

Some works contain [emphasis dots](https://www.japanesewithanime.com/2018/03/furigana-dots-bouten.html). If they are rendered through `em` tags they will be retained, but if they are rendered by other means (such as `span` tags with a particular class) you will need to add `em` tags yourself.

#### Images

Any images inside of `.md` or `.html` files will be stripped during processing. This can be problematic if images are used for chapter titles (as they often are in Kindle books). In that case, be sure to manually replace the images with an appropriate text string before uploading the files.

### 'Page numbers'

In the case of novels the `pageNumber` variable actually refers to the _paragraph_ number. It is used across Dokugaku for the same purposes as the page numbers in manga (i.e. tracking reading progress and ordering glossary words) so it did not seem worth it to muddy up the types by adding a different property name to the mix.

## Processing time estimate

There is currently no way to track the processing of an uploaded work other than keeping an eye on the `work-processor` logs. When uploading a work, a toast will provide some estimate of the required processing time. This estimate is based on a few constants in `/services/work-processor/src/utils/constants.ts`. It is recommended to keep an eye on the `work-processor` logs for the first few uploads in order to provide these constants with more accurate values for your own hardware.

# Managing vocab

Words can be marked as excluded, ignored and known. In all three cases they will be filtered out of frequency lists, glossaries and recommended vocab, but they are intended for different use cases.

## Excluded

Excluding words is intended to be used for words that have no business being in a frequency list or glossary. This includes particles (e.g. が, わよ), grammatical constructs (e.g. そう, たい) and exclamations (e.g. え, あー). Marking a word as excluded means it will be filtered out of _all_ frequency lists and glossaries and will not count toward the frequency score in the list of recommended vocab.

## Ignored

Ignoring words is intended to be used for words that have been spuriously parsed. In most cases this will be names (e.g. 臼井 儀人 being interpreted as four individual single-kanji words), but it can also happen when a word is written is an unusual script (e.g. カゼ being parsed as 'casein' instead of the intended 風邪 'cold'). Marking a word as ignored is work or series specific; it will only be filtered out of the frequency lists and glossaries of the same work (and of other works within the same series) and instances in unrelated works will still count towards the frequency score in the list of recommended vocab.

## Known

Self-explanatory. These words are filtered out from _all_ frequency lists, glossaries and recommended vocab because they are (fortunately!) no longer worth learning. Marking these words manually would be cumbersome, which is why there is an option to upload a list of known words and have them automatically marked as known.

## Uploading known words

On the 'known words' page there is an option to mark words as known in bulk by uploading them as a (white)space-separated or comma-separated list.

### Exporting from Anki

1. In the Browse window you can use filters to select only those words you feel you truly know. For example, the filter `prop:ivl>=30 prop:r>0.9 -is:suspended` will select non-suspended cards with an interval of 30 days or more and a retention rate of 90% or more.
2. Go to `Notes > Export Notes...` and `Notes in Plain Text (.txt)` as the export format. There is no need to check any of the boxes.
3. Open the resulting `.txt` in a spreadsheet app of your choice.
4. remove all columns except for the one that represents the Japanese headword with kanji and without furigana syntax
5. Export the remaining column as a `.csv` file.
6. If you open this file in a text editor, you will be able to copy/paste the contents into the upload form.

# Roadmap

## New features

- [ ] series glossaries (filterable by volume)
- [ ] word search across the entire corpus, linking to the appropriate page or paragraph
- [ ] dashboard to track the processing status of uploaded works
- [ ] removing works and series

## Improvements

- [ ] replace RSC GraphQL queries with hooks, implement loading skeletons and finetune caching
- [ ] improve vocab pagination (specifically when there are no more records to load)
- [ ] improve the management of common environment variables between backend and frontend
- [ ] optimise the performance of Docker images
- [ ] improve validation and error handling
- [ ] lift component state up; improve stories
