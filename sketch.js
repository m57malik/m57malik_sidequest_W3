// ------------------------------------------------------------
// main.js - The Exam Week: Traffic controller + stat tracker
// ------------------------------------------------------------
//
// This file manages:
//   A) Global game state (current screen)
//   B) Player stats (sanity, prep level, flags)
//   C) Routing (drawing, mouse input, keyboard input)
//   D) Shared helper functions (buttons, sanity bar)

// ------------------------------
// Global game state
// ------------------------------
let currentScreen = "start";

// ------------------------------
// Player stats
// ------------------------------
let mentalClarity = 100;  // Main tracked stat (0-100)
let prepLevel = 0;        // Hidden prep score (affects exam outcome)

// Flags for hidden consequences
let hasSchedule = false;      // Did player make a schedule on Monday?
let helpedStranger = false;   // Did player help crying person in library?
let socialConnection = false; // Did player make social connection at coffee shop?

// For visual feedback
let statChangeText = "";      // Text to show when stats change
let statChangeTimer = 0;      // How long to show the feedback

// ------------------------------
// setup() runs ONCE at the beginning
// ------------------------------
function setup() {
  createCanvas(800, 800);
  textFont("sans-serif");
}

// ------------------------------
// draw() runs every frame
// ------------------------------
function draw() {
  // Route to the correct draw function based on current screen
  if (currentScreen === "start") drawStart();
  else if (currentScreen === "monday") drawMonday();
  else if (currentScreen === "library") drawLibrary();
  else if (currentScreen === "dorm") drawDorm();
  else if (currentScreen === "coffeeshop") drawCoffeeShop();
  else if (currentScreen === "midnight") drawMidnight();
  else if (currentScreen === "wednesday") drawWednesday();
  else if (currentScreen === "thursday") drawThursday();
  else if (currentScreen === "exam") drawExam();
  else if (currentScreen === "ending_burnout") drawEndingBurnout();
  else if (currentScreen === "ending_survivor") drawEndingSurvivor();
  else if (currentScreen === "ending_balanced") drawEndingBalanced();
  else if (currentScreen === "ending_enlightened") drawEndingEnlightened();

  // Draw mental clarity bar on all screens except start and endings
  if (
    currentScreen !== "start" &&
    !currentScreen.startsWith("ending_")
  ) {
    drawMentalClarityBar();
  }

  // Show stat change feedback if active
  if (statChangeTimer > 0) {
    drawStatFeedback();
    statChangeTimer--;
  }
}

// ------------------------------
// mousePressed() routing
// ------------------------------
function mousePressed() {
  if (currentScreen === "start") startMousePressed();
  else if (currentScreen === "monday") mondayMousePressed();
  else if (currentScreen === "library") libraryMousePressed();
  else if (currentScreen === "dorm") dormMousePressed();
  else if (currentScreen === "coffeeshop") coffeeShopMousePressed();
  else if (currentScreen === "midnight") midnightMousePressed();
  else if (currentScreen === "wednesday") wednesdayMousePressed();
  else if (currentScreen === "thursday") thursdayMousePressed();
  else if (currentScreen === "exam") examMousePressed?.();
  else if (currentScreen === "ending_burnout") endingMousePressed?.();
  else if (currentScreen === "ending_survivor") endingMousePressed?.();
  else if (currentScreen === "ending_balanced") endingMousePressed?.();
  else if (currentScreen === "ending_enlightened") endingMousePressed?.();
}

// ------------------------------
// keyPressed() routing
// ------------------------------
function keyPressed() {
  if (currentScreen === "start") startKeyPressed();
  else if (currentScreen === "monday") mondayKeyPressed?.();
  else if (currentScreen === "library") libraryKeyPressed?.();
  else if (currentScreen === "dorm") dormKeyPressed?.();
  else if (currentScreen === "coffeeshop") coffeeShopKeyPressed?.();
  else if (currentScreen === "midnight") midnightKeyPressed?.();
  else if (currentScreen === "wednesday") wednesdayKeyPressed?.();
  else if (currentScreen === "thursday") thursdayKeyPressed?.();
  else if (currentScreen === "exam") examKeyPressed?.();
  else if (currentScreen === "ending_burnout") endingKeyPressed?.();
  else if (currentScreen === "ending_survivor") endingKeyPressed?.();
  else if (currentScreen === "ending_balanced") endingKeyPressed?.();
  else if (currentScreen === "ending_enlightened") endingKeyPressed?.();
}

