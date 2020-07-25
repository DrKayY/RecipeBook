export class User {
    constructor(
        public email: string,
        public id: string,
        // tslint:disable-next-line: variable-name
        private _token: string,
        // tslint:disable-next-line: variable-name
        private _expirationDate: Date
    ) {}

    get token() {
        if (!this._token || this._expirationDate < new Date()) {
            return null;
        }
        return this._token;
    }
}
