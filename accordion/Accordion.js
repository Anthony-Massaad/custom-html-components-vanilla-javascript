class Accordion extends HTMLElement {
  constructor() {
    super();
    /**
     * @type {string} the title
     */
    this.title;
  }

  // observes these attributes for changes
  static get observedAttributes() {
    return ["title"];
  }

  // triggers the initial rendering of the element.
  // called when the custom element is connected to the DOM
  connectedCallback() {
    if (!this.hasAttribute("title")) {
      // necessary element
      throw new Error("Missing 'title' attribute in accordian element.");
    }

    this.render();
  }

  // Called when the element's attributes are changed
  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === "title") {
      if (newVal) {
        this.title = newVal;
      } else {
        this.title = oldVal;
      }
    }
  }
  render() {
    const accordionContainer = document.createElement("div");
    accordionContainer.classList.add("accordion-container");

    // title
    const heading = document.createElement("button");
    heading.classList.add("accordion");
    heading.textContent = this.title;

    // pannel
    const panel = document.createElement("div");
    panel.classList.add("panel");
    panel.innerHTML = this.innerHTML;

    heading.addEventListener("click", () => {
      heading.classList.toggle("active");
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });

    accordionContainer.appendChild(heading);
    accordionContainer.appendChild(panel);

    // Clear existing content
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }

    this.appendChild(accordionContainer);
  }
}

customElements.define("custom-accordion", Accordion);

export default Accordion;
