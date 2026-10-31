# Shot Lab

Shot-by-shot strokes gained for competitive golf. Runs as an iPhone Home Screen app from your own GitHub Pages site, works with no signal on the course, and needs no App Store, server or build step.

## Put it online (about 5 minutes, on your Mac)

1. **Create the repository.** On github.com, click **+ → New repository**. Name it `shot-lab`, choose **Public**, leave everything else off, and click **Create repository**.
2. **Upload the files.** On the new repo page click **uploading an existing file**. Open the unzipped `shot-lab` folder in Finder, select everything inside it (`index.html`, `sw.js`, `manifest.webmanifest`, `README.md` and the `icons` and `fonts` folders) and drag it all into the browser. Click **Commit changes**.
   `index.html` must sit at the top level of the repo, not inside another folder.
3. **Turn on GitHub Pages.** In the repo go to **Settings → Pages**. Under *Build and deployment* set **Source: Deploy from a branch**, **Branch: main**, folder **/ (root)**, and click **Save**.
4. After a minute or two the page shows your address: `https://YOUR-USERNAME.github.io/shot-lab/`.

## Put it on your iPhone

1. Open that address in **Safari** on the iPhone (it has to be Safari).
2. Tap the **Share** button, scroll down, tap **Add to Home Screen**, then **Add**.
3. Open Shot Lab from the new icon. It runs full screen and keeps working with no signal.

Always open it from the icon. The Home Screen app keeps its own storage, separate from Safari tabs.

## First round

1. **Setup → Your bag:** enter your carry and total yardages (used for club suggestions in casual rounds).
2. **Play → Add a course:** enter par and yardage for each hole from your tees.
3. **Start round.** For tournaments and qualifiers set **Rules-safe mode: On** (it switches on by itself when you pick those round types).
4. **Mark each green once.** Standing on a green, tap **Mark green**. From then on, **GPS to green** fills in distances on that course.
5. Pick **Quick** entry when you need speed, or **Full detail** when you want shape and strike data for the shape-habit stats. You can switch on any shot.

## Rules-safe mode (Rule 4.3a)

Recording stats during a round is allowed. A device must not analyse the round in progress, recommend clubs, or give plays-like (elevation-adjusted) distances. With rules-safe mode on, Shot Lab hides club suggestions, plays-like yardage and all strokes gained for that round until you finish it. GPS distance to the middle of the green stays available. Check each competition's local rules on distance devices.

## Sync between iPhone and Mac (optional)

Without sync, data lives on each device only. To share rounds between devices:

1. github.com → **Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token (classic)**.
2. Name it `Shot Lab`, tick only **gist**, set **No expiration**, generate, and copy the token.
3. In Shot Lab on each device: **Setup → Sync → paste the token → Connect.**

Your data goes to a private gist in your GitHub account. The token is stored only on the device and is never in exports. The repository itself never contains your rounds, so a public repo is fine.

## Backups

**Setup → Your data → Back up everything** saves a JSON file (on iPhone the share sheet lets you save it to Files or AirDrop it). **Restore or merge a backup** reads one back; the newest version of each round wins and nothing is deleted. **Export every shot** gives a CSV for Excel or Google Sheets.

## Updating the app later

Upload the new `index.html` to the repo (Add file → Upload files, Commit). Phones load the new version the next time the app opens with a signal. If you ever change `sw.js`, also change the `VERSION` line at its top. When a new version arrives while the app is open, a yellow bar offers **Update now**. Your rounds are never touched by an update.

## For your other apps

Each time Home opens, Shot Lab writes a summary to `localStorage['shotlab.summary']`: strokes gained per round by category and your top five leaks with a drill for each. Any app hosted on the same `YOUR-USERNAME.github.io` site can read it, for example to build practice sessions around your biggest leaks.

## Files

| File | What it does |
| --- | --- |
| `index.html` | The whole app |
| `sw.js` | Offline support |
| `manifest.webmanifest` | App name, icon and colours for the Home Screen |
| `icons/` | App icon in every size iOS and browsers need |
| `fonts/` | Barlow Condensed and Public Sans, bundled so they work offline (SIL Open Font License 1.1) |

## Troubleshooting

- **The page is a 404:** wait two minutes after turning on Pages, and check `index.html` is at the top level of the repo.
- **GPS says location is blocked:** iPhone Settings → Privacy & Security → Location Services → Safari Websites → While Using the App.
- **Sync says the token was rejected:** generate a new classic token with the gist box ticked and connect again.
- **Rounds missing on the phone:** make sure you are opening the Home Screen icon, not a Safari tab.
