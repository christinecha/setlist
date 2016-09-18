class Base {

  /** Instantiate your module.
    * @param {Object} props      | an object containing any data you'll later want to access
    * @param {Element} prototype | a node that you can clone - this will be your DOM reference
    * @param {Element} parent    | the DOM Node in which you want to append this new element
   **/
  constructor() {
    // Using arguments instead of actual param requirements so that
    // the top-most module can be constructed without any of the args.

    const props     = arguments[0] || {}
    const prototype = arguments[1] || null
    const parent    = arguments[2] || null

    this.props = props

    // store a clone of the prototype
    if (!prototype) return
    this.node = prototype.cloneNode(true)

    // stick the node into the supplied container
    if (!parent) return
    parent.appendChild(this.node)
  }

  update(props) {
    this.props = props
    this.render()
  }

  render() {
    // Do stuff to this.node
  }
}

module.exports = Base
