// ------------------------------------------------------------
// ending_enlightened.js - Secret Ending (sanity 76-100 + both flags)
// ------------------------------------------------------------

function drawEndingEnlightened() {
  // Warm, golden tones
  background(245, 235, 210);

  // ---- Special indicator ----
  fill(200, 160, 80);
  textSize(16);
  textAlign(CENTER, CENTER);
  text("✨ SECRET ENDING ✨", width / 2, 80);

  // ---- Title ----
  fill(140, 100, 40);
  textSize(48);
  textStyle(BOLD);
  text("ENLIGHTENED", width / 2, 140);

  // ---- Achievement ----
  fill(160, 120, 60);
  textSize(20);
  text("Achievement Unlocked: True Wisdom", width / 2, 190);

  // ---- Narrative ----
  fill(60, 60, 60);
  textSize(18);
  textStyle(NORMAL);
  
  const lines = [
    "You realize something during the exam:",
    "",
    "Grades aren't everything.",
    "",
    "You helped people. You made connections.",
    "You kept your humanity intact.",
    "",
    "You got an A, but honestly?",
    "You'd be okay either way.",
    "",
    "Your friend texts: 'Thanks for this week.'",
    "",
    "You smile.",
    "",
    "Real wisdom isn't on the exam.",
  ];
  
  let yPos = 240;
  for (let line of lines) {
    text(line, width / 2, yPos);
    yPos += 26;
  }

  // ---- Final stats ----
  fill(140, 100, 60);
  textSize(16);
  text(`Final Mental Clarity: ${Math.round(mentalClarity)}/100 ✓`, width / 2, 610);
  text(`Helped Others: Yes ✓`, width / 2, 635);
  text(`Made Connections: Yes ✓`, width / 2, 660);

  // ---- Restart button ----
  const restartBtn = {
    x: width / 2,
    y: 730,
    w: 240,
    h: 60,
    label: "PLAY AGAIN",
  };

  drawEnlightenedButton(restartBtn);

  cursor(isHover(restartBtn) ? HAND : ARROW);
}

function drawEnlightenedButton({ x, y, w, h, label }) {
  rectMode(CENTER);
  
  const hover = isHover({ x, y, w, h });
  
  noStroke();
  
  // Golden glow effect
  if (hover) {
    fill(220, 180, 100, 240);
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = color(200, 150, 80);
  } else {
    fill(200, 160, 90, 220);
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = color(180, 140, 70);
  }
  
  rect(x, y, w, h, 10);
  
  drawingContext.shadowBlur = 0;
  
  fill(255);
  textSize(20);
  textAlign(CENTER, CENTER);
  text(label, x, y);
}
