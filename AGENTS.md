# AGENTS.md

## Project Purpose
Morning Plan PWA is a local-first iPhone-friendly study planner for Chloe to review today's three priorities, deadlines, schedules, and exam countdowns with an iOS-friendly 08:00 reminder.

## Directory Rules
- `index.html` is the app shell.
- `styles.css` contains all visual styling.
- `app.js` contains local state, plan slicing, reminder export, and UI behavior.
- `manifest.webmanifest` defines PWA metadata.
- `sw.js` is the service worker for offline caching.
- `assets/` contains icon assets only.

## Product Rules
- Keep the app local-first. Use `localStorage`; do not add a backend unless this file is updated first.
- Do not store passwords, tokens, email credentials, calendar credentials, or private account data.
- Do not add network calls for email, calendar, AI HOT, or Codex automation without explicit approval.
- iOS reminders must be honest about platform limits: a webpage cannot silently create Reminders.app tasks. Use a downloadable calendar reminder or user-created Shortcut instead.
- Keep the June 2026 study schedule in structured JavaScript data until a public sync source is explicitly approved and implemented.
- Completion state stays on the current device.

## Design Rules
- Match a restrained Google Chrome / Material productivity style: pale blue-gray background, white surfaces, compact typography, and semantic color.
- Use dark charcoal for titles, neutral gray for explanations and units, Google blue for normal active/time information, teal for completion, amber for approaching risk, and red for urgent risk.
- Exam countdown colors express urgency only: more than 7 days blue, 4-7 days amber, and 3 days or fewer red.
- The Today screen shows exactly three required tasks, the next scheduled block, and the next three unfinished exams.
- Do not add landing-page hero sections, marketing copy, decorative blobs, or oversized cards.
- Buttons must be clear command controls with stable dimensions.
- Text must fit on iPhone-width screens without overlap.

## Verification
- Serve locally with `python -m http.server 8787` from this directory.
- Check `http://127.0.0.1:8787/` on desktop and mobile-width viewport.
- Verify:
  - app loads without console errors
  - plan can be added
  - Today tab shows exactly three priority tasks
  - completion toggle persists after reload
  - countdown colors are correct at 8, 7, and 3 days
  - exam time, location, and seat are visible in Schedule
  - calendar reminder download creates an `.ics` file
  - service worker and manifest are reachable
