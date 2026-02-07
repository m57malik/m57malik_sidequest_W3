// ------------------------------------------------------------
// library.js - Study at the Library
// ------------------------------------------------------------

function drawLibrary() {
  background(getBackgroundColor());

  // ---- Scene title ----
  fill(40, 40, 40);
  textSize(32);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text("The Library - 2:00 PM", width / 2, 100);

  // ---- Scene description ----
  fill(60, 60, 60);
  textSize(17);
  textStyle(NORMAL);
  
  const lines = [
    "The library is packed with desperate students.",
    "Every desk is taken. The air smells like coffee",
    "and existential dread.",
    "",
    "You find a spot near the bathrooms.",
    "You can hear someone crying in there.",
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
    y: 430,
    w: 600,
    h: 65,
    label: "Study for 6 hours straight (intense focus)",
  };

  const choice2 = {
    x: width / 2,
    y: 510,
    w: 600,
    h: 65,
    label: "Study for 3 hours with breaks (balanced)",
  };

  const choice3 = {
    x: width / 2,
    y: 590,
    w: 600,
    h: 65,
    label: "Check on the person crying (be kind)",
  };

  drawLibraryButton(choice1);
  drawLibraryButton(choice2);
  drawLibraryButton(choice3);

  // Show prep hint
  fill(100, 100, 100);
  textSize(13);
  text("(Your choices affect both sanity and exam preparation)", width / 2, 680);

  // Cursor feedback
  const anyHover = isHover(choice1) || isHover(choice2) || isHover(choice3);
  cursor(anyHover ? HAND : ARROW);
}

// Button drawing
function drawLibraryButton({ x, y, w, h, label }) {
  rectMode(CENTER);
  
  const hover = isHover({ x, y, w, h });
  
  noStroke();
  
  if (hover) {
    fill(120, 100, 140, 220);
  } else {
    fill(150, 130, 160, 180);
  }
  
  rect(x, y, w, h, 10);
  
  fill(255);
  textSize(18);
  textAlign(CENTER, CENTER);
  text(label, x, y);
}

// Mouse input
function libraryMousePressed() {
  const choice1 = { x: width / 2, y: 430, w: 600, h: 65 };
  const choice2 = { x: width / 2, y: 510, w: 600, h: 65 };
  const choice3 = { x: width / 2, y: 590, w: 600, h: 65 };

  if (isHover(choice1)) {
    // 6 hours straight - burnout begins
    changeMentalClarity(-10);
    changePrep(2);
    currentScreen = "midnight";
  } else if (isHover(choice2)) {
    // Balanced approach
    changeMentalClarity(-5);
    changePrep(1);
    currentScreen = "midnight";
  } else if (isHover(choice3)) {
    // Help the crying person - empathy is exhausting but meaningful
    changeMentalClarity(-15);
    helpedStranger = true; // This will matter later!
    currentScreen = "midnight";
  }
}
