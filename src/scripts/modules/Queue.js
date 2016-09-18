const firebase = require('firebase')

const Base = require('./Base')
const Song = require('./Song')

const $setlist = document.getElementById('set-list')
const $prototypes = document.getElementById('prototypes')
const $queuePrototype = $prototypes.querySelector('.queue')

class Queue extends Base {
  constructor(props = {}) {
    super(props, $queuePrototype, $setlist)

    this.state = {
      songs: {}
    }

    // cache the nodes you'll want access to in 'render' so it's only done once
    this.$roomName = this.node.querySelector('.room-name')

    // set up a reference for your child modules
    this._songs = {}

    // get song data from Firebase
    if (props.roomKey) this.getSongsData(props.roomKey)

    this.addEventListeners()
    this.render()
  }

  getSongsData(roomKey) {
    // Instantiate a watcher that will update this.songs in realtime.
    // Easy peasy. Thanks, Firebase!
    // firebase.database().ref(`setlists/${roomKey}`).once('value', (snapshot) => {
      // const songs = snapshot.val()
      const songs = {
        'key': { name: 'song-1' },
        'key-2': { name: 'ahhhh' }
      }

      for (let i in songs) {
        this.state.songs[i] = {
          name: songs[i].name,
          $queue: this.node.querySelector('.songs')
        }
      }

      this.render()
    // })
  }

  didUpdate(props) {
    if (props.roomKey) this.getSongsData(props.roomKey)
  }

  addEventListeners() {
    // this.node.addEventListener('click', this.props.handleClick)
  }

  render() {
    const { songs } = this.state

    this.$roomName.innerText = this.props.roomKey

    for (let i in songs) {
      const songRef = this._songs[i]
      if (songRef) songRef.update(songs[i])
      else this._songs[i] = new Song(songs[i])
    }
  }
}

module.exports = Queue
