import Enums from './Enums';
import Methods from './Methods';
import Validator from './MethodValidator';
import Configs from './Configs';
var SHA256 = require("crypto-js/hmac-sha256");

export default class Services {
    constructor() {
        //console.log(endPointUrls.publicUrl + 'ping');
    }
    constructPayload(args, method) {
        let payload = '';


        Object.keys(args).forEach(function (key) {
            payload += '&' + key + '=' + args[key];
        });

        if (method.signed) {
            payload += '&signature=' + SHA256(payload, Configs.secretKey);
        }

        return payload;
    }

    constructEndPoint(args, method) {

        let url = Configs.endPointUrl + method.version + '/' + method.name;
        if (method.verb === 'GET') {
            url += this.constructPayload(args, method);
        }
        return url;
    }


    constructRestCall(args, method) {

        var reqHeaders = new Headers();
        reqHeaders.append("Content-Type", "application/json");
        reqHeaders.append("Accept", "application/json");

        if (method.apikey) {
            reqHeaders.append("X-MBX-APIKEY", Configs.APIKey);
        }

        let restObj = {
            method: 'POST',
            headers: reqHeaders
        };
        if (method.verb === 'GET' && !method.signed) {
            restObj.method = 'GET';
        }


        if (method.verb === 'POST' || method.verb === 'PUT' || method.verb === 'DELETE') {
            restObj.body = JSON.stringify(this.constructPayload(args, method));
        }

        return restObj;


    }

    test() {
        const _ping = Methods['ping'];
        let args = {};
        if (Validator(args, _ping.parameters)) {
            console.log('valid');
            console.log(this.constructEndPoint(args, _ping));
            return fetch(
                this.constructEndPoint(args, _ping),
                this.constructRestCall(args, _ping)
            ).then((response) => response.json())
                .then((responseJson) => {
                    return responseJson;

                })
                .catch((error) => {
                    console.error(error);
                });
        }

    }

    newOrder(args) {
        const _newOrder = Methods['new_order'];
        if (Validator(args, _newOrder.parameters)) {

            return fetch(
                this.constructEndPoint(args, _newOrder),
                this.constructRestCall(args, _newOrder)
            ).then((response) => response.json())
                .then((responseJson) => {
                    return responseJson;

                })
                .catch((error) => {
                    console.error(error);
                });
        }

    }
}
