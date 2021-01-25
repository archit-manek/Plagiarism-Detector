import React from "react"
import * as Prism from "prismjs"
import "prismjs/themes/prism.css"
import "prismjs/themes/prism-solarizedlight.css"
import "prismjs/plugins/line-numbers/prism-line-numbers.js"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"
import "prismjs/plugins/line-highlight/prism-line-highlight.js"
import "prismjs/plugins/line-highlight/prism-line-highlight.css"
import "prismjs/components/prism-javascript"

interface codeProps1 {
  code2: string[],
  lines2: string[]
}

export default class Code_Student2 extends React.Component<codeProps1> {


  componentDidMount() {
    Prism.highlightAll()
  }
  render() {

    const items = []
    for (let i = 0; i < this.props.code2.length; i++) {
      items.push(<pre className="line-numbers" data-line={`${this.props.lines2[i]}`}>
        <code className={`language-javascript`}>{this.props.code2[i]}</code>
      </pre>)
    }
    return (
      <div>
        {items}
      </div>
    );
  }
}
