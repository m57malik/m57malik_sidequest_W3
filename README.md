# The Exam Week

## Group Members
- **Moosa Malik**  
  WatID: m57malik  
  Student Number: 20913010

---

## Description

*The Exam Week* is an interactive narrative game built with p5.js that explores the psychological challenges students face during finals week. The game simulates five days of exam preparation where players must balance academic performance with mental wellbeing through a series of meaningful choices.

The core experience revolves around managing a **mental clarity** stat (0-100) that dynamically responds to player decisions. Every choice—from study strategies to sleep patterns to social interactions—affects this stat and determines which options become available in later scenes. The game features a branching narrative structure where early altruistic choices (helping strangers, making connections) unlock beneficial events later, demonstrating how kindness and human connection can provide unexpected support during stressful times.

**Core Mechanics:**
- **Mental Clarity System**: A color-coded stat bar (green → yellow → orange → red) that tracks psychological state and gates narrative options
- **Hidden Consequences**: Three boolean flags (`hasSchedule`, `helpedStranger`, `socialConnection`) set by early choices that trigger bonus events in later scenes
- **Adaptive Narrative**: Choice availability changes based on current mental clarity (high clarity = rational options, low clarity = desperate measures)
- **Dynamic Feedback**: Color-coded visual indicators (green ▲ for gains, red ▼ for losses) provide immediate clarity on decision consequences

**Player Experience:**  
The game creates emotional engagement through relatable college scenarios and meaningful dilemmas. Players experience the cascading effects of their decisions across multiple days, with time pressure created by the knowledge that poor choices compound. The narrative structure encourages reflection on the real costs of academic stress and the value of self-care and community support. Multiple endings (ranging from burnout to enlightenment) ensure that different play styles and values lead to distinct outcomes, promoting replayability.

---

## Setup and Interaction Instructions

### Running the Game

**Method 1: Direct File Opening (Simplest)**
1. Ensure internet connection (required for p5.js CDN)
2. Navigate to the project folder
3. Double-click `index.html`
4. The game loads automatically in your default browser

**Method 2: Local Web Server (Best for Development)**
```bash
# Option A: Python 3
cd THE_EXAM_WEEK
python -m http.server 8000
# Open http://localhost:8000 in browser

# Option B: Node.js
cd THE_EXAM_WEEK
npx http-server
# Open http://localhost:8080 in browser

# Option C: VS Code Live Server
# Right-click index.html → "Open with Live Server"
```

### How to Play

**Controls:**
- **Mouse**: Click choice buttons to make decisions
- **Keyboard**: 
  - `ENTER` on start screen to begin game
  - `R` on ending screens to restart

**Gameplay Structure:**

1. **Start Screen**: Click "BEGIN EXAM WEEK" to start your journey

2. **Monday Morning** (First Decision):
   - Make a study schedule (+10 clarity, unlocks bonus Thursday option)
   - Panic scroll Reddit (-5 clarity)
   - Check requirements (neutral)

3. **Study Location** (Currently routes to Library):
   - Study 6 hours straight (-10 clarity, +2 prep)
   - Study 3 hours with breaks (-5 clarity, +1 prep)
   - Help crying stranger (-15 clarity, sets `helpedStranger` flag for Wednesday bonus)

4. **Midnight Crisis** (Choices adapt to clarity level):
   - **High clarity (>50)**: Rational options (sleep 8 hours, balanced study)
   - **Medium clarity (25-50)**: Stressed options (try to sleep, coffee binge)
   - **Low clarity (<25)**: Desperate options (dissociate, cry, study through tears)

5. **Wednesday** (Hidden consequences activate):
   - If you helped the stranger, they show up to help you (+5 clarity bonus)
   - If you made social connections, friend brings coffee (+5 clarity bonus)

6. **Thursday** (Final preparation):
   - If you made a schedule Monday, get exclusive "review everything" option (+3 prep)
   - Strategic focus (-15 clarity, +2 prep)
   - Accept fate and rest (+15 clarity, 0 prep)

7. **Friday Exam**: Automatic timed narrative that adapts to your stats

8. **Ending**: One of four outcomes based on final mental clarity

**Mental Clarity Bar:**
- Located prominently at top-center of screen
- Color-coded: Green (70-100), Yellow (40-69), Orange (20-39), Red (0-19)
- Displays as percentage

**Stat Change Feedback:**
- Green ▲ text for positive changes
- Red ▼ text for negative changes
- Appears below mental clarity bar

---

## Iteration Notes

### Post-Playtest Changes

Three changes made based on playtesting feedback:

1. **Renamed "Sanity" to "Mental Clarity"**
   - **Reason**: Playtesters noted that "sanity" felt clinically stigmatizing and didn't accurately represent the experience of academic stress
   - **Impact**: "Mental clarity" better captures the cognitive fog and decision-making capacity that degrades under pressure, making the mechanic feel more relatable and less pathologizing

2. **Enlarged and Centered Mental Clarity Bar**
   - **Reason**: Playtesters frequently missed the small top-left stat bar and didn't understand why certain choices were unavailable at low clarity
   - **Impact**: New prominent centered bar (650×45px, size 22 bold font, shows percentage) is impossible to miss and provides constant awareness of current state, improving strategic decision-making

3. **Added Color-Coded Stat Change Feedback (Green/Red)**
   - **Reason**: Playtesters reported confusion about whether choices were helping or hurting them, requiring mental math to track changes
   - **Impact**: Immediate visual feedback (bright green ▲ for gains, bright red ▼ for losses) provides instant clarity on choice consequences, reducing cognitive load and improving learning of game systems

### Post-Showcase Planned Improvements

