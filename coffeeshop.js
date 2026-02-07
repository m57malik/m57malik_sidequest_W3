// ------------------------------------------------------------
// coffeeshop.js - Study at the Coffee Shop
// ------------------------------------------------------------

function drawCoffeeShop() {
  background(getBackgroundColor());

  // ---- Scene title ----
  fill(40, 40, 40);
  textSize(32);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text("Local Coffee Shop - 2:00 PM", width / 2, 100);

  // ---- Scene description ----
  fill(60, 60, 60);
  textSize(17);
  textStyle(NORMAL);
  
  const lines = [
    "The coffee shop has that perfect study ambiance.",
    "Lo-fi beats. The smell of espresso. Aesthetic.",
    "",
    "You spot someone from your program.",
    "They look up and smile.",
    "",
    "Your $7 latte arrives. Worth it?",
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
    label: "Order coffee and focus on studying",
  };

  const choice2 = {
    x: width / 2,
    y: 530,
    w: 600,
    h: 65,
    label: "Look studious, actually daydream",
  };

  const choice3 = {
    x: width / 2,
    y: 610,
    w: 600,
    h: 65,
    label: "Strike up a conversation",
  };

  drawCoffeeButton(choice1);
  drawCoffeeButton(choice2);
  drawCoffeeButton(choice3);

  // Cursor feedback
  const anyHover = isHover(choice1) || isHover(choice2) || isHover(choice3);
  cursor(anyHover ? HAND : ARROW);
}

// Button drawing
function drawCoffeeButton({ x, y, w, h, label }) {
  rectMode(CENTER);
  
  const hover = isHover({ x, y, w, h });
  
  noStroke();
  
  if (hover) {
    fill(160, 100, 80, 220);
  } else {
    fill(180, 140, 120, 180);
  }
  
  rect(x, y, w, h, 10);
  
  fill(255);
  textSize(18);
  textAlign(CENTER, CENTER);
  text(label, x, y);
}

// Mouse input
function coffeeShopMousePressed() {
  const choice1 = { x: width / 2, y: 450, w: 600, h: 65 };
  const choice2 = { x: width / 2, y: 530, w: 600, h: 65 };
  const choice3 = { x: width / 2, y: 610, w: 600, h: 65 };

  if (isHover(choice1)) {
    // Coffee and focus - caffeine helps
    changeMentalClarity(-3);
    changePrep(1);
    currentScreen = "midnight";
  } else if (isHover(choice2)) {
    // Daydreaming - wasted time but not stressful
    // No sanity or prep change
    currentScreen = "midnight";
  } else if (isHover(choice3)) {
    // Make a connection - human interaction is good for the soul!
    changeMentalClarity(10);
    changePrep(-1);  // But you lose study time
    socialConnection = true;  // This will matter later!
    currentScreen = "midnight";
  }
}
