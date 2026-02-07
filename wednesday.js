// ------------------------------------------------------------
// wednesday.js - Wednesday: Hidden Consequences Trigger
// ------------------------------------------------------------

function drawWednesday() {
  background(getBackgroundColor());

  // ---- Scene title ----
  fill(40, 40, 40);
  textSize(32);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text("Wednesday Afternoon", width / 2, 100);

  // ---- Scene description changes based on flags ----
  fill(60, 60, 60);
  textSize(17);
  textStyle(NORMAL);
  
  let lines = [
    "Midweek. You're somewhere between",
    "exhausted and caffeinated.",
    "",
    "Your friend texts:",
    '"I\'m freaking out. Study together?"',
  ];

  // Add bonus context if you made social connection
  if (socialConnection) {
    lines.push("");
    lines.push("(They mention bringing coffee!)");
  }
  
  let yPos = 150;
  for (let line of lines) {
    text(line, width / 2, yPos);
    yPos += 25;
  }

  // ---- Choice buttons ----
  const choice1 = {
    x: width / 2,
    y: 420,
    w: 600,
    h: 65,
    label: "Yes, study group (chaotic but helpful)",
  };

  const choice2 = {
    x: width / 2,
    y: 500,
    w: 600,
    h: 65,
    label: "Sorry, I need to focus solo",
  };

  const choice3 = {
    x: width / 2,
    y: 580,
    w: 600,
    h: 65,
    label: "Yes, but let's take a break first",
  };

  drawWednesdayButton(choice1);
  drawWednesdayButton(choice2);
  drawWednesdayButton(choice3);

  // Show hint about hidden consequences
  if (helpedStranger) {
    fill(100, 180, 100);
    textSize(14);
    text("(Your kindness earlier might pay off...)", width / 2, 665);
  }

  const anyHover = isHover(choice1) || isHover(choice2) || isHover(choice3);
  cursor(anyHover ? HAND : ARROW);
}

// Button drawing
function drawWednesdayButton({ x, y, w, h, label }) {
  rectMode(CENTER);
  
  const hover = isHover({ x, y, w, h });
  
  noStroke();
  
  if (hover) {
    fill(120, 140, 160, 220);
  } else {
    fill(140, 160, 180, 180);
  }
  
  rect(x, y, w, h, 10);
  
  fill(255);
  textSize(18);
  textAlign(CENTER, CENTER);
  text(label, x, y);
}

// Mouse input - hidden consequences activate here!
function wednesdayMousePressed() {
  const choice1 = { x: width / 2, y: 420, w: 600, h: 65 };
  const choice2 = { x: width / 2, y: 500, w: 600, h: 65 };
  const choice3 = { x: width / 2, y: 580, w: 600, h: 65 };

  if (isHover(choice1)) {
    // Study group
    changeMentalClarity(-10);
    changePrep(1);
    
    // HIDDEN CONSEQUENCE: If you helped the stranger in the library,
    // they show up and help you both!
    if (helpedStranger) {
      changeMentalClarity(5);  // Bonus mental clarity!
      // Show special message
      showSpecialMessage("The person you helped at the library shows up and helps explain a difficult concept. Karma!");
    }
    
    currentScreen = "thursday";
  } else if (isHover(choice2)) {
    // Solo focus
    changeMentalClarity(-5); // Guilt for saying no
    changePrep(2);    // But more efficient
    currentScreen = "thursday";
  } else if (isHover(choice3)) {
    // Take a break
    changeMentalClarity(5);
    
    // HIDDEN CONSEQUENCE: If you made a social connection,
    // they bring your favorite coffee!
    if (socialConnection) {
      changeMentalClarity(5); // Extra bonus!
      showSpecialMessage("They bring your favorite coffee! Human connection feels good.");
    }
    
    currentScreen = "thursday";
  }
}

// Helper to show special messages for hidden consequences
// (This is called from wednesdayMousePressed)
function showSpecialMessage(msg) {
  statChangeText = msg;
  statChangeTimer = 120; // Show for 2 seconds
}
