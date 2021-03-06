// Setup initial game stats
var score = 0;
var lives = 2;
var dots = 240;
var powerPellets = 4;
var victory = ['ᗧ .   .   .   .             ', '  O   .   .   .           ', '    ᗧ .   .   .         ','      O   .   .       ','        ᗧ .   .     ','          O   .   ','            ᗧ . ','             O','             ᗧ  You','             O  You Win','             ᗧ  You Win!','             O  You Win!!','             ᗧ  You Win!!!','             O  You Win!!!!'];


// Define your ghosts here

var inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'red',
  character: 'shadowy',
  edible: false
};

var blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'cyan',
  character: 'speedy',
  edible: false
};

var pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'pink',
  character: 'bashful',
  edible: false
};

var clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'orange',
  character: 'pokey',
  edible: false
};

var ghosts = [inky, blinky, pinky, clyde]


// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Extra Lives: ' + lives);
  console.log('\nPower Pellets: ' + powerPellets);
  console.log ('\nDots: ' + dots);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  console.log('(p) Eat Power-Pellet');
  console.log('(1) Eat ' + ghosts[0].name + isGhostEdible(inky));
  console.log('(2) Eat ' + ghosts[1].name + isGhostEdible(blinky));
  console.log('(3) Eat ' + ghosts[2].name + isGhostEdible(pinky));
  console.log('(4) Eat ' + ghosts[3].name + isGhostEdible(clyde));
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}

// Menu Options
function eatDot() {
  if (dots >= 2) {
  console.log('\nChomp!');
  console.log('\n 10 points!')
  dots -= 1;
  score += 10;
  } else {
    dots -= 1;
    for (i = 0; i < victory.length; i++) {
      victoryMessage(i);
    }
    setTimeout(function () {
      process.exit()
    }, 500*victory.length + 100);
  }
}

function victoryMessage(i) {
  setTimeout(function () {
    process.stdout.write("\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b");
    process.stdout.write(victory[i]);
  }, 500*i);
}


function eatGhost(ghost) {
  if (ghost.edible === false) {
    lives -= 1;
    console.log('\nPac-Man has been eaten by ' + ghost.name + ' the ' + ghost.colour + ' ghost!');
  } else {
    score += 200;
    console.log('\nPac-Man has eaten ' + ghost.name + ' the ' + ghost.character + ' ghost!');
    console.log('\n 200 points!');
    ghost.edible = false;
  }
  if (lives < 0) {
    console.log('\nPac-Man is out of lives! You LOSE! Good DAY sir!');
    process.exit();
  }
}

function eatPowerPellet(ghost) {
  if (powerPellets > 0) {
     score += 50;
     powerPellets -= 1;
     ghosts.forEach(function(ghost) {
       ghost.edible = true;
     });
     console.log('\nvoop Voop VOOP! All ghosts now edible!');
     console.log('\n 50 points!');}

  else {
     console.log('\n No Power-Pellets Left!')
   }
}

function isGhostEdible(ghost) {
  if (ghost.edible) {
    return '(status: edible)';
  } else {
    return '(status: inedible)';
  }
}



/* function printGhosts() {
  console.log(ghosts);
} just playing with functions, cases and and arrays */

// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case '1':
      eatGhost(inky);
      break;
    case '2':
      eatGhost(blinky);
      break;
    case '3':
      eatGhost(pinky);
      break;
    case '4':
      eatGhost(clyde);
      break;
    case 'p':
      eatPowerPellet();
      break;
    case 't':
      eatTenDots();
      break;
    case 'h':
      eatHundredDots();
      break;
  /*  case 'g':
      printGhosts();
      break; */
    default:
      console.log('\nInvalid Command!');
  }
}

//CHEAT CODES

function eatTenDots() {
  if (dots >= 11) {
  console.log('\nChomp!');
  console.log('\n 100 points!')
  dots -= 10;
  score += 100;
  } else {
    dots -= 10;
    for (i = 0; i < victory.length; i++) {
      victoryMessage(i);
    }
    setTimeout(function () {
    process.exit()
    }, 500*victory.length + 100);
  }
}

function eatHundredDots() {
  if (dots >= 101) {
  console.log('\nChomp!');
  console.log('\n 10000 points!')
  dots -= 100;
  score += 1000;
} else {
  dots -= 100;
  for (i = 0; i < victory.length; i++) {
    victoryMessage(i);
  }
  setTimeout(function () {
  process.exit()
  }, 500*victory.length + 100);
}
}



//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 400); // The command prompt will flash a message for 400 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
