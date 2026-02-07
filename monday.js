// ------------------------------------------------------------
// monday.js - Monday Morning: The Week Begins
// ------------------------------------------------------------

function drawMonday() {
  background(getBackgroundColor());

  // ---- Scene title ----
  fill(40, 40, 40);
  textSize(36);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text("Monday Morning", width / 2, 100);

  // ---- Scene description ----
  fill(60, 60, 60);
  textSize(18);
  textStyle(NORMAL);
  
  const lines = [
    "You wake up and check your calendar.",
    "",
    "Five exams. Five days.",
    "",
    "Your wall calendar stares back at you,",
    "red circles around each exam date like",
    "ominous warning signs.",
    "",
    "What do you do?"
  ];
  
  let yPos = 160;
  for (let line of lines) {
    text(line, width / 2, yPos);
    yPos += 25;
  }

  // ---- Choice buttons ----
  const choice1 = {
    x: width / 2,
    y: 450,
    w: 600,
    h: 70,
    label: "Make a detailed study schedule",
  };

  const choice2 = {
    x: width / 2,
    y: 540,
    w: 600,
    h: 70,
    label: "Panic and scroll through Reddit",
  };

  const choice3 = {
    x: width / 2,
    y: 630,
    w: 600,
    h: 70,
    label: "Check what you actually need to study",
  };

  drawChoiceButton(choice1);
  drawChoiceButton(choice2);
  drawChoiceButton(choice3);

  // Cursor feedback
  const anyHover = isHover(choice1) || isHover(choice2) || isHover(choice3);
  cursor(anyHover ? HAND : ARROW);
}

// Choice button drawing
function drawChoiceButton({ x, y, w, h, label }) {
  rectMode(CENTER);
  
  const hover = isHover({ x, y, w, h });
  
  noStroke();
  
  if (hover) {
    fill(100, 140, 180, 220);
  } else {
    fill(140, 160, 180, 180);
  }
  
  rect(x, y, w, h, 10);
  
  // Text
  fill(255);
  textSize(20);
  textAlign(CENTER, CENTER);
  text(label, x, y);
}

// Mouse input
function mondayMousePressed() {
  const choice1 = { x: width / 2, y: 450, w: 600, h: 70 };
  const choice2 = { x: width / 2, y: 540, w: 600, h: 70 };
  const choice3 = { x: width / 2, y: 630, w: 600, h: 70 };

  if (isHover(choice1)) {
    // Make a schedule - feel in control
    changeMentalClarity(10);
    hasSchedule = true;
    // Move to location choice screen
    // For now, let's go to library as default
    currentScreen = "library";
  } else if (isHover(choice2)) {
    // Panic scroll - feel worse
    changeMentalClarity(-5);
    currentScreen = "library";
  } else if (isHover(choice3)) {
    // Realistic assessment - neutral
    currentScreen = "library";
  }
}
