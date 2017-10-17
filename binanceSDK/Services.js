import Enums from './Enums';
import Methods from './Methods';
import Validator from './MethodValidator';
import Configs from './Configs';
var CryptoJS = require("crypto-js");

export default class Services {
    constructor() {
        //console.log(endPointUrls.publicUrl + 'ping');
    }
    constructPayload(args, method) {
        let payload = '';


        Object.keys(args).forEach(function (key) {
            payload +=  key + '=' + args[key] + '&';
        });

        if (method.signed) {
            payload += 'signature=' + CryptoJS.HmacSHA256(payload.replace(/\&$/, ''), Configs.secretKey);
        }

        

        return '?' + payload;
    }

    constructEndPoint(args, method) {

        let url = Configs.endPointUrl + method.version + '/' + method.name;
        if (method.verb === 'GET') {
            url += this.constructPayload(args, method);
        }
        return url;
    }


    constructRestCall(args, method) {

        var reqHeaders = {
          //  "Content-Type": "application/json",
          //  "Accept": "application/json"
        }


        if (method.apikey) {
            reqHeaders["X-MBX-APIKEY"] = Configs.APIKey;
        }

        let restObj = {
            method: method.verb,
            headers: reqHeaders
        };


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

    accountInfo(args) {
        const _accountInfo = Methods.account_information;
        if(typeof args ==='undefined'){
            args = {};
        }
        args.timestamp = new Date().getTime();
        args.recvWindow = '6000000';

       // console.log('valid');
        console.log(this.constructEndPoint(args, _accountInfo));
       // console.log(this.constructRestCall(args, _accountInfo));
        if (Validator(args, _accountInfo.parameters)) {

            return fetch(
                this.constructEndPoint(args, _accountInfo),
                this.constructRestCall(args, _accountInfo)
            )
            .then((response) => response.json())
                .then((responseJson) => {
                    return responseJson;

                })
                .catch((error) => {
                    console.error(error);
                });
        }

    }

    newOrder(args) {
        const _newOrder = Methods.new_order;
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
