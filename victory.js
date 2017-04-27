var victory = ['ᗧ .   .   .   .             ', '  O   .   .   .           ', '    ᗧ .   .   .         ','      O   .   .       ','        ᗧ .   .     ','          O   .   ','            ᗧ . ','             O','             ᗧ  You','             O  You Win','             ᗧ  You Win!','             O  You Win!!','             ᗧ  You Win!!!','             O  You Win!!!!'];

function victoryMessage(i) {
  setTimeout(function () {
    process.stdout.write("\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b");
    process.stdout.write(victory[i]);
  }, 500*i);
}

  for (i = 0; i < victory.length; i++) {
    victoryMessage(i);
  }
