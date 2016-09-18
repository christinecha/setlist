const firebase = require('firebase')

firebase.initializeApp({
  apiKey: "AIzaSyBqaeiNuy4zlN1fOzV7l9OuDwAzKmO24nE",
  authDomain: "setlist-6c6fe.firebaseapp.com",
  databaseURL: "https://setlist-6c6fe.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "1082659044728"
})

const Base = require('./Base')
const Rooms = require('./Rooms')
const Queue = require('./Queue')

const $setlist = document.getElementById('set-list')

class SetList extends Base {
  constructor() {
    super()

    this.addEventListeners()

    // set up the state object
    this.state = {
      rooms: {},
      showPlayer: false,
      activeRoom: null
    }

    // set up child modules
    this._rooms = new Rooms({ rooms: {} })
    this._queue = new Queue({ handleClosePlayer: this.handleClosePlayer.bind(this) })

    // watch room data
    this.watchRoomsData()

    // ... and voila!
    this.render()
  }

  addEventListeners() {
    const $showPlayer = $setlist.querySelector('.show-player')
    $showPlayer.addEventListener('click', () => {
      this.state.showPlayer = true
      this.render()
    })
  }

  watchRoomsData() {
    // Instantiate a watcher that will update this.rooms in realtime.
    // Easy peasy. Thanks, Firebase!
    firebase.database().ref('rooms/').on('value', (snapshot) => {
      const rooms = snapshot.val()
      // const rooms = {
      //   'test': { name: 'Recurse Center' }
      // }

      for (let i in rooms) {
        this.state.rooms[i] = {
          name: rooms[i].name,
          handleEnterRoom: () => this.handleEnterRoom(i)
        }
      }

      this.render()
    })
  }

  /** Methods to pass on to your children **/
  handleEnterRoom(key) {
    this.state.activeRoom = key
    this.render()
  }

  handleClosePlayer() {
    this.state.showPlayer = false
    this.render()
  }
  /*****************************************/

  render() {
    const { activeRoom, showPlayer, rooms } = this.state

    this._rooms.update({ rooms: rooms })
    this._queue.update({
      roomKey: activeRoom,
      showPlayer: showPlayer
    })
  }
}

module.exports = SetList
