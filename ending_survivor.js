// ------------------------------------------------------------
// ending_survivor.js - The Survivor Ending (sanity 26-50)
// ------------------------------------------------------------

function drawEndingSurvivor() {
  // Muted colors - exhausted but alive
  background(220, 220, 200);

  // ---- Title ----
  fill(80, 80, 60);
  textSize(48);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text("SURVIVOR", width / 2, 120);

  // ---- Achievement ----
  fill(120, 120, 100);
  textSize(20);
  text("Achievement Unlocked: Survived Finals", width / 2, 170);

  // ---- Narrative ----
  fill(60, 60, 60);
  textSize(18);
  textStyle(NORMAL);
  
  const lines = [
    "You limp out of the exam hall.",
    "",
    "Your friend asks how it went.",
    "You laugh, but it sounds wrong.",
    "",
    "You sleep for 16 hours.",
    "You wake up and don't remember your own name",
    "for a solid 30 seconds.",
    "",
    "You got a B.",
    "",
    "It's fine. Everything's fine.",
  ];
  
  let yPos = 230;
  for (let line of lines) {
    text(line, width / 2, yPos);
    yPos += 28;
  }

  // ---- Final stats ----
  fill(100, 100, 80);
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

  drawSurvivorButton(restartBtn);

  cursor(isHover(restartBtn) ? HAND : ARROW);
}

function drawSurvivorButton({ x, y, w, h, label }) {
  rectMode(CENTER);
  
  const hover = isHover({ x, y, w, h });
  
  noStroke();
  fill(hover ? 140 : 160, hover ? 140 : 160, hover ? 120 : 140, 200);
  rect(x, y, w, h, 10);
  
  fill(255);
  textSize(20);
  textAlign(CENTER, CENTER);
  text(label, x, y);
}
