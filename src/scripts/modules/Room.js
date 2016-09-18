const Base = require('./Base')

const $setlist = document.getElementById('set-list')
const $roomSelector = document.getElementById('room-selector')
const $prototypes = document.getElementById('prototypes')
const $roomPrototype = $prototypes.querySelector('.room')

class Room extends Base {
  constructor(props = {}) {
    super(props, $roomPrototype, $roomSelector)

    // cache the nodes you'll want access to in 'render' so it's only done once
    this.$roomName = this.node.querySelector('.room-name')

    this.addEventListeners()
    this.render()
  }

  addEventListeners() {
    this.node.addEventListener('click', this.props.handleEnterRoom)
  }

  render() {
    this.$roomName.innerText = this.props.name
  }
}

module.exports = Room
