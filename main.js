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
