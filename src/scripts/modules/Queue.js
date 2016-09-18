const firebase = require('firebase')

const Base = require('./Base')
const Song = require('./Song')
const Player = require('./Player')

// Cache all your DOM references
const $setlist = document.getElementById('set-list')
const $prototypes = document.getElementById('prototypes')
const $queuePrototype = $prototypes.querySelector('.queue')

class Queue extends Base {
  constructor(props = {}) {
    super(props, $queuePrototype, $setlist)

    this.state = {
      activeSong: null,
      songs: {}
    }

    // cache the nodes you'll want access to in 'render' so it's only done once
    this.$roomName = this.node.querySelector('.room-name')

    // set up references for your child modules
    this._songs = {}
    this._player = new Player({ handleClosePlayer: this.props.handleClosePlayer })

    // get song data from Firebase
    if (props.roomKey) this.getSongsData(props.roomKey)

    this.addEventListeners()
    this.render()
  }

  didUpdate(props) {
    if (props.roomKey) this.getSongsData(props.roomKey)
  }

  addEventListeners() {
    // this.node.addEventListener('click', this.props.handleClick)
  }

  getSongsData(roomKey) {
    // Instantiate a watcher that will update this.songs in realtime.
    // Easy peasy. Thanks, Firebase!
    firebase.database().ref(`setlists/${roomKey}`).once('value', (snapshot) => {
      const songs = snapshot.val()
      // const songs = {
      //   'key': { name: 'song-1' },
      //   'key-2': { name: 'ahhhh' }
      // }
      this.state.songs = {}

      for (let i in songs) {
        this.state.songs[i] = {
          name: songs[i].name,
          video: songs[i].video,
          $queue: this.node.querySelector('.songs')
        }
      }

      this.render()
    })
  }

  cleanSongs() {
    for (let i in this._songs) this._songs[i].destroy()
    this._songs = {}
  }

  render() {
    const { songs } = this.state

    this.$roomName.innerText = this.props.roomKey

    this.cleanSongs()
    for (let i in songs) this._songs[i] = new Song(songs[i])

    this._player.update({
      isVisible: this.props.showPlayer,
      name: 'Songzzz'
    })
  }
}

module.exports = Queue
