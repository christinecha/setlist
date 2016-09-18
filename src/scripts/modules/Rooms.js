const Base = require('./Base')
const NewRoom = require('./NewRoom')
const Room = require('./Room')

const $setlist = document.getElementById('set-list')
const $roomSelector = document.getElementById('room-selector')
const $prototypes = document.getElementById('prototypes')
const $roomsPrototype = $prototypes.querySelector('.rooms')

class Rooms extends Base {
  constructor(props = {}) {
    super(props, $roomsPrototype, $roomSelector)

    // cache the nodes you'll want access to in 'render' so it's only done once
    this.$roomName = this.node.querySelector('.room-name')
    this.$newRoomWrapper = this.node.querySelector('.new-room-wrapper')
    this.$roomsList = this.node.querySelector('.rooms-list')

    // set up child modules
    this._newRoom = new NewRoom({ $wrapper: this.$newRoomWrapper })
    this._rooms = {}

    this.addEventListeners()
    this.render()
  }

  addEventListeners() {
    // this.node.addEventListener('click', this.props.handleEnterRoom)
  }

  cleanRooms() {
    for (let i in this._rooms) this._rooms[i].destroy()
    this._rooms = {}
  }

  render() {
    // Update the room modules
    this.cleanRooms()
    for (let i in this.props.rooms) {
      this._rooms[i] = new Room(
        Object.assign(this.props.rooms[i], { $roomsList: this.$roomsList })
      )
    }
  }
}

module.exports = Rooms