Two planned improvements for future iterations:

1. **Dynamic Background Music System**
   - **Rationale**: Audio feedback would enhance emotional immersion by reflecting psychological state without requiring visual attention
   - **Implementation Plan**: Use p5.sound library to load calm ambient track that increases tempo/pitch as mental clarity drops below thresholds (70%, 40%, 20%). Add subtle heartbeat sound effect below 20% clarity to create urgency.

2. **Expanded Study Location Choice**
   - **Rationale**: Current game forces all players to Library scene; adding genuine choice between Library/Dorm/Coffee Shop would increase replayability and allow players to role-play different study styles
   - **Implementation Plan**: Add intermediate choice screen after Monday showing three location buttons with brief descriptions. Each path has different risk/reward profiles (Library = high prep/high stress, Dorm = comfort/distraction risk, Coffee Shop = social/moderate). All paths converge at Midnight scene.

---

## Assets

### Original Assets
All code, narrative content, game design, and visual design created by Moosa Malik for GBDA302 (Winter 2026).

### External Libraries
- **p5.js** [1] - JavaScript library for creative coding  
  Version: 1.x (latest stable)  
  Source: https://cdn.jsdelivr.net/npm/p5@1/lib/p5.min.js  
  License: LGPL 2.1  
  Usage: Loaded via CDN for core graphics, text rendering, and interaction handling

### Fonts
- **System Sans-Serif** - Browser default sans-serif font stack  
  No external assets required

### Visual Elements
- **Unicode Characters** - Used for visual indicators:
  - ▲ (U+25B2) - Upward triangle for positive stat changes
  - ▼ (U+25BC) - Downward triangle for negative stat changes  
  - ⚠️ (U+26A0 + U+FE0F) - Warning sign for random events
  - ☕ 📱 🚨 💬 ⚡ 🎵 😴 ✨ 📚 - Emoji for event icons  
  Source: Unicode Standard [2]  
  License: Public domain

---

## References

### In-Program Citations

[1] Processing Foundation. n.d. *p5.js*. Retrieved February 7, 2026 from https://p5js.org/

[2] Unicode Consortium. 2024. *Unicode Standard, Version 15.1*. Retrieved February 7, 2026 from https://unicode.org/versions/Unicode15.1.0/

### Additional References

*Note: The following sources informed design decisions but are not directly cited in code or documentation.*

Arnett, J. J. 2000. Emerging adulthood: A theory of development from the late teens through the twenties. *American Psychologist* 55, 5 (2000), 469-480. DOI: https://doi.org/10.1037/0003-066X.55.5.469

Bayram, N. and Bilgel, N. 2008. The prevalence and socio-demographic correlations of depression, anxiety and stress among a group of university students. *Social Psychiatry and Psychiatric Epidemiology* 43, 8 (2008), 667-672. DOI: https://doi.org/10.1007/s00127-008-0345-x

Bogost, I. 2007. *Persuasive Games: The Expressive Power of Videogames*. MIT Press, Cambridge, MA.

Flanagan, M. 2009. *Critical Play: Radical Game Design*. MIT Press, Cambridge, MA.

Norman, D. A. 2013. *The Design of Everyday Things: Revised and Expanded Edition*. Basic Books, New York, NY.

---

## Technical Notes

### Project Structure
```
THE_EXAM_WEEK/
├── index.html              # Main HTML file
├── sketch.js               # Combined game logic (all-in-one version)
├── main.js                 # Core systems (routing, stats, helpers)
├── start.js                # Start screen
├── monday.js               # Monday scene
├── library.js              # Library study scene
├── dorm.js                 # Dorm study scene (unused in current routing)
├── coffeeshop.js          # Coffee shop scene (unused in current routing)
├── midnight.js             # Midnight crisis scene
├── wednesday.js            # Wednesday scene (hidden consequences)
├── thursday.js             # Thursday preparation scene
├── exam.js                 # Friday exam scene
├── ending_burnout.js       # Burnout ending (0-25 clarity)
├── ending_survivor.js      # Survivor ending (26-50 clarity)
├── ending_balanced.js      # Balanced ending (51-75 clarity)
├── ending_enlightened.js   # Secret enlightened ending (76-100 + flags)
├── style.css               # Page styling
├── jsconfig.json           # VS Code configuration
├── libraries/              # External libraries folder (p5.js via CDN)
└── assets/                 # Game assets folder
    ├── images/             # Image files (currently unused)
    ├── sounds/             # Audio files (currently unused)
    └── fonts/              # Font files (currently unused)
```

### Mental Clarity Thresholds
- **Ending Calculation**:
  - 76-100 + flags → Enlightened (secret)
  - 51-75 → Balanced
  - 26-50 → Survivor
  - 0-25 → Burnout

- **Midnight Choice Variants**:
  - >50 → Rational options
  - 25-50 → Stressed options
  - <25 → Desperate options

### Hidden Consequence Flags
- `hasSchedule` (Monday) → Unlocks "Review everything" on Thursday (+3 prep bonus)
- `helpedStranger` (Library) → Stranger helps at study group Wednesday (+5 clarity bonus)
- `socialConnection` (Coffee Shop) → Friend brings coffee Wednesday (+5 clarity bonus)

---

## Gameplay Statistics

- **Average Playthrough Time**: 5-8 minutes
- **Total Unique Choices**: 23+ (varies by clarity level and flags)
- **Replayability Factors**: 4 endings, 3 hidden consequences
- **Decision Points**: 7 major scenes with 2-4 choices each

---

*Developed for GBDA302 - Interactive Media Design, Winter 2026*  
*University of Waterloo*
