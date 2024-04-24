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

## Ignored words

// per work, per series

## Known words

// upload from Anki
