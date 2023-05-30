// const express = require('express');
// const cors = require('cors');

// const Keycloak = require('keycloak-connect');
// const session = require('express-session');

// const app = express();
// app.use(cors());


// var memoryStore = new session.MemoryStore();                       
// var keycloak = new Keycloak({ store: memoryStore });
// app.use(session({
//     secret:'aMnxHmMFaZ4Nuw9ImUFsBTLCgtbY2CQM',                         
//     resave: false,                         
//     saveUninitialized: true,                         
//     store: memoryStore                       
// }));

// app.use(keycloak.middleware());

// app.get('/test', keycloak.protect(), function(req, res){
//     res.render(
//         'test', 
//         {title:'Test of the test'}
//         ); 
// });

// app.get('/hello', (req, res) => {
//     res.send('Hello World!');
//     }
// );

// app.listen(3000, () => {
//     console.log('Server started on port 3000');
//     }
// );


const express = require('express');
const app = express();
const {NodeAdapter} = require('ef-keycloak-connect');

const port = process.env.PORT || 3004;

const config = {
    "realm": "demo-realm",
    "auth-server-url": "http://localhost:8080/",
    "ssl-required": "external",
    "resource": "express-app",
    "verify-token-audience": true,
    "credentials": {
      "secret": "aMnxHmMFaZ4Nuw9ImUFsBTLCgtbY2CQM"
    },
    "use-resource-role-mappings": true,
    "confidential-port": 0,
    "policy-enforcer": {}
  }

const keycloak = new NodeAdapter(config);
app.use(keycloak.middleware());

app.get("/app", keycloak.protect(), (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
