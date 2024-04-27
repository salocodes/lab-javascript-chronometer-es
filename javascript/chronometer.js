class Chronometer {
  constructor() {
    // ... your code goes here
    this.currentTime = 0;
    this.intervalId = null;
    this.milliIntervalId = null;
    this.millisecondsOffset = 0;
    this.milliCurrentTime = '00';
  }


  //start(callback) 
    
  start(printTimeMethod, printMillisecondsMethod) {
    const shouldPrintTime = typeof printTimeMethod === 'function';
    const shouldPrintMilliseconds =
      typeof printMillisecondsMethod === 'function';
    this.millisecondsOffset = new Date().getMilliseconds();

    this.intervalId = setInterval(() => {
      this.currentTime++;
      this.milliCurrentTime = '00';

      const [mm, ss, ms] = this.getMmSsMs();
      if (shouldPrintTime) {
        printTimeMethod(mm, ss, ms);
      }
      if (shouldPrintMilliseconds) {
        printMillisecondsMethod(this.milliCurrentTime);
      }
    }, 1000);

    this.milliIntervalId = setInterval(() => {
      this.milliCurrentTime = this.getCentiseconds();
      if (shouldPrintMilliseconds) {
        printMillisecondsMethod(this.milliCurrentTime);
      }
    }, 10);
  }
getMinutes() {
  return Math.floor(this.currentTime / 60);
}
getSeconds() {
  // ... your code goes here
  return this.currentTime % 60;
}

computeTwoDigitNumber(number) {
  return number.toString().padStart(2, '0');
}
stop() {
  clearInterval(this.intervalId);
  clearInterval(this.milliIntervalId);
}

reset() {
  this.currentTime = 0;
  this.milliCurrentTime = '00';
}
split() {

  const [mm, ss, ms] = this.getMmSsMs();
  return `${mm}:${ss}:${ms}`;
}

getMmSsMs() {
  return [
    this.computeTwoDigitNumber(this.getMinutes()),
    this.computeTwoDigitNumber(this.getSeconds()),
    this.milliCurrentTime
  ];
}

getCentiseconds() {
  const currentMilliseconds = new Date().getMilliseconds();
  const milliseconds = 1000 + currentMilliseconds - this.millisecondsOffset;
  return milliseconds.toString().substring(1, 3);
}

}