// ------------------------------------------------------------
// Shared helper: isHover()
// ------------------------------------------------------------
function isHover({ x, y, w, h }) {
  return (
    mouseX > x - w / 2 &&
    mouseX < x + w / 2 &&
    mouseY > y - h / 2 &&
    mouseY < y + h / 2
  );
}

// ------------------------------------------------------------
// Shared helper: changeMentalClarity()
// ------------------------------------------------------------
// Call this whenever you want to change the player's mental clarity
// It handles clamping (keeping value between 0-100) and visual feedback
function changeMentalClarity(amount) {
  mentalClarity += amount;
  
  // Clamp mental clarity between 0 and 100
  if (mentalClarity > 100) mentalClarity = 100;
  if (mentalClarity < 0) mentalClarity = 0;

  // Set up visual feedback
  if (amount > 0) {
    statChangeText = "+" + amount + " MENTAL CLARITY";
  } else if (amount < 0) {
    statChangeText = amount + " MENTAL CLARITY";
  }
  statChangeTimer = 45; // Show for 45 frames (0.75 seconds at 60fps)
}

// ------------------------------------------------------------
// Shared helper: changePrep()
// ------------------------------------------------------------
function changePrep(amount) {
  prepLevel += amount;
  // Prep can go negative if player makes bad choices
}

// ------------------------------------------------------------
// Visual: drawMentalClarityBar()
// ------------------------------------------------------------
// Draws the mental clarity bar at the top of the screen
function drawMentalClarityBar() {
  push();
  
  // Larger, more prominent position - centered at top
  let barX = width / 2;
  let barY = 60;
  let barW = 650;
  let barH = 45;
  
  // Background for bar
  fill(30, 30, 40);
  noStroke();
  rectMode(CENTER);
  rect(barX, barY, barW, barH, 8);

  // Determine color based on mental clarity level
  let barColor;
  if (mentalClarity > 70) {
    barColor = color(100, 220, 100); // Green
  } else if (mentalClarity > 40) {
    barColor = color(220, 220, 100); // Yellow
  } else if (mentalClarity > 20) {
    barColor = color(220, 150, 100); // Orange
  } else {
    barColor = color(220, 100, 100); // Red
  }

  // The actual bar (grows from left)
  let barWidth = map(mentalClarity, 0, 100, 0, barW - 8);
  rectMode(CORNER);
  fill(barColor);
  rect(barX - barW / 2 + 4, barY - barH / 2 + 4, barWidth, barH - 8, 6);

  // Text label - larger and more prominent
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(22);
  textStyle(BOLD);
  text("MENTAL CLARITY: " + Math.round(mentalClarity) + "%", barX, barY);

  pop(); // This resets all drawing states including rectMode
}

// ------------------------------------------------------------
// Visual: drawStatFeedback()
// ------------------------------------------------------------
// Shows floating text when stats change
function drawStatFeedback() {
  push();
  
  // Calculate opacity based on timer (fade out)
  let alpha = map(statChangeTimer, 0, 45, 0, 255);
  
  // Move text upward over time
  let yPos = map(statChangeTimer, 45, 0, 130, 100);

  // Determine color based on positive or negative change
  let feedbackColor;
  if (statChangeText.includes("+")) {
    feedbackColor = color(100, 255, 100, alpha); // Bright green for positive
  } else if (statChangeText.includes("-")) {
    feedbackColor = color(255, 100, 100, alpha); // Bright red for negative
  } else {
    feedbackColor = color(255, 255, 255, alpha); // White for neutral
  }

  fill(feedbackColor);
  textAlign(CENTER, CENTER);
  textSize(28);
  textStyle(BOLD);
  
  // Add visual indicator
  let prefix = "";
  if (statChangeText.includes("+")) {
    prefix = "▲ ";
  } else if (statChangeText.includes("-")) {
    prefix = "▼ ";
  }
  
  text(prefix + statChangeText, width / 2, yPos);

  pop();
}

