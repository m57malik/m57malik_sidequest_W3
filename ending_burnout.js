// ------------------------------------------------------------
// ending_burnout.js - The Burnout Ending (sanity 0-25)
// ------------------------------------------------------------

function drawEndingBurnout() {
  // Grayscale, desaturated background
  background(200, 200, 200);

  // ---- Title ----
  fill(80, 80, 80);
  textSize(48);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text("BURNOUT", width / 2, 120);

  // ---- Achievement ----
  fill(120, 120, 120);
  textSize(20);
  text("Achievement Unlocked: Academic Zombie", width / 2, 170);

  // ---- Narrative ----
  fill(60, 60, 60);
  textSize(18);
  textStyle(NORMAL);
  
  const lines = [
    "The exam is a blur.",
    "",
    "You remember writing things.",
    "You remember the fluorescent lights.",
    "You remember thinking you saw your grandmother",
    "in the corner, but she's been dead for three years.",
    "",
    "You got a B+.",
    "",
    "You feel nothing.",
  ];
  
  let yPos = 250;
  for (let line of lines) {
    text(line, width / 2, yPos);
    yPos += 30;
  }

  // ---- Final stats ----
  fill(100, 100, 100);
  textSize(16);
  text(`Final Mental Clarity: ${Math.round(mentalClarity)}/100`, width / 2, 580);
  text(`Preparation Level: ${prepLevel}`, width / 2, 610);

  // ---- Restart button ----
  const restartBtn = {
    x: width / 2,
    y: 690,
    w: 240,
    h: 60,
    label: "TRY AGAIN",
  };

  drawEndingButton(restartBtn);

  cursor(isHover(restartBtn) ? HAND : ARROW);
}

function drawEndingButton({ x, y, w, h, label }) {
  rectMode(CENTER);
  
  const hover = isHover({ x, y, w, h });
  
  noStroke();
  fill(hover ? 100 : 120, hover ? 100 : 120, hover ? 100 : 120, 200);
  rect(x, y, w, h, 10);
  
  fill(255);
  textSize(20);
  textAlign(CENTER, CENTER);
  text(label, x, y);
}

function endingMousePressed() {
  const restartBtn = { x: width / 2, y: 690, w: 240, h: 60 };
  
  if (isHover(restartBtn)) {
    resetGame();
  }
}

function endingKeyPressed() {
  if (key === 'r' || key === 'R') {
    resetGame();
  }
}
