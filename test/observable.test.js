Observable = require('../observable.js');

book = new Observable({
    name: "A Tale of Two Cities",
    read: function(){
        console.log("Called read():");
        console.log("-------")
        this.dispatch("before_read", {name: this.name});
        console.log("Now reading...");
        this.dispatch("after_read", {name: this.name});
        console.log("===========================");
        return true;
    }
});

function test(){
    var ref1 = book.on("before_read", function(args){
        return console.log("started reading " + args.name);
    });

    var ref2 =  book.on("after_read", function(args){
        return console.log("finished reading " + args.name);
    });

    book.read();

    book.mute("before_read");

    book.read();

    book.detach("after_read", ref2);

    book.read();

    book.unmute("before_read");

    book.on("after_read", function(args){
        console.log("celebrating with a nice cold drink.");
    });

    book.read();
}

test();

