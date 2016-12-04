/*
 * Blank IoT Node.js starter app.
 *
 * Use this template to start an IoT Node.js app on any supported IoT board.
 * The target board must support Node.js. It is helpful if the board includes
 * support for I/O access via the MRAA and UPM libraries.
 *
 * https://software.intel.com/en-us/xdk/docs/lp-xdk-iot
 */


// keep /*jslint and /*jshint lines for proper jshinting and jslinting
// see http://www.jslint.com/help.html and http://jshint.com/docs
/* jslint node:true */
/* jshint unused:true */

"use strict" ;


var mraa = require("mraa") ;

// add any UPM requires that you need
// and the rest of your app goes here
// see the samples for more detailed examples

console.log(mraa) ;     // prints mraa object to XDK IoT debug output panel

// Load Grove module
var groveSensor = require('jsupm_grove');

// Create the temperature sensor object using AIO pin 0
var temp = new groveSensor.GroveTemp(0);
console.log(temp.name());

// Read the temperature ten times, printing both the Celsius and
// equivalent Fahrenheit temperature, waiting one second between readings
var i = 0;
var waiting = setInterval(function() {
        var celsius = temp.value();
        var fahrenheit = celsius * 9.0/5.0 + 32.0;
        console.log(celsius + " degrees Celsius, or " +
            Math.round(fahrenheit) + " degrees Fahrenheit");
        i++;
        if (i == 5) clearInterval(waiting);
        }, 1000);
/////////////////////////////////////////////////////
//Buzzer
////////////////////////////////////////////////////
var upmBuzzer = require("jsupm_buzzer");// Initialize on GPIO 5
var myBuzzer = new upmBuzzer.Buzzer(5);
var chords = [];
chords.push(upmBuzzer.DO);
chords.push(upmBuzzer.RE);
chords.push(upmBuzzer.MI);
chords.push(upmBuzzer.FA);
chords.push(upmBuzzer.SOL);
chords.push(upmBuzzer.LA);
chords.push(upmBuzzer.SI);
chords.push(upmBuzzer.DO);
chords.push(upmBuzzer.SI);
var chordIndex = 0;

// Print sensor name
console.log(myBuzzer.name());

function melody()
{
    if (temp.value() > 24)
    {
        //Play sound for one second
        console.log( myBuzzer.playSound(chords[chordIndex], 100000) );
        chordIndex++;
        //Reset the sound to start from the beginning. 
        if (chordIndex > chords.length - 1)
			chordIndex = 0;
    }
}
setInterval(melody, 100);

// Print message when exiting
process.on('SIGINT', function()
{
	console.log("Exiting...");
	process.exit(0);
});

////////////////////////////////////////////////
//Light Sensor
///////////////////////////////////////////////
// Load Grove module
var groveSensor = require('jsupm_grove');

// Create the light sensor object using AIO pin 0
var light = new groveSensor.GroveLight(1);

// Read the input and print both the raw value and a rough lux value,
//Go here to reference expected lux values under different daylight conditions: https://en.wikipedia.org/wiki/Daylight
// waiting one second between readings
function readLightSensorValue() {
    console.log(light.name() + " raw value is " + light.raw_value() +
            ", which is roughly " + light.value() + " lux");
}
setInterval(readLightSensorValue, 1000);