// ------------------------------------------------------------
// Helper: getBackgroundColor()
// ------------------------------------------------------------
// Returns background color based on current mental clarity level
// This creates visual atmosphere that reflects mental state
function getBackgroundColor() {
  if (mentalClarity > 70) {
    return color(220, 240, 220); // Light green tint (calm)
  } else if (mentalClarity > 40) {
    return color(240, 240, 210); // Light yellow (stressed)
  } else if (mentalClarity > 20) {
    return color(240, 220, 200); // Light orange (very stressed)
  } else {
    return color(240, 210, 210); // Light red (critical)
  }
}

// ------------------------------------------------------------
// Helper: drawButton()
// ------------------------------------------------------------
// Standard button drawing helper used across multiple screens
function drawButton({ x, y, w, h, label }) {
  rectMode(CENTER);
  
  const hover = isHover({ x, y, w, h });
  
  noStroke();
  
  // Button color changes on hover
  if (hover) {
    fill(100, 150, 200, 220);
  } else {
    fill(120, 160, 200, 180);
  }
  
  rect(x, y, w, h, 12);
  
  // Button text
  fill(255);
  textSize(20);
  textAlign(CENTER, CENTER);
  text(label, x, y);
}

// ------------------------------------------------------------
// Helper: resetGame()
// ------------------------------------------------------------
// Resets all stats to starting values
function resetGame() {
  mentalClarity = 100;
  prepLevel = 0;
  hasSchedule = false;
  helpedStranger = false;
  socialConnection = false;
  currentScreen = "start";
}
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
// ------------------------------------------------------------
// midnight.js - Midnight Crisis (all paths converge here)
// ------------------------------------------------------------

function drawMidnight() {
  background(getBackgroundColor());

  // ---- Clock display (creates urgency) ----
  fill(200, 80, 80);
  textSize(48);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text("11:47 PM", width / 2, 100);

  // ---- Scene description ----
  fill(60, 60, 60);
  textSize(18);
  textStyle(NORMAL);
  
  const lines = [
    "Monday night. You've studied some.",
    "",
    "But is it enough?",
    "",
    "Your brain is tired. Your eyes hurt.",
    "Four more days of this."
  ];
  
  let yPos = 170;
  for (let line of lines) {
    text(line, width / 2, yPos);
    yPos += 28;
  }

  // Different choices based on current mental clarity level
  if (mentalClarity > 50) {
    drawHighMentalClarityChoices();
  } else if (mentalClarity >= 25) {
    drawMediumMentalClarityChoices();
  } else {
    drawLowMentalClarityChoices();
  }

  // Mental clarity warning if low
  if (mentalClarity < 30) {
    fill(200, 80, 80);
    textSize(14);
    text("(Your mental clarity is critically low)", width / 2, 680);
  }
}

// High mental clarity choices (rational decisions)
function drawHighMentalClarityChoices() {
  fill(80, 80, 80);
  textSize(16);
  textAlign(CENTER, CENTER);
  text("You feel relatively in control.", width / 2, 340);

  const choice1 = {
    x: width / 2,
    y: 420,
    w: 550,
    h: 65,
    label: "Sleep 8 hours (healthy choice)",
  };

  const choice2 = {
    x: width / 2,
    y: 500,
    w: 550,
    h: 65,
    label: "Sleep 6 hours, study 2 more",
  };

  const choice3 = {
    x: width / 2,
    y: 580,
    w: 550,
    h: 65,
    label: "Study until 2 AM (push yourself)",
  };

  drawMidnightButton(choice1, true);
  drawMidnightButton(choice2, true);
  drawMidnightButton(choice3, true);

  const anyHover = isHover(choice1) || isHover(choice2) || isHover(choice3);
  cursor(anyHover ? HAND : ARROW);
}

