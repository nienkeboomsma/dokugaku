# What is it?

Dokugaku (読学) is a tool to help Japanese learners read manga and novels.

You upload the manga and novels you want to read and it will show you (1) what percentage of the words in that work you already know and (2) what words are most common in that particular work, in the series it belongs to or across all uploaded works. This way you can make an informed decision about what works to read first and what words would be most useful to learn. It also includes a manga reader and novel reader with support for third-party tools such as Yomitan.

**Upload your manga and novels**

- Auto-fill the volume number, title and author so it is easier to upload the next volume in a series.
- Skip the Mokuro (OCR) step if your host computer can get it done faster.
<p align="center"><img alt="upload" src="https://github.com/user-attachments/assets/c29adc1b-eb90-4b4d-84ef-6f32844cbef1" width="80%"/></p><br/>

**Browse your manga and novels**

- Choose your next work based on the percentage of vocab you already know.
- Filter the results by title, author and read status.
<p align="center"><img alt="browse" src="https://github.com/user-attachments/assets/fb7b5845-98fd-446b-a56c-ae6515774b06" width="80%"/></p><br/>

**Manage your progress**

- Keep track of your progress in the works you are currently reading.
- Choose the next words to learn based on their frequency across all your unread works.
<p align="center"><img alt="dashboard" src="https://github.com/user-attachments/assets/62023e2c-ff9f-4e8f-9380-39187464ef01" width="80%"/></p><br/>

**Get frequency lists**

- View the most frequent unknown vocab in a particular work or in an entire series.
- Mark words as known, ignored (within that specific work/series) or excluded (everywhere).
- Search for a specific word or filter vocab by minimum frequency, ignored status or JLPT level.
- Automatically save your filters per work or series.
<p align="center"><img alt="frequency list" src="https://github.com/user-attachments/assets/1002ad24-8197-4d37-b053-4bef28c96a7d" width="80%"/></p><br/>

**Get glossaries**

- View the unknown vocab for the pages you are reading next in order of their occurrence.
- Check the frequency score for each word to decide if it's worth making a flashcard for.
<p align="center"><img alt="glossary" src="https://github.com/user-attachments/assets/674aa7ed-d1bf-495f-abf6-a0caf289bdcb" width="80%"/></p><br/>

**Read your manga with dictionary lookups**

- Use tools such as Yomitan to look up vocab in the OCR'd text bubbles.
- Lock overlapping text boxes for easier lookups.
- Show one page or two pages at a time.
- Show the manga in fullscreen mode.
- Navigate between pages and view modes with keyboard shortcuts.
- Automatically save your progress on every page change.
<p align="center"><img alt="manga reader" src="https://github.com/user-attachments/assets/f26f565a-3dd8-4ad6-bddf-3e812b770593" width="80%"/></p>
<p align="center"><img alt="manga lookup with yomitan" src="https://github.com/user-attachments/assets/5cc09c11-16cc-45ff-a958-3ff4c3c64fe1" width="80%"/></p><br/>

**Read your novels with dictionary lookups**

- Read your novels vertically or horizontally.
- Automatically save your reading direction preference per work.
- Customise the font size and line height.
- Save your progress by clicking the bookmark buttons.
- Select text to get a character count.
- Hover on a bookmark to see the paragraph number
<p align="center"><img alt="vertical novel with yomitan lookup" src="https://github.com/user-attachments/assets/6bc4aeb0-e239-489f-bff7-89f70cbb6821" width="80%"/></p>
<p align="center"><img alt="horizontal novel" src="https://github.com/user-attachments/assets/80eda724-9182-4f18-a6da-a0bd81764b31" width="80%"/></p><br/>

**Upload your known vocab**

- Mark thousands of words as known in one go.
<p align="center"><img alt="upload known words" src="https://github.com/user-attachments/assets/ece4c383-2a98-4127-8123-8add5cb9fe7e" width="80%"/></p>

# Scope of this project

