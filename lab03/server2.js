const express = require('express');
const app = express();
const {NodeAdapter} = require('ef-keycloak-connect');

const port = process.env.PORT || 3004;

const config = {
    "realm": "demo-realm",
    "auth-server-url": "http://localhost:8080/auth",
    "ssl-required": "external",
    "resource": "demo-app",
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