// Medium mental clarity choices (stress showing)
function drawMediumMentalClarityChoices() {
  fill(120, 100, 80);
  textSize(16);
  textAlign(CENTER, CENTER);
  text("You're getting stressed...", width / 2, 340);

  const choice1 = {
    x: width / 2,
    y: 420,
    w: 550,
    h: 65,
    label: "Try to sleep (anxiety might keep you up)",
  };

  const choice2 = {
    x: width / 2,
    y: 500,
    w: 550,
    h: 65,
    label: "Coffee and grind (risky)",
  };

  const choice3 = {
    x: width / 2,
    y: 580,
    w: 550,
    h: 65,
    label: "Stress eat and study",
  };

  drawMidnightButton(choice1, false);
  drawMidnightButton(choice2, false);
  drawMidnightButton(choice3, false);

  const anyHover = isHover(choice1) || isHover(choice2) || isHover(choice3);
  cursor(anyHover ? HAND : ARROW);
}

// Low mental clarity choices (desperation)
function drawLowMentalClarityChoices() {
  fill(180, 80, 80);
  textSize(16);
  textAlign(CENTER, CENTER);
  text("Everything is falling apart.", width / 2, 340);

  const choice1 = {
    x: width / 2,
    y: 420,
    w: 550,
    h: 65,
    label: "Stare at the ceiling (dissociate)",
  };

  const choice2 = {
    x: width / 2,
    y: 500,
    w: 550,
    h: 65,
    label: "Cry in the shower (let it out)",
  };

  const choice3 = {
    x: width / 2,
    y: 580,
    w: 550,
    h: 65,
    label: "Study through tears (desperation)",
  };

  drawMidnightButton(choice1, false);
  drawMidnightButton(choice2, false);
  drawMidnightButton(choice3, false);

  const anyHover = isHover(choice1) || isHover(choice2) || isHover(choice3);
  cursor(anyHover ? HAND : ARROW);
}

// Button drawing (changes style based on mental clarity level)
function drawMidnightButton({ x, y, w, h, label }, isHealthy) {
  rectMode(CENTER);
  
  const hover = isHover({ x, y, w, h });
  
  noStroke();
  
  if (isHealthy) {
    fill(hover ? 100 : 120, hover ? 140 : 160, hover ? 100 : 120, 200);
  } else {
    fill(hover ? 140 : 160, hover ? 100 : 120, hover ? 80 : 100, 200);
  }
  
  rect(x, y, w, h, 10);
  
  fill(255);
  textSize(18);
  textAlign(CENTER, CENTER);
  text(label, x, y);
}

// Mouse input - handles all three mental clarity tiers
function midnightMousePressed() {
  const choice1 = { x: width / 2, y: 420, w: 550, h: 65 };
  const choice2 = { x: width / 2, y: 500, w: 550, h: 65 };
  const choice3 = { x: width / 2, y: 580, w: 550, h: 65 };

  if (mentalClarity > 50) {
    // High mental clarity choices
    if (isHover(choice1)) {
      changeMentalClarity(10);  // 8 hours sleep
      currentScreen = "wednesday";
    } else if (isHover(choice2)) {
      changeMentalClarity(-5);  // 6 hours + study
      changePrep(1);
      currentScreen = "wednesday";
    } else if (isHover(choice3)) {
      changeMentalClarity(-15); // Study till 2 AM
      changePrep(2);
      currentScreen = "wednesday";
    }
  } else if (mentalClarity >= 25) {
    // Medium mental clarity choices
    if (isHover(choice1)) {
      changeMentalClarity(5);   // Try to sleep
      currentScreen = "wednesday";
    } else if (isHover(choice2)) {
      changeMentalClarity(-10); // Coffee and grind
      changePrep(2);
      currentScreen = "wednesday";
    } else if (isHover(choice3)) {
      changeMentalClarity(-5);  // Stress eat
      changePrep(1);
      currentScreen = "wednesday";
    }
  } else {
    // Low mental clarity choices
    if (isHover(choice1)) {
      // Stare at ceiling - no change
      currentScreen = "wednesday";
    } else if (isHover(choice2)) {
      changeMentalClarity(5);   // Cry (cathartic)
      currentScreen = "wednesday";
    } else if (isHover(choice3)) {
      changeMentalClarity(-15); // Study through tears
      changePrep(3);     // Desperation bonus
      currentScreen = "wednesday";
    }
  }
}
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
// ------------------------------------------------------------
// thursday.js - Thursday: Final Cramming
// ------------------------------------------------------------