This project is expressly intended to be used locally by a single user (it is called *Doku*gaku after all). While the backend has been designed with multiple users in mind, I would strongly advise against it due to the risk of copyright infringement.

# How to install

1. Make sure you have [Docker](https://docs.docker.com/engine/install/) installed.

2. Click on the green 'Code' button in the top right and download the ZIP file.

3. Use your text editor of choice to create a file named `.env` inside of the `dokugaku` folder you just unzipped. It should contain the following variables:

```
DB_PG_PASSWORD=***
ICHIRAN_PG_PASSWORD=***

ALLOW_OTHER_DEVICES=***
HOST_IP=***

WEB_PORT=3000
GRAPHQL_PORT=3001
ICHIRAN_PORT=3002
MOKURO_PORT=3003
WORK_PROCESSOR_PORT=3004
```

For `DB_PG_PASSWORD` and `ICHIRAN_PG_PASSWORD` supply a password of your own choosing.

If you want to use Dokugaku on this device only, set `ALLOW_OTHER_DEVICES=0` and `HOST_IP=localhost`; if you want to use Dokugaku on multiple devices _within your local network_, set `ALLOW_OTHER_DEVICES=1` and set `HOST_IP` to [the _local_ IP address](https://www.whatismybrowser.com/detect/what-is-my-local-ip-address/) of the device that is running Dokugaku. You'll want to make sure this is a [static IP](https://www.pcmag.com/how-to/how-to-set-up-a-static-ip-address).

Upon naming the file `.env` and saving it, it might disappear in your file manager if you are using macOS or Linux. This is standard behaviour for files starting with a dot. On macOS you can show them like [this](https://www.graphpad.com/support/faq/how-to-view-files-on-your-mac-that-are-normally-invisible/).

4. In your terminal of choice, type `cd ` (including the space), drag and drop the Dokugaku folder into the terminal window and hit enter. Then type `docker compose up` and hit enter.

5. Go to `http://localhost:3000` in your browser. If `ALLOW_OTHER_DEVICES` was set to 1, you can access Dokugaku by going to the IP you entered for `HOST_IP` with `:3000` added at the end (e.g. 192.168.0.0:3000).

# Uploading files

## Manga

### File formats

The manga page files can be `.jpg`, `.jpeg`, `.png` or `.webp`.

### Page numbers

When manga files are uploaded each vocab item is assigned to the page on which it was found. It is assumed that the (alphabetically) first image is page 1, the second image is page 2, etc. Unfortunately this assumption is not always correct, so it is worthwhile to check this before you upload the images. It will sometimes be necessary to remove some of the first few pages to make the page numbers line up properly.

### Cover

The alphabetically first image will be used as the cover image.

### Pre-mokuro'd manga

It probably makes more sense to run Mokuro (the OCR processor) on your host machine instead of leaving it to the Mokuro container, [especially if you are using Apple Silicon](https://github.com/sonoisa/arm64-docker-pytorch-tensorflow/issues/1#issuecomment-1382653203). In that case, check the relevant checkbox and upload the `.json` files along with the images.

## Novels

### File formats

The image files can be `.jpg`, `.jpeg`, `.png` or `.webp`. The text files can be `.html`, `.md` or `.txt`.

### Multiple files

It is possible to upload a novel across multiple files (for example, when using Calibre's edit function to extract a novel's `.html` files). These separate files will automatically be stitched together. It is important that they are named in alphabetically ascending order, otherwise they will be stitched together in the wrong order.

### Text formatting

Uploaded text will be converted into basic semantic HTML. For the best result it is often necessary to make some manual adjustments to the text before uploading, especially when dealing with `.html` files that were extracted via Calibre (which have unpredictable markup).

#### Headings

A top-level heading (`h1` or `#`) will automatically be inserted based on the title provided in the upload form. This means that headings should start at level two (`h2` or `##`).

#### Paragraphs

In `.html` files paragraphs are distinguished by their `p` tags. In `.md` files paragraphs must be separated by a blank line. In `.txt` files a single newline is sufficient, but a blank line works as well.

#### Blank lines

Sometimes it is desirable to have extra blank lines between paragraphs. This can be accomplished in `.md` files by inserting a [thematic break](https://github.github.com/gfm/#thematic-breaks) and in `.html` files by inserting an `hr` tag.

#### Emphasis dots

[Emphasis dots](https://www.japanesewithanime.com/2018/03/furigana-dots-bouten.html) can be added in `.md` files by wrapping the relevant text in [single asterisks or underscores](https://github.github.com/gfm/#emphasis-and-strong-emphasis) and in `.html` files by wrapping it in `em` tags.

#### Indentation

Blockquotes (or indentation in a more general sense) can be added in `.md` files by prefacing the relevant lines with [>](https://github.github.com/gfm/#block-quotes) and in `.html` files by wrapping the paragraph in `blockquote` tags.

#### Images

Images can be uploaded alongside the text file(s) and included in the text file(s) with the usual markdown or HTML syntax. Instead of supplying a relative or absolute path, supply only the filename. By default images are displayed as a block, but they can be displayed inline by adding an `"inline"` title attribute:

In `.md` files:

```
![](filename.jpg)

![](filename.jpg "inline")
```

In `.html` files:

```
<img src="filename.jpg" />

<img src="filename.jpg" title="inline" />
```

#### Checklist for `.html` files extracted from Calibre

- [ ] There is no title at the start of the work
- [ ] Headings start at `h2`
- [ ] Blank lines (usually `<p><br /></p>`) are replaced with `hr`
- [ ] Text with emphasis dots (look for `text-emphasis` in the `.css` files to find the class name) is wrapped in `em` tags
- [ ] Indented paragraphs (look for `div` with classes like `start-3em`) are wrapped in `blockquote` tags
- [ ] SVG images (`<svg><image /></svg>`) are replaced with `img` tags
- [ ] Images that contain only text are replaced with the appropriate text string (where possible)
- [ ] Images that are supposed to be displayed inline contain `title="inline"`
- [ ] Pointless elements such as empty `a` tags are removed

### 'Page numbers'

In the case of novels the `pageNumber` variable actually refers to the _paragraph_ number. It is used across Dokugaku for the same purposes as the page numbers in manga (i.e. tracking reading progress and ordering glossary words) so it did not seem worth it to muddy up the types by adding a different property name to the mix.

## Processing time estimate

There is currently no way to track the processing of an uploaded work other than keeping an eye on the `work-processor` logs, where you will find an up-to-date estimate for the segmentation stage. Unfortunately, there is currently no way to track progress within the (often lengthy!) OCR stage beyond a simple pass/fail message.

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

# Reading manga

## Overlapping text boxes

Sometimes Mokuro (the OCR engine) determines text box boundaries incorrectly, causing text boxes to overlap and making it impossible to scan the affected characters with Yomitan or other dictionary tools. To prevent this, it is possible to 'lock' a text box so that it will always remain visible and on top of the other text boxes. Simply hold `Shift` and click on a text box to lock it and `Shift`-click it again to unlock it.

## Keyboard shortcuts

| Key | Description              |
| --- | ------------------------ |
| `←` | Go to next page          |
| `[` | Go to last page          |
| `→` | Go to previous page      |
| `]` | Go to first page         |
| `0` | Reset zoom level         |
| `1` | Enable single plage mode |
| `2` | Enable double page mode  |
| `F` | Enable fullscreen mode   |

# Roadmap

## New features

- [ ] dashboard to track the processing status of uploaded works

## Improvements

- [ ] improve vocab pagination (specifically when there are no more records to load)
- [ ] improve the management of common environment variables between backend and frontend
- [ ] optimise the performance of Docker images
- [ ] improve validation and error handling
- [ ] lift component state up; improve stories
