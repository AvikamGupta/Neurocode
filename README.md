<div align="center">

# 🧠 NEUROCODE

**Understand the error. Master the logic. Write better code.**

An AI-style debugging and code-learning workspace that runs entirely in your browser from a single `index.html` file.

![Single file](https://img.shields.io/badge/build-single%20file-a78bfa)
![Storage](https://img.shields.io/badge/storage-IndexedDB-7c3aed)
![Languages](https://img.shields.io/badge/analyzes-Python%20%7C%20JavaScript-22d3ee)
![Execution](https://img.shields.io/badge/code%20execution-never-34d399)

[Quick start](#-quick-start) · [Features](#-features) · [Try it](#-try-it-in-60-seconds) · [FAQ](#-faq) · [Roadmap](#-roadmap)

</div>

---

## 📑 Contents

- [Quick start](#-quick-start)
- [Features](#-features)
- [Try it in 60 seconds](#-try-it-in-60-seconds)
- [What the analyzer detects](#-what-the-analyzer-detects)
- [Test Lab](#-test-lab)
- [Optional server mode](#-optional-server-mode)
- [Privacy](#-privacy)
- [Limitations](#-limitations)
- [FAQ](#-faq)
- [Roadmap](#-roadmap)

> 💡 **Tip:** Click any ▶ arrow below to expand a section.

---

## 🚀 Quick start

No install, no build step, no dependencies.

**Option 1: open the file**

Double-click `index.html`.

**Option 2: serve it locally** (recommended, so browser storage behaves consistently)

```bash
# Python
python -m http.server 8000

# or Node
npx serve .
```

Then visit <http://localhost:8000>.

<details>
<summary><b>▶ Requirements</b></summary>

- Any modern browser (Chrome, Edge, Firefox, Safari) with IndexedDB and `crypto.subtle` enabled
- Nothing else. Fonts fall back to your system's `Inter` / `system-ui`

> `crypto.subtle` needs a secure context. `localhost` and `file://` in most browsers qualify, but plain `http://` on a LAN address may not.

</details>

---

## ✨ Features

| Page | What it does |
|---|---|
| 🏠 **Dashboard** | Session count, error-category breakdown, weekly activity bar chart, learning insight, frequent patterns, recent sessions |
| 🔍 **Analyze** | Paste code, pick language and frontend/backend context, add an optional error message and expected behavior, get a full report |
| 🧪 **Test Lab** | Self-test of the analyzer against 43 built-in cases, with one-click open in the workspace |
| 🗂️ **AC DEVS NEUROVIEW** | Your saved history: search, filter, sort, view details, reopen, delete |
| ⚙️ **Settings** | Account info, privacy notes, clear all history |
| 🤖 **Neu-ron** | Floating chat assistant (scripted offline, live AI if a server is connected) |

<details>
<summary><b>▶ What's in an analysis report?</b></summary>

1. **Category badge**: syntax, runtime, logical, or no confirmed error
2. **Severity, context, confidence, and verification status** badges
3. **Evidence**: the exact line (and your pasted error message, if any)
4. **Root cause** in plain language
5. **Original vs corrected code**, with changed lines highlighted
6. Expandable sections:
   - Beginner-friendly explanation
   - Technical explanation
   - Step-by-step fix
   - Suggested test cases
   - Prevention and learning tips
7. Actions: **Copy fixed code**, **Reanalyze**, **Save session**

</details>

---

## ⏱️ Try it in 60 seconds

- [ ] Open the app and sign in with any username and a passcode of 4+ characters
- [ ] Go to **Analyze**
- [ ] Open the **Load example…** dropdown and pick *"Missing colon after def"*
- [ ] Press **Analyze Code** and read the report
- [ ] Press **Copy fixed code** or **Reanalyze** to confirm the fix passes the static re-check
- [ ] Press **Save session**
- [ ] Visit **AC DEVS NEUROVIEW** to find it, then open **Details**
- [ ] Visit the **Dashboard** to see your stats update
- [ ] Open the **Test Lab** and check how many cases pass
- [ ] Click the 🧠 button and ask Neu-ron *"Explain my last result"*

<details>
<summary><b>▶ Paste-ready snippets to try</b></summary>

**Syntax error (assign to a literal, plus a typo)**
```python
a=2
4=2
prin(a+4)
```

**Runtime error (str + int)**
```python
age = 25
print("Age: " + age)
```

**Logic error (off-by-one)**
```python
def total(nums):
    s = 0
    for i in range(len(nums) + 1):
        s += nums[i]
    return s
print(total([1, 2, 3]))
```

**Correct code (should report no confirmed issues)**
```python
def fact(n):
    if n <= 1:
        return 1
    return n * fact(n - 1)
print(fact(5))
```

</details>

---

## 🔎 What the analyzer detects

The built-in analyzer uses static checks only. It reads your code as text and never runs it.

<details>
<summary><b>▶ 🔴 Syntax errors</b></summary>

- Missing colon after `def`, `if`, `elif`, `else`, `for`, `while`, `class`, `try`, `with`, `except`
- `print "hello"` (Python 2 style)
- Unclosed `(`, `[`, `{` and unmatched closing brackets
- Unterminated strings
- `=` used instead of `==` in a condition
- Missing indentation after a `:` header
- `else if` instead of `elif`
- `&&` / `||` instead of `and` / `or`
- `i++` / `i--`
- Assignment to a literal (`4 = 2`)

</details>

<details>
<summary><b>▶ 🟡 Runtime errors</b></summary>

- Misspelled built-ins (`prin`, `lenn`) via edit-distance matching, and misspelled `console` / `console.log` in JavaScript
- Undefined variables inside `print()`
- `true` / `false` / `null` instead of `True` / `False` / `None`
- Division by the literal `0`
- `str + int` (literal or variable)
- Literal list index out of range
- `int()` / `float()` of obviously non-numeric text
- Property access on `null` / `undefined` (JavaScript)
- Any `...Error` name found in your pasted error message

</details>

<details>
<summary><b>▶ 🔵 Logical issues</b></summary>

- `range(len(x) + 1)` and `<= arr.length` off-by-one loops
- `while True` with no `break` / `return` / `raise`
- `while` loops whose condition variables never change
- Division by `len(x)` (possible empty-input crash, flagged as *suspected*)
- Mutable default arguments (`def f(x, bag=[])`)
- `== None` instead of `is None`
- Loose `==` in JavaScript; unsafe `innerHTML` assignment in frontend context

</details>

**How fixes and confidence work**

- Findings are ranked: confirmed syntax, then runtime, then logic, with *suspected* items last.
- Suspected items get **Low** confidence; confirmed syntax errors are **Critical** severity.
- After generating a fix, the analyzer re-checks the corrected code and reports whether any pattern issues remain. This is **not** execution, so it is labelled *Partially verified*, never *Verified*.

---

## 🧪 Test Lab

The Test Lab runs every built-in case through the analyzer and compares the detected category and title with what's expected.

| Group | Cases | Purpose |
|---|---|---|
| Syntax | 17 | Parser-level mistakes |
| Runtime | 10 | Failures when a line executes |
| Logical | 6 | Wrong or risky behavior |
| Correct code | 6 | Guards against false positives |
| Known limits | 3 | Bugs that need real execution (shown as *known limit*) |
| JavaScript | 1 | Cross-language check |

Use the **Open** button on any row to load that case into the Analyze page.

---

## 🌐 Optional server mode

On load, the app calls `api/health`. If it returns `{ "ok": true }`, the app switches from local mode to server mode. **No server is included in this repository's `index.html`**; this section documents the contract the frontend expects if you build one.

<details>
<summary><b>▶ Expected endpoints</b></summary>

| Method | Path | Body | Response |
|---|---|---|---|
| `GET` | `/api/health` | none | `{ "ok": true }` |
| `POST` | `/api/auth` | `{ username, passcode }` | `{ token, username }` |
| `GET` | `/api/me` | none (Bearer token) | `{ username }` |
| `GET` | `/api/sessions` | none | `{ sessions: [...] }` |
| `POST` | `/api/sessions` | a session object | any JSON |
| `DELETE` | `/api/sessions/:id` | none | any JSON |
| `DELETE` | `/api/sessions` | none | any JSON |
| `POST` | `/api/analyze` | `{ lang, ctx, code, err, exp }` | analysis result, or `{ demo: true }` to fall back to the local analyzer |
| `POST` | `/api/chat` | `{ message, context }` | `{ reply }`, or `{ demo: true }` to fall back to scripted replies |

Authenticated calls send `Authorization: Bearer <token>`. Keep any AI provider API key on the server in an environment variable. Never put it in `index.html`.

</details>

---

## 🔒 Privacy

- **Local mode (default):** accounts and sessions live in your browser's IndexedDB database (`neurocode`). Passcodes are stored only as a SHA-256 hash. No code leaves your browser.
- **Server mode:** sessions are stored server-side, and submitted code may be sent to whatever AI provider your server uses.
- Sessions are saved only when you press **Save session**.
- Settings → **Clear all my history** removes every saved session for the signed-in user.

> ⚠️ Local accounts are a convenience for the demo, not real security. The hash lives in the same browser as the data, so don't reuse a passcode you care about.

---

## ⚠️ Limitations

- Static pattern checks only. A result of "no confirmed issues" does **not** prove your code is correct.
- Code is never executed, so errors like infinite recursion or a missing dictionary key are not detected (see the *Known limits* group in the Test Lab).
- Wrong algorithms need expected output or tests to catch.
- Only Python and JavaScript are supported. Multi-line triple-quoted strings cause bracket checks to be skipped.
- Code is limited to 20,000 characters per analysis.
- Local accounts are per browser; clearing site data deletes them.

---

## ❓ FAQ

<details>
<summary><b>Is this real AI?</b></summary>

Not by default. Offline, it's a deterministic rule-based analyzer, and the report says so ("Demo static analyzer"). Live AI requires you to connect a server that implements the endpoints above.

</details>

<details>
<summary><b>Why does it say "Partially verified" instead of "Verified"?</b></summary>

Because the fix is only re-checked with the same static rules. Nothing is run. You should still run the corrected code yourself.

</details>

<details>
<summary><b>I forgot my passcode. Can I reset it?</b></summary>

Local demo accounts have no reset. Clear the site's data for this page in your browser settings, or choose a new username.

</details>

<details>
<summary><b>Sign-in or saving doesn't work.</b></summary>

IndexedDB may be blocked (private mode, or storage disabled). The app shows a message when neither local storage nor a server is available. Try a normal window or serve the file over `localhost`.

</details>

<details>
<summary><b>Can I add my own example cases?</b></summary>

Yes. Add an entry to the `CASES` array in `index.html`:

```js
K("Group name", "Case title", "syntax", "expected title text", 'code here', { l: "python" })
```

Arguments: group, name, expected category (`syntax` / `runtime` / `logical` / `none`), a substring of the expected finding title, the code, and optional extras (`l` language, `e` pasted error, `lim` to mark a known limit). It will appear in both the example dropdown and the Test Lab.

</details>

---

## 🗺️ Roadmap

- [x] Dashboard, Analyze, Test Lab, NEUROVIEW history, Settings
- [x] Local accounts and IndexedDB storage
- [x] Fix verification via static re-check
- [x] Built-in assistant (scripted)
- [ ] Reference server implementation for live AI analysis
- [ ] Sandboxed execution for true runtime verification
- [ ] More languages (TypeScript, Java, C++)
- [ ] Export sessions as JSON / Markdown
- [ ] More analyzer rules and a larger test suite

---

<div align="center">

Built with plain Python,HTML, CSS and JavaScript. No frameworks, no trackers.

**NEUROCODE** · AC DEVS NEUROVIEW

</div>