function drawThursday() {
  background(getBackgroundColor());

  // ---- Urgent visual ----
  push();
  // Pulsing effect if mental clarity is low
  if (mentalClarity < 30) {
    let pulse = sin(frameCount * 0.1) * 10 + 245;
    background(pulse, 210, 210);
  }
  pop();

  // ---- Scene title ----
  fill(40, 40, 40);
  textSize(32);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text("Thursday Night", width / 2, 100);

  // ---- Urgency indicator ----
  fill(200, 80, 80);
  textSize(20);
  text("⚠️ EXAM TOMORROW ⚠️", width / 2, 145);

  // ---- Scene description ----
  fill(60, 60, 60);
  textSize(17);
  textStyle(NORMAL);
  
  const lines = [
    "This is it. Last chance to prepare.",
    "",
    "Your notes are scattered across your desk.",
    "Some of them don't even make sense anymore.",
    "",
    "What's your final move?"
  ];
  
  let yPos = 190;
  for (let line of lines) {
    text(line, width / 2, yPos);
    yPos += 28;
  }

  // ---- Choice buttons (some conditional) ----
  let choiceY = 390;
  const choices = [];

  // Special choice if you made a schedule on Monday
  if (hasSchedule) {
    choices.push({
      x: width / 2,
      y: choiceY,
      w: 600,
      h: 65,
      label: "Review everything (your schedule helps!)",
      id: "schedule",
    });
    choiceY += 80;
  }

  choices.push({
    x: width / 2,
    y: choiceY,
    w: 600,
    h: 65,
    label: "Focus on weak areas (strategic)",
    id: "focus",
  });
  choiceY += 80;

  choices.push({
    x: width / 2,
    y: choiceY,
    w: 600,
    h: 65,
    label: "Pray to the curve gods (cope)",
    id: "pray",
  });
  choiceY += 80;

  choices.push({
    x: width / 2,
    y: choiceY,
    w: 600,
    h: 65,
    label: "Accept your fate, rest instead (wise?)",
    id: "rest",
  });

  // Draw all buttons
  for (let choice of choices) {
    drawThursdayButton(choice);
  }

  // Store choices for mouse handler
  window.thursdayChoices = choices;

  // Cursor feedback
  let anyHover = false;
  for (let choice of choices) {
    if (isHover(choice)) anyHover = true;
  }
  cursor(anyHover ? HAND : ARROW);
}

// Button drawing with intensity based on mental clarity
function drawThursdayButton({ x, y, w, h, label }) {
  rectMode(CENTER);
  
  const hover = isHover({ x, y, w, h });
  
  noStroke();
  
  // Color changes based on mental clarity level
  let r, g, b;
  if (mentalClarity > 50) {
    r = hover ? 100 : 120;
    g = hover ? 140 : 160;
    b = hover ? 180 : 200;
  } else {
    r = hover ? 180 : 200;
    g = hover ? 140 : 160;
    b = hover ? 100 : 120;
  }
  
  fill(r, g, b, 200);
  rect(x, y, w, h, 10);
  
  fill(255);
  textSize(18);
  textAlign(CENTER, CENTER);
  text(label, x, y);
}

// Mouse input
function thursdayMousePressed() {
  const choices = window.thursdayChoices;
  
  for (let choice of choices) {
    if (isHover(choice)) {
      if (choice.id === "schedule") {
        // Review everything with schedule
        changeMentalClarity(-10);
        changePrep(3);
        currentScreen = "exam";
      } else if (choice.id === "focus") {
        // Focus on weak areas
        changeMentalClarity(-15);
        changePrep(2);
        currentScreen = "exam";
      } else if (choice.id === "pray") {
        // Pray to the curve
        // No stat changes, just humor
        currentScreen = "exam";
      } else if (choice.id === "rest") {
        // Rest instead
        changeMentalClarity(15);
        // No prep change
        currentScreen = "exam";
      }
      break;
    }
  }
}
// ------------------------------------------------------------
// exam.js - Friday: The Exam (narrative, no choices)
// ------------------------------------------------------------

let examTimer = 0;
let examPhase = 0;

