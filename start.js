// ------------------------------------------------------------
// start.js - Title screen for The Exam Week
// ------------------------------------------------------------

function drawStart() {
  // Dark background for title screen
  background(40, 50, 60);

  // ---- Title ----
  fill(255, 200, 100);
  textSize(64);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text("THE EXAM WEEK", width / 2, 200);

  // ---- Subtitle ----
  fill(200, 200, 200);
  textSize(24);
  textStyle(NORMAL);
  text("A Survival Story", width / 2, 260);

  // ---- Flavor text ----
  fill(180, 180, 180);
  textSize(16);
  text("5 exams. 5 days. 1 fragile mind.", width / 2, 320);

  // ---- Start button ----
  const startBtn = {
    x: width / 2,
    y: 450,
    w: 280,
    h: 80,
    label: "BEGIN EXAM WEEK",
  };

  drawStartButton(startBtn);

  // ---- Instructions ----
  fill(150, 150, 150);
  textSize(14);
  text("Your choices affect your mental clarity.", width / 2, 580);
  text("Try to survive with your mind intact.", width / 2, 605);
  text("There are multiple endings...", width / 2, 630);

  // Cursor feedback
  cursor(isHover(startBtn) ? HAND : ARROW);
}

// Button drawing for start screen
function drawStartButton({ x, y, w, h, label }) {
  rectMode(CENTER);
  
  const hover = isHover({ x, y, w, h });
  
  noStroke();
  
  if (hover) {
    // Glowing effect on hover
    fill(255, 180, 100, 240);
    drawingContext.shadowBlur = 25;
    drawingContext.shadowColor = color(255, 150, 80);
  } else {
    fill(200, 140, 80, 220);
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = color(200, 120, 60);
  }
  
  rect(x, y, w, h, 14);
  
  // Reset shadow
  drawingContext.shadowBlur = 0;
  
  // Button text
  fill(255);
  textSize(26);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text(label, x, y);
}

// Mouse input for start screen
function startMousePressed() {
  const startBtn = { x: width / 2, y: 450, w: 280, h: 80 };
  
  if (isHover(startBtn)) {
    // Initialize game and go to Monday morning
    resetGame();
    currentScreen = "monday";
  }
}

// Keyboard input
function startKeyPressed() {
  if (keyCode === ENTER) {
    resetGame();
    currentScreen = "monday";
  }
}
