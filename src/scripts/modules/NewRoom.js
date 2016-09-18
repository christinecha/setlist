const firebase = require('firebase')

const Base = require('./Base')

const $setlist = document.getElementById('set-list')
const $prototypes = document.getElementById('prototypes')
const $newRoomPrototype = $prototypes.querySelector('.new-room')

class NewRoom extends Base {
  constructor(props = {}) {
    super(props, $newRoomPrototype, props.$wrapper)

    this.state = {
      isShowingInput: false
    }

    // cache the nodes you'll want access to in 'render' so it's only done once
    this.$showInput = this.node.querySelector('.show-input')
    this.$form = this.node.querySelector('.new-room-form')
    this.$roomName = this.$form.querySelector('.room-name-input')
    this.$roomPassword = this.$form.querySelector('.room-password-input')
    this.$saveRoom = this.node.querySelector('.save-room')

    this.addEventListeners()
    this.render()
  }

  addEventListeners() {
    this.$showInput.addEventListener('click', () => {
      this.state.isShowingInput = true
      this.render()
    })

    this.$saveRoom.addEventListener('click', (e) => {
      e.preventDefault()
      this.saveNewRoom()
      this.render()
    })
  }

  saveNewRoom() {
    const name = this.$roomName.value
    const password = this.$roomPassword.value

    firebase.database().ref('rooms').push({ name, password })
    console.log(name, password)
  }

  render() {
    const { isShowingInput } = this.state

    this.$form.classList[isShowingInput ? 'remove' : 'add']('hidden')
    this.$showInput.classList[!isShowingInput ? 'remove' : 'add']('xsmall')
    // this.$roomName.innerText = this.props.name
  }
}

module.exports = NewRoom
