class Base {

  /** Instantiate your module.
    * @param {Object} props      | an object containing any data you'll later want to access
    * @param {Element} prototype | a node that you can clone - this will be your DOM reference
    * @param {Element} parent    | the DOM Node in which you want to append this new element
   **/
  constructor() {
    // Using arguments instead of actual param requirements so that
    // the top-most module can be constructed without any of the args.

    this.props    = arguments[0] || {}
    this.prototype = arguments[1] || null
    this.parent    = arguments[2] || null

    // store a clone of the prototype
    if (!this.prototype) return
    this.node = this.prototype.cloneNode(true)

    // stick the node into the supplied container
    if (!this.parent) return
    this.parent.appendChild(this.node)
  }

  destroy() {
    this.parent.removeChild(this.node)
  }

  update(props) {
    this.props = Object.assign(this.props, props)
    this.render()

    this.didUpdate(props)
  }

  /* Lifecycle method, always gets called after update */
  didUpdate(props) {
    // Override this
  }

  render() {
    // Do stuff to this.node
  }
}

module.exports = Base
