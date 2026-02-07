// ------------------------------------------------------------
// dorm.js - Study in Your Dorm
// ------------------------------------------------------------

function drawDorm() {
  background(getBackgroundColor());

  // ---- Scene title ----
  fill(40, 40, 40);
  textSize(32);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text("Your Dorm Room - 2:00 PM", width / 2, 100);

  // ---- Scene description ----
  fill(60, 60, 60);
  textSize(17);
  textStyle(NORMAL);
  
  const lines = [
    "Your roommate is watching Netflix.",
    "It's the new season of that show you both love.",
    "",
    "Your desk is right there, but so is the couch.",
    "Your textbook feels heavier than usual.",
    "",
    "The opening theme song plays. It's so catchy.",
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
    h: 65,
    label: "Study at your desk (roommate is loud)",
  };

  const choice2 = {
    x: width / 2,
    y: 530,
    w: 600,
    h: 65,
    label: 'Join them for "just one episode"',
  };

  const choice3 = {
    x: width / 2,
    y: 610,
    w: 600,
    h: 65,
    label: "Wear headphones and enter the zone",
  };

  drawDormButton(choice1);
  drawDormButton(choice2);
  drawDormButton(choice3);

  // Cursor feedback
  const anyHover = isHover(choice1) || isHover(choice2) || isHover(choice3);
  cursor(anyHover ? HAND : ARROW);
}

// Button drawing
function drawDormButton({ x, y, w, h, label }) {
  rectMode(CENTER);
  
  const hover = isHover({ x, y, w, h });
  
  noStroke();
  
  if (hover) {
    fill(140, 120, 100, 220);
  } else {
    fill(160, 140, 120, 180);
  }
  
  rect(x, y, w, h, 10);
  
  fill(255);
  textSize(18);
  textAlign(CENTER, CENTER);
  text(label, x, y);
}

// Mouse input
function dormMousePressed() {
  const choice1 = { x: width / 2, y: 450, w: 600, h: 65 };
  const choice2 = { x: width / 2, y: 530, w: 600, h: 65 };
  const choice3 = { x: width / 2, y: 610, w: 600, h: 65 };

  if (isHover(choice1)) {
    // Study with distractions - frustrating
    changeMentalClarity(-8);
    changePrep(1);
    currentScreen = "midnight";
  } else if (isHover(choice2)) {
    // "Just one episode" (narrator: it was not just one episode)
    changeMentalClarity(5);  // Feels good in the moment
    changePrep(-1);   // But you lose prep time
    currentScreen = "midnight";
  } else if (isHover(choice3)) {
    // Focus mode - decent outcome
    changeMentalClarity(-5);
    changePrep(2);
    currentScreen = "midnight";
  }
}
