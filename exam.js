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
