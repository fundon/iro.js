// Quick reference to the document object and some strings since we usethem more than once
const doc = document,
      READYSTATE_COMPLETE = "complete",
      READYSTATE_CHANGE = "readystatechange";

/**
 * @desc iterate a list (or create a one-item list from a string), calling callback with each item
 * @param {ArrayOrString} list an array or string, callback will be called for each array item, or once if a string is given
 * @param {Function} callback a function to call for each item, the item will be passed as the first parameter
 * @access private
*/
function iterateList(list, callback) {
  list = ("string" == typeof list) ? [list] : list;
  list.forEach(callback);
};

module.exports = {
  /**
   * @desc create a new HTML element
   * @param {String} tagName the tag type of the element to create
   * @param {String} nameSpaceType "SVG" = svg namespace, leave false for default namespace
   * @return {Element} the newly created HTML element
  */
  create: function (tagName, nameSpaceType) {
    return nameSpaceType == "SVG" ? doc.createElementNS("http://www.w3.org/2000/svg", tagName) : doc.createElement(tagName);
  },

  /**
   * @desc append a child element to an element
   * @param {Element} parent the parent element to append to
   * @param {Element} child the child element to append
   * @return {Element} the child element, now appended to the parent
  */
  append: function (parent, child) {
    return parent.appendChild(child);
  },

  appendNew: function (parent, tagName, attrs, nameSpaceType) {
    var child = this.create(tagName, nameSpaceType);
    this.setAttr(child, attrs);
    return parent.appendChild(child);
  },

  /**
   * @desc get an element's attribute by name
   * @param {Element} el target element
   * @param {String} attrName the name of the attribute to get
   * @return {String} the value of the attribute
  */
  attr: function (el, attrName) {
    return el.getAttribute(attrName);
  },

  setAttr: function (el, attrs) {
    for (var attrName in (attrs || {})) {
      el.setAttribute(attrName, attrs[attrName]);
    }
  },

  /**
   * @desc listen to one or more events on an element
   * @param {Element} el target element
   * @param {ArrayOrString} eventList the events to listen to
   * @param {Function} callback the event callback function
  */
  listen: function (el, eventList, callback) {
    iterateList(eventList, function (eventName) {
      el.addEventListener(eventName, callback);
    });
  },

  /**
   * @desc remove an event listener on an element
   * @param {Element} el target element
   * @param {ArrayOrString} eventList the events to remove
   * @param {Function} callback the event callback function
  */
  unlisten: function (el, eventList, callback) {
    iterateList(eventList, function (eventName) {
      el.removeEventListener(eventName, callback);
    });
  },

  /**
   * @desc call callback when the page document is ready
   * @param {Function} callback callback function to be called
  */
  whenReady: function (callback) {
    var _this = this;
    if (doc.readyState == READYSTATE_COMPLETE) {
      callback();
    }
    else {
      _this.listen(doc, READYSTATE_CHANGE, function stateChange(e) {
        if (doc.readyState == READYSTATE_COMPLETE) {
          callback();
          _this.unlisten(doc, READYSTATE_CHANGE, stateChange);
        }
      });
    }
  },
}
