const Base = require('./Base')

const $prototypes = document.getElementById('prototypes')
const $playerPrototype = $prototypes.querySelector('.player')

class Player extends Base {
  constructor(props = {}) {
    super(props, $playerPrototype, document.body)

    // cache the nodes you'll want access to in 'render' so it's only done once
    this.$songName = this.node.querySelector('.song-name')
    this.$closePlayer = this.node.querySelector('.close-player')

    this.addEventListeners()
    this.render()
  }

  addEventListeners() {
    console.log(this.props.handleClosePlayer)
    this.$closePlayer.addEventListener('click', this.props.handleClosePlayer)
    // this.node.addEventListener('click', this.props.handleClick)
  }

  render() {
    if (this.props.isVisible) this.node.classList.remove('hidden')
    else this.node.classList.add('hidden')

    this.$songName.innerText = this.props.name
  }
}

module.exports = Player
