// ------------------------------------------------------------
// thursday.js - Thursday: Final Cramming
// ------------------------------------------------------------

function drawThursday() {
  background(getBackgroundColor());

  // ---- Urgent visual ----
  push();
  // Pulsing effect if mental clarity is low
  if (mentalClarity < 30) {
    let pulse = sin(frameCount * 0.1) * 10 + 245;
    background(pulse, 210, 210);
  }
  pop();

  // ---- Scene title ----
  fill(40, 40, 40);
  textSize(32);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text("Thursday Night", width / 2, 100);

  // ---- Urgency indicator ----
  fill(200, 80, 80);
  textSize(20);
  text("⚠️ EXAM TOMORROW ⚠️", width / 2, 145);

  // ---- Scene description ----
  fill(60, 60, 60);
  textSize(17);
  textStyle(NORMAL);
  
  const lines = [
    "This is it. Last chance to prepare.",
    "",
    "Your notes are scattered across your desk.",
    "Some of them don't even make sense anymore.",
    "",
    "What's your final move?"
  ];
  
  let yPos = 190;
  for (let line of lines) {
    text(line, width / 2, yPos);
    yPos += 28;
  }

  // ---- Choice buttons (some conditional) ----
  let choiceY = 390;
  const choices = [];

  // Special choice if you made a schedule on Monday
  if (hasSchedule) {
    choices.push({
      x: width / 2,
      y: choiceY,
      w: 600,
      h: 65,
      label: "Review everything (your schedule helps!)",
      id: "schedule",
    });
    choiceY += 80;
  }

  choices.push({
    x: width / 2,
    y: choiceY,
    w: 600,
    h: 65,
    label: "Focus on weak areas (strategic)",
    id: "focus",
  });
  choiceY += 80;

  choices.push({
    x: width / 2,
    y: choiceY,
    w: 600,
    h: 65,
    label: "Pray to the curve gods (cope)",
    id: "pray",
  });
  choiceY += 80;

  choices.push({
    x: width / 2,
    y: choiceY,
    w: 600,
    h: 65,
    label: "Accept your fate, rest instead (wise?)",
    id: "rest",
  });

  // Draw all buttons
  for (let choice of choices) {
    drawThursdayButton(choice);
  }

  // Store choices for mouse handler
  window.thursdayChoices = choices;

  // Cursor feedback
  let anyHover = false;
  for (let choice of choices) {
    if (isHover(choice)) anyHover = true;
  }
  cursor(anyHover ? HAND : ARROW);
}

// Button drawing with intensity based on mental clarity
function drawThursdayButton({ x, y, w, h, label }) {
  rectMode(CENTER);
  
  const hover = isHover({ x, y, w, h });
  
  noStroke();
  
  // Color changes based on mental clarity level
  let r, g, b;
  if (mentalClarity > 50) {
    r = hover ? 100 : 120;
    g = hover ? 140 : 160;
    b = hover ? 180 : 200;
  } else {
    r = hover ? 180 : 200;
    g = hover ? 140 : 160;
    b = hover ? 100 : 120;
  }
  
  fill(r, g, b, 200);
  rect(x, y, w, h, 10);
  
  fill(255);
  textSize(18);
  textAlign(CENTER, CENTER);
  text(label, x, y);
}

// Mouse input
function thursdayMousePressed() {
  const choices = window.thursdayChoices;
  
  for (let choice of choices) {
    if (isHover(choice)) {
      if (choice.id === "schedule") {
        // Review everything with schedule
        changeMentalClarity(-10);
        changePrep(3);
        currentScreen = "exam";
      } else if (choice.id === "focus") {
        // Focus on weak areas
        changeMentalClarity(-15);
        changePrep(2);
        currentScreen = "exam";
      } else if (choice.id === "pray") {
        // Pray to the curve
        // No stat changes, just humor
        currentScreen = "exam";
      } else if (choice.id === "rest") {
        // Rest instead
        changeMentalClarity(15);
        // No prep change
        currentScreen = "exam";
      }
      break;
    }
  }
}
