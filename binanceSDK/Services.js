import Enums from './Enums';
import Configs from './Configs';

export default class Services {
    constructor() {
        //console.log(endPointUrls.publicUrl + 'ping');
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
}