function drawExam() {
  background(240, 240, 235);

  // Initialize timer on first frame
  if (examTimer === 0) {
    examPhase = 0;
  }
  examTimer++;

  // ---- Header ----
  fill(40, 40, 40);
  textSize(36);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text("Friday Morning: The Exam", width / 2, 80);

  // ---- Time pressure indicator ----
  fill(180, 80, 80);
  textSize(20);
  text("⏱️ 3 HOURS REMAINING ⏱️", width / 2, 130);

  // The exam unfolds in phases (automatic narrative)
  if (examTimer < 120) {
    examPhase = 0; // Walking in
  } else if (examTimer < 240) {
    examPhase = 1; // First questions
  } else if (examTimer < 360) {
    examPhase = 2; // Mid-exam
  } else if (examTimer < 480) {
    examPhase = 3; // Final push
  } else {
    examPhase = 4; // Done - calculate ending
  }

  // Draw current phase
  if (examPhase === 0) {
    drawPhase0();
  } else if (examPhase === 1) {
    drawPhase1();
  } else if (examPhase === 2) {
    drawPhase2();
  } else if (examPhase === 3) {
    drawPhase3();
  } else {
    calculateEnding();
  }

  // Progress indicator
  fill(100);
  textSize(14);
  text("(The exam unfolds automatically...)", width / 2, 750);
}

function drawPhase0() {
  fill(60, 60, 60);
  textSize(18);
  textAlign(CENTER, CENTER);
  
  const lines = [
    "You walk into the exam hall.",
    "",
    "The fluorescent lights are too bright.",
    "Someone is already crying.",
    "",
    "You find your seat.",
  ];
  
  let yPos = 250;
  for (let line of lines) {
    text(line, width / 2, yPos);
    yPos += 35;
  }
}

function drawPhase1() {
  fill(60, 60, 60);
  textSize(18);
  textAlign(CENTER, CENTER);
  
  let lines = [
    "Question 1:",
    "",
  ];

  if (prepLevel > 3) {
    lines.push("You know this. You actually studied this.");
    lines.push("Your preparation is paying off.");
  } else if (prepLevel > 0) {
    lines.push("This looks... familiar?");
    lines.push("You think you studied this.");
  } else {
    lines.push("You have never seen this before in your life.");
    lines.push("Is this even the right exam?");
  }
  
  let yPos = 250;
  for (let line of lines) {
    text(line, width / 2, yPos);
    yPos += 35;
  }
}

function drawPhase2() {
  fill(60, 60, 60);
  textSize(18);
  textAlign(CENTER, CENTER);
  
  let lines = [
    "Halfway through.",
    "",
  ];

  if (mentalClarity > 60) {
    lines.push("You're doing okay. Staying calm.");
    lines.push("Your mental clarity is helping.");
  } else if (mentalClarity > 30) {
    lines.push("Your hand is cramping.");
    lines.push("The words are starting to blur.");
  } else {
    lines.push("Is that your grandmother in the corner?");
    lines.push("No, wait. Just a coat rack.");
    lines.push("Your brain is not okay.");
  }
  
  let yPos = 250;
  for (let line of lines) {
    text(line, width / 2, yPos);
    yPos += 35;
  }
}

function drawPhase3() {
  fill(60, 60, 60);
  textSize(18);
  textAlign(CENTER, CENTER);
  
  const lines = [
    "Final question.",
    "",
    "You write something.",
    "You're not sure if it makes sense.",
    "",
    "Time's up.",
  ];
  
  let yPos = 250;
  for (let line of lines) {
    text(line, width / 2, yPos);
    yPos += 35;
  }
}

function calculateEnding() {
  // Determine ending based on mental clarity level and hidden bonus
  // Check for secret ending first
  if (mentalClarity >= 76 && helpedStranger && socialConnection) {
    currentScreen = "ending_enlightened";
  } else if (mentalClarity >= 51) {
    currentScreen = "ending_balanced";
  } else if (mentalClarity >= 26) {
    currentScreen = "ending_survivor";
  } else {
    currentScreen = "ending_burnout";
  }
  
  // Reset exam timer for next playthrough
  examTimer = 0;
}

// Allow clicking to skip if player wants
function examMousePressed() {
  if (examPhase < 4) {
    examPhase = 4; // Skip to ending calculation
    examTimer = 480;
  }
}
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
