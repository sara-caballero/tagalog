# Tagalog, little by little

A small website I use to learn Tagalog

## What it does

- **Today**: the next lesson step, today's review and a "30 minutes" button that chains review, lesson, grammar and conversation.
- **Lessons**: each class split into short steps with audio, memory hooks, a quick check and the grammar note.
- **Wordbook**: every word by category. Add your own words one by one or paste your class notes.
- **Practice**: flashcards with Leitner boxes (known words come back after 1, 3, 7, 14, 30... days), plus choose, listen, write, build and pairs modes.
- **Notebook**: grammar and culture notes per lesson, with your own notes and explanations.
- **Speak**: role-plays and a self-introduction builder.
- **Progress**: study calendar, weekly goal, level test and settings.

Progress is saved in the browser (localStorage). Use *Progress › Download a backup* to move it to another device.

## Run it locally

It's plain HTML, CSS and JavaScript, no build step.

```
python -m http.server 8000
```

Then open http://localhost:8000.

## Project structure

```
index.html
css/style.css
js/data.js        lessons, words, grammar drills and role-plays
js/audio.js       list of phrases that have a recording (generated)
js/core.js        state, review schedule, categories, routing
js/speech.js      audio playback and text-to-speech fallback
js/views.js       pages
js/habit.js       study time tracking and calendar
js/session.js     exercise screens
js/practice.js    lesson steps, flashcards, practice
js/plan.js        the 30 minutes plan
js/test.js        level test
js/speak.js       role-plays, self-introduction, conversation
js/main.js        events and start-up
mp3/              recorded phrases
tools/            audio scripts
```

## Adding culture notes

Culture notes live in the Notebook's Culture section. Add an entry to `CULTURE` in `js/data.js`:

```js
{ k: "culture", t: "Fiesta", topic: "Celebrations", h: "<p>Every town has its own fiesta…</p>" }
```

Notes inside a lesson can also be moved there with `place: "culture"`.

## Adding a lesson

1. Add the words with `I(...)` and a lesson entry in `LESSONS` in `js/data.js`.
2. Run `node tools/build_phrases.js` to update `tools/phrases.json`.
3. Run `tools/record_audio.bat` (Windows) or `python tools/make_audio.py` to record the new phrases.
4. Run `node tools/build_phrases.js` again so `js/audio.js` lists the new recordings.

Audio uses the `fil-PH-BlessicaNeural` voice through [edge-tts](https://github.com/rany2/edge-tts).

Dish photos in `img/food/` come from Wikimedia Commons under free licences; the author and licence are shown on each photo (see `PHOTOS` in `js/food.js`). `python tools/get_photos.py` fetches new candidates.
