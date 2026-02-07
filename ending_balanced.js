// ------------------------------------------------------------
// ending_balanced.js - The Balanced Ending (sanity 51-75)
// ------------------------------------------------------------

function drawEndingBalanced() {
  // Normal, healthy colors
  background(220, 235, 220);

  // ---- Title ----
  fill(60, 100, 60);
  textSize(48);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text("BALANCED", width / 2, 120);

  // ---- Achievement ----
  fill(80, 140, 80);
  textSize(20);
  text("Achievement Unlocked: Actual Adult", width / 2, 170);

  // ---- Narrative ----
  fill(60, 60, 60);
  textSize(18);
  textStyle(NORMAL);
  
  const lines = [
    "You walk out feeling... okay?",
    "",
    "You studied enough. You slept enough.",
    "You even had a conversation with a human being",
    "this week.",
    "",
    "You got an A-.",
    "",
    "More importantly, you still remember",
    "what joy feels like.",
    "",
    "Wild.",
  ];
  
  let yPos = 230;
  for (let line of lines) {
    text(line, width / 2, yPos);
    yPos += 28;
  }

  // ---- Final stats ----
  fill(80, 120, 80);
  textSize(16);
  text(`Final Mental Clarity: ${Math.round(mentalClarity)}/100`, width / 2, 580);
  text(`Preparation Level: ${prepLevel}`, width / 2, 610);

  // ---- Restart button ----
  const restartBtn = {
    x: width / 2,
    y: 690,
    w: 240,
    h: 60,
    label: "PLAY AGAIN",
  };

  drawBalancedButton(restartBtn);

  cursor(isHover(restartBtn) ? HAND : ARROW);
}

function drawBalancedButton({ x, y, w, h, label }) {
  rectMode(CENTER);
  
  const hover = isHover({ x, y, w, h });
  
  noStroke();
  fill(hover ? 120 : 140, hover ? 180 : 200, hover ? 120 : 140, 220);
  rect(x, y, w, h, 10);
  
  fill(255);
  textSize(20);
  textAlign(CENTER, CENTER);
  text(label, x, y);
}
