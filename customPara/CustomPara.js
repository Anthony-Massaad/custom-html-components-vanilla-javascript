class CustomPara extends HTMLElement {
  constructor() {
    super();
    // // Create a shadow root to the DOM
    // this.attachShadow({ mode: "open" });
    /**
     * @type {boolean} the title
     */
    this.bold = false;

    /**
     * @type {boolean} the title
     */
    this.underline = false;

    /**
     * @type {string} the title
     */
    this.title;
  }

  // observes these attributes for changes
  static get observedAttributes() {
    return ["bold", "underline", "title"];
  }

  // triggers the initial rendering of the element.
  // called when the custom element is connected to the DOM
  connectedCallback() {
    if (!this.hasAttribute("title")) {
      // necessary element
      throw new Error("Missing 'title' attribute in custom-para element.");
    }

    this.render();
  }

  // Called when the element's attributes are changed
  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === "bold") {
      this.bold = newVal !== null;
    } else if (attrName === "underline") {
      this.underline = newVal !== null;
    }
  }
  render() {
    // setting up the main wrapper
    const paraContainer = document.createElement("div");
    paraContainer.classList.add("custom-para");

    // title
    const heading = document.createElement("h2");
    heading.textContent = this.title;

    // paragraph
    const paragraph = document.createElement("p");
    paragraph.style.fontWeight = this.bold ? "bold" : "normal";
    paragraph.style.textDecoration = this.underline ? "underline" : "none";
    paragraph.textContent = this.textContent;

    // append everything in the order you wish
    paraContainer.appendChild(heading);
    paraContainer.appendChild(paragraph);

    // Clear existing content
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }

    this.appendChild(paraContainer);
  }
}

// Define the custom element
customElements.define("custom-para", CustomPara);

export default CustomPara;
