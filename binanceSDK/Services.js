import Enums from './Enums';
import Methods from './Methods';
import Validator from './MethodValidator';
import Configs from './Configs';

export default class Services {
    constructor() {
        //console.log(endPointUrls.publicUrl + 'ping');
    }
    constructEndPoint(method) {
        return Configs.endPointUrl + method.version + '/' + method.name;
    }
    constructRestCall(args, method) {
        let restObj = {

            method: method.verb

        };

        if (method.verb === 'GET') {

        } else if (method.verb === 'POST' || method.verb === 'PUT') {

            restObj.headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }

            restObj.body = JSON.stringify(args);

        } else if (method.verb === 'DELETE') {

        }




    }

    test() {
        return fetch(Configs.endPointUrl + 'ping', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                return responseJson;

            })
            .catch((error) => {
                console.error(error);
            });
    }

    newOrder(args) {
        const _newOrder = Methods['new_order'];
        if (Validator(args, _newOrder.parameters)) {
            return fetch(
                constructEndPoint(_newOrder),
                constructRestCall(args, _newOrder)
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
