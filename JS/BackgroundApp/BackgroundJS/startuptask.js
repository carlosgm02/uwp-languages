// This is the code that will run in the startup task

(function () {
    "use strict";   

    // Basic console log
    console.log("New Background app here!");

    // This is Windows IoT
    var mystring = "Windows";
    console.log(mystring);
    var newstring = "10 IoT";
    console.log(newstring);

    // One + Two = Three
    var three = 1 + 2;
    console.log(three);

    // Statements in a variable
    var here = "buy me",
        now = "buy me too";

    // The classic Hello World
    var hello = "hello";
    var world = "world";
    var helloworld = hello + " " + world;
    console.log(helloworld);

    // Hello World in a function
    function HelloWorld() {
        var hi = "Hello world!";
        console.log(hi);
    }

    // Another one...
    var five = 5;
    var six = 6;
    var total = five + six;
    console.log(total);
})();
