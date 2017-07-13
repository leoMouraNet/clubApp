class API {
    constructor() {
        this.username = 'laercio.zdq@gmail.com';
        this.password = 'asdfg@@';
        this.API_KEY = 'AIzaSyC6tR4OpJjMbNAO01YKqIUFbhPisP1LoUo';
        this.localId = null;
        this.idToken = null;
    }
    login(cb) {
        fetch(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${this.API_KEY}`, {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                "email": this.username,
                "password": this.password,
                "returnSecureToken": true
            })
        })
        .then(resp => resp.json())
        .then(resp => {
            this.localId = resp.localId;
            this.idToken = resp.idToken;
            cb(resp);
        });
    }

    getEvents(cb) {
        fetch(`https://club-81caf.firebaseio.com/${this.localId}/events.json?auth=${this.idToken}`)
        .then(resp => resp.json())
        .then(resp => {
            cb(resp);
        });
    }

    addEvent(event, cb) {
        fetch(`https://club-81caf.firebaseio.com/${this.localId}/events.json?auth=${this.idToken}`, {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                "name": event.name,
                "date": event.date,
                "start_time": event.start_time,
                "end_time": event.end_time,
                "description": event.description
            })
        })
        .then(resp => resp.json())
        .then(resp => {
            cb(resp);
        });
    }
}
export default API;