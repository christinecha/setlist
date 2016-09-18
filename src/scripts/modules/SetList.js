const firebase = require('firebase')

firebase.initializeApp({
  apiKey: "AIzaSyBqaeiNuy4zlN1fOzV7l9OuDwAzKmO24nE",
  authDomain: "setlist-6c6fe.firebaseapp.com",
  databaseURL: "https://setlist-6c6fe.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "1082659044728"
})

const Base = require('./Base')
const Room = require('./Room')

const $setlist = document.getElementById('setlist')

class SetList extends Base {
  constructor() {
    super()

    // set up the state object
    this.state = {
      rooms: {},
      activeRoom: null
    }

    // watch room data
    this.watchRoomsData()
    this._rooms = {}

    // ... and voila!
    this.render()
  }

  watchRoomsData() {
    // Instantiate a watcher that will update this.rooms in realtime.
    // Easy peasy. Thanks, Firebase!
    firebase.database().ref('rooms/').on('value', (snapshot) => {
      const rooms = snapshot.val()

      for (let i in rooms) {
        this.state.rooms[i] = {
          name: rooms[i].name,
          handleClick: () => this.enterRoom(i)
        }

        this.render()
      }
    })
  }

  enterRoom(key) {
    this.state.activeRoom = key
    this.render()
  }

  render() {
    const { rooms } = this.state

    for (let i in rooms) {
      const roomRef = this._rooms[i]
      if (roomRef) roomRef.update(rooms[i])
      else this._rooms[i] = new Room(rooms[i])
    }

    console.log(this.state.activeRoom)
  }
}

module.exports = SetList
