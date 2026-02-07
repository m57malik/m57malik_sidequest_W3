// ------------------------------------------------------------
// midnight.js - Midnight Crisis (all paths converge here)
// ------------------------------------------------------------

function drawMidnight() {
  background(getBackgroundColor());

  // ---- Clock display (creates urgency) ----
  fill(200, 80, 80);
  textSize(48);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text("11:47 PM", width / 2, 100);

  // ---- Scene description ----
  fill(60, 60, 60);
  textSize(18);
  textStyle(NORMAL);
  
  const lines = [
    "Monday night. You've studied some.",
    "",
    "But is it enough?",
    "",
    "Your brain is tired. Your eyes hurt.",
    "Four more days of this."
  ];
  
  let yPos = 170;
  for (let line of lines) {
    text(line, width / 2, yPos);
    yPos += 28;
  }

  // Different choices based on current mental clarity level
  if (mentalClarity > 50) {
    drawHighMentalClarityChoices();
  } else if (mentalClarity >= 25) {
    drawMediumMentalClarityChoices();
  } else {
    drawLowMentalClarityChoices();
  }

  // Mental clarity warning if low
  if (mentalClarity < 30) {
    fill(200, 80, 80);
    textSize(14);
    text("(Your mental clarity is critically low)", width / 2, 680);
  }
}

// High mental clarity choices (rational decisions)
function drawHighMentalClarityChoices() {
  fill(80, 80, 80);
  textSize(16);
  textAlign(CENTER, CENTER);
  text("You feel relatively in control.", width / 2, 340);

  const choice1 = {
    x: width / 2,
    y: 420,
    w: 550,
    h: 65,
    label: "Sleep 8 hours (healthy choice)",
  };

  const choice2 = {
    x: width / 2,
    y: 500,
    w: 550,
    h: 65,
    label: "Sleep 6 hours, study 2 more",
  };

  const choice3 = {
    x: width / 2,
    y: 580,
    w: 550,
    h: 65,
    label: "Study until 2 AM (push yourself)",
  };

  drawMidnightButton(choice1, true);
  drawMidnightButton(choice2, true);
  drawMidnightButton(choice3, true);

  const anyHover = isHover(choice1) || isHover(choice2) || isHover(choice3);
  cursor(anyHover ? HAND : ARROW);
}

// Medium mental clarity choices (stress showing)
function drawMediumMentalClarityChoices() {
  fill(120, 100, 80);
  textSize(16);
  textAlign(CENTER, CENTER);
  text("You're getting stressed...", width / 2, 340);

  const choice1 = {
    x: width / 2,
    y: 420,
    w: 550,
    h: 65,
    label: "Try to sleep (anxiety might keep you up)",
  };

  const choice2 = {
    x: width / 2,
    y: 500,
    w: 550,
    h: 65,
    label: "Coffee and grind (risky)",
  };

  const choice3 = {
    x: width / 2,
    y: 580,
    w: 550,
    h: 65,
    label: "Stress eat and study",
  };

  drawMidnightButton(choice1, false);
  drawMidnightButton(choice2, false);
  drawMidnightButton(choice3, false);

  const anyHover = isHover(choice1) || isHover(choice2) || isHover(choice3);
  cursor(anyHover ? HAND : ARROW);
}

// Low mental clarity choices (desperation)
function drawLowMentalClarityChoices() {
  fill(180, 80, 80);
  textSize(16);
  textAlign(CENTER, CENTER);
  text("Everything is falling apart.", width / 2, 340);

  const choice1 = {
    x: width / 2,
    y: 420,
    w: 550,
    h: 65,
    label: "Stare at the ceiling (dissociate)",
  };

  const choice2 = {
    x: width / 2,
    y: 500,
    w: 550,
    h: 65,
    label: "Cry in the shower (let it out)",
  };

  const choice3 = {
    x: width / 2,
    y: 580,
    w: 550,
    h: 65,
    label: "Study through tears (desperation)",
  };

  drawMidnightButton(choice1, false);
  drawMidnightButton(choice2, false);
  drawMidnightButton(choice3, false);

  const anyHover = isHover(choice1) || isHover(choice2) || isHover(choice3);
  cursor(anyHover ? HAND : ARROW);
}

// Button drawing (changes style based on mental clarity level)
function drawMidnightButton({ x, y, w, h, label }, isHealthy) {
  rectMode(CENTER);
  
  const hover = isHover({ x, y, w, h });
  
  noStroke();
  
  if (isHealthy) {
    fill(hover ? 100 : 120, hover ? 140 : 160, hover ? 100 : 120, 200);
  } else {
    fill(hover ? 140 : 160, hover ? 100 : 120, hover ? 80 : 100, 200);
  }
  
  rect(x, y, w, h, 10);
  
  fill(255);
  textSize(18);
  textAlign(CENTER, CENTER);
  text(label, x, y);
}

// Mouse input - handles all three mental clarity tiers
function midnightMousePressed() {
  const choice1 = { x: width / 2, y: 420, w: 550, h: 65 };
  const choice2 = { x: width / 2, y: 500, w: 550, h: 65 };
  const choice3 = { x: width / 2, y: 580, w: 550, h: 65 };

  if (mentalClarity > 50) {
    // High mental clarity choices
    if (isHover(choice1)) {
      changeMentalClarity(10);  // 8 hours sleep
      currentScreen = "wednesday";
    } else if (isHover(choice2)) {
      changeMentalClarity(-5);  // 6 hours + study
      changePrep(1);
      currentScreen = "wednesday";
    } else if (isHover(choice3)) {
      changeMentalClarity(-15); // Study till 2 AM
      changePrep(2);
      currentScreen = "wednesday";
    }
  } else if (mentalClarity >= 25) {
    // Medium mental clarity choices
    if (isHover(choice1)) {
      changeMentalClarity(5);   // Try to sleep
      currentScreen = "wednesday";
    } else if (isHover(choice2)) {
      changeMentalClarity(-10); // Coffee and grind
      changePrep(2);
      currentScreen = "wednesday";
    } else if (isHover(choice3)) {
      changeMentalClarity(-5);  // Stress eat
      changePrep(1);
      currentScreen = "wednesday";
    }
  } else {
    // Low mental clarity choices
    if (isHover(choice1)) {
      // Stare at ceiling - no change
      currentScreen = "wednesday";
    } else if (isHover(choice2)) {
      changeMentalClarity(5);   // Cry (cathartic)
      currentScreen = "wednesday";
    } else if (isHover(choice3)) {
      changeMentalClarity(-15); // Study through tears
      changePrep(3);     // Desperation bonus
      currentScreen = "wednesday";
    }
  }
}
