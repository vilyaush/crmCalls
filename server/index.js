const https = require('https');

const requests = [
  "https://storage.yandexcloud.net/ccscenario/00e55ba2bc529823c73edca5935b2366.json",
  "https://storage.yandexcloud.net/ccscenario/0497128d3f276247bdd751ba34cf5d80.json",
  "https://storage.yandexcloud.net/ccscenario/0b8ab09975fbd4589879351a6a51021d.json"
];

let result = [];

function makeRequest(request){
    https.get(request, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            result.push(data);
            if (result.length === requests.length) {
                console.log(result);
            } else {
                makeRequest(requests[result.length]);
            }
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

makeRequest(requests[1]);

function makeRequests(request, index){
    https.get(request, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            result[index] = data;
            if (result.length === requests.length) {
                console.log(result);
            }
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

for (let i = 0; i < requests.length; i++) {
    makeRequests(requests[i], i);
}