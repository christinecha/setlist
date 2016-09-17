require('../styles/index.less')

const firebase = require('firebase')

const Room = require('./modules/Room')

// firebase.initializeApp({ keys })

class SetList {
  constructor() {
    this.state = {
      activeRoomId: 'Recurse Center'
    }

    this.render()
  }

  render() {
    new Room(this.state.activeRoomId)
  }
}

new SetList()
