import React, { useCallback, useRef, ReactDOM } from 'react';
import { ContentEditable } from 'react-contenteditable';

export default class CE extends React.Component {
    // constructor() {
    //     super();

    //     this.emitChange = this.emitChange.bind(this);
    //     this.componentDidUpdate = this.componentDidUpdate.bind(this);
    //     this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
    //     this.render = this.render.bind(this);
    // }
    constructor() {
      super()
      this.contentEditable = React.createRef();
      this.state = {html: "<b>Hello <i>World</i></b>"};
    };
   
    handleChange = evt => {
      this.setState({html: evt.target.value});
    };

    render() {
      return (
        <ContentEditable
          innerRef={this.contentEditable}
          html={this.state.html} // innerHTML of the editable div
          disabled={false}       // use true to disable editing
          onChange={this.handleChange} // handle innerHTML change
          tagName='article' // Use a custom HTML tag (uses a div by default)
          >
          
        </ContentEditable>
      )
        
        // return <div id="contenteditable"
        //     onInput={this.emitChange} 
        //     onBlur={this.emitChange}
        //     contentEditable
        //     dangerouslySetInnerHTML={{__html: this.props.html}}></div>;
    };

    // shouldComponentUpdate(nextProps){
    //     return nextProps.html !== ReactDOM.findDOMNode().innerHTML;
    // };

    // componentDidUpdate() {
    //     if ( this.props.html !== ReactDOM.findDOMNode().innerHTML ) {
    //        ReactDOM.findDOMNode().innerHTML = this.props.html;
    //     }
    // };

    // emitChange(){
    //     var html = ReactDOM.findDOMNode().innerHTML;
    //     if (this.props.onChange && html !== this.lastHtml) {
    //         this.props.onChange({
    //             target: {
    //                 value: html
    //             }
    //         });
    //     }
    //     this.lastHtml = html;
    // };

}
