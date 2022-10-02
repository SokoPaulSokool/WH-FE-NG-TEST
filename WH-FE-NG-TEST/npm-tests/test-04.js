//@ts-check
/** 
 * run from root folder as : node ./npm-tests/test-04.js
 * 
 * In the following, make JSON POST to the /save end point.
 * Purify the user input that is received through the /save POST request so that you strip all html tags from the content and clear the security risks in them and print out just the plain text "John Doe" when visiting http://127.0.0.1:8080/get-name
 */


 import {fastify } from "fastify";
 import http from "http";

 const app = fastify({
    ignoreTrailingSlash : true,
    keepAliveTimeout : 65 * 1000
});
const purifyInput=(value)=>{
return value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
.replace(/<[^>]*>/g, "");
}

/** @type {{ firstname?: string, lastname?: string}} */
const userInput = {};

app.post('/save',(request,reply)=>{
    /** @type {{ firstname: string, lastname: string}} */
    //@ts-ignore
    const body = request.body;

    // purify the inputs here
    userInput.firstname = purifyInput(body.firstname)
    userInput.lastname = purifyInput(body.lastname)


    reply.status(200);
    reply.header('Content-Type', 'text/plain; charset=utf-8');
    reply.send("OK");
});

app.get('/get-name',(request,reply)=>{

    reply.header('Content-Type', 'text/html; charset=utf-8');
    const page = 
    `<html>
        <head>
            <title>Wallethub Test</title>
        </head>
        <body>
            <p>First Name: ${userInput.firstname}</p>
            <p>Last Name: ${userInput.lastname}</p>
        </body>
    </html>`;
        
    reply.send(page);

})


// server start
app.listen(8080,"0.0.0.0").then((address)=>{
    console.log(`Server started at ${address}`);

    // json payload to POST
    const payload = JSON.stringify({
        'firstname': `<b>John</b><script>/* *\x2A/javascript:alert(1)// */</script>`,
        'lastname': '<a href="javascript\x3Ajavascript:alert(1)" id="fuzzelement1">Doe</a>'
    });

    // JSON POST of `payload` to http://127.0.0.1:8080/save code here
    const post_options = {
      hostname: "0.0.0.0",
      port: "8080",
      path: "/save",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": payload.length,
      },
    };
    var post_req = http.request(post_options, function(res) {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        console.log("Body: ", data);
      });
    });
    post_req.write(payload); 
    post_req.end();

});


