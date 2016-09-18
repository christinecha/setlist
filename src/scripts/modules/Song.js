const Base = require('./Base')

const $prototypes = document.getElementById('prototypes')
const $songPrototype = $prototypes.querySelector('.song')

class Song extends Base {
  constructor(props = {}) {
    super(props, $songPrototype, props.$queue)

    // cache the nodes you'll want access to in 'render' so it's only done once
    this.$songName = this.node.querySelector('.song-name')

    this.addEventListeners()
    this.render()
  }

  addEventListeners() {
    // this.node.addEventListener('click', this.props.handleClick)
  }

  render() {
    this.$songName.innerText = this.props.name
  }
}

module.exports = Song
