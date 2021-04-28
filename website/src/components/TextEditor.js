import React, { useCallback, useRef } from 'react';
import ReactDOM from 'react-dom';
import CheckboxElement from './CheckboxElement';
import ReactDOMServer from 'react-dom/server';

export default () => {
  const ref = React.createRef();
  let ces = [];
  let refs = {};
  const [ref2, setRef2] = useHookWithRefCallback();

    function chooseColor(){
        var mycolor = document.getElementById("myColor").value;
        document.execCommand('foreColor', false, mycolor);
      }
  
      function changeFont(){
        var myFont = document.getElementById("input-font").value;
        document.execCommand('fontName', false, myFont);
      }
  
      function changeSize(){
        var mysize = document.getElementById("fontSize").value;
        document.execCommand('fontSize', false, mysize);
      }
  
      function checkDiv(){
        var editorText = ref.current.innerHTML;
        if(editorText === ''){
            ref.current.style.border = '5px solid red';
        }
      }
  
      function removeBorder(){
        ref.current.style.border = '1px solid transparent';
      }

      function insertCheckList() {
        let ref = React.createRef();
        refs[ces.length] = ref;
        let jsx = <CheckboxElement key={Date.now()} checked={false} defaultText='Todo' ref={setRef2} />;
        ces.push(jsx)
        pasteHtmlAtCaret(ces[ces.length-1], true)
      }

      function useHookWithRefCallback() {
        const ref2 = useRef(null);
        const setRef2 = useCallback(node => {
          if (ref2.current) {
            // Make sure to cleanup any events/references added to the last instance
          }
      
          if (node) {
            // Check if a node is actually passed. Otherwise node would be null.
            // You can now do what you need to, addEventListeners, measure, etc.
          }
      
          // Save a reference to the node
          ref2.current = node;
        }, []);
      
        return [ref2, setRef2];
      }

      function pasteHtmlAtCaret(html, selectPastedContent) {
        var sel, range;
        console.log('refs', refs, 'ces', ces)

        if (window.getSelection && (
          window.getSelection().focusNode.className == 'Editor' ||
          window.getSelection().focusNode.tagName == 'DIV'
        )) {
            sel = window.getSelection();

            if (sel.getRangeAt && sel.rangeCount) {
                ReactDOM.render(html, sel.anchorNode)

            }
        }
    }
     

    return (
        <div id="container" >
            <fieldset>
                <button class="fontStyle italic" onClick={() => document.execCommand('italic',false,null)} title="Italicize Highlighted Text"></button>
                <button class="fontStyle bold" onClick={() => document.execCommand( 'bold',false,null)} title="Bold Highlighted Text"></button>
                <button class="fontStyle underline" onClick={() => document.execCommand( 'underline',false,null)}></button>
                <button class="fontStyle strikethrough" onClick={() => document.execCommand( 'strikethrough',false,null)}><strikethrough></strikethrough></button>
                <select id="input-font" class="input"  onChange={changeFont}>
                    <option value="Arial">Arial</option>
                    <option value="Helvetica">Helvetica</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Sans serif">Sans serif</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Palatino">Palatino</option>
                    <option value="Garamond">Garamond</option>
                    <option value="Comic Sans MS">Comic Sans MS</option>
                    <option value="Arial Black">Arial Black</option>
                    <option value="Tahoma">Tahoma</option>
                    <option value="Comic Sans MS">Comic Sans MS</option>
                </select>
                <button class="fontStyle align-left" onClick={() => document.execCommand( 'justifyLeft',false,null)}><justifyLeft></justifyLeft></button>
                <button class="fontStyle align-center" onClick={() => document.execCommand( 'justifyCenter',false,null)}><justifyCenter></justifyCenter></button>
                <button class="fontStyle align-right" onClick={() => document.execCommand( 'justifyRight',false,null)}><justifyRight></justifyRight></button>
                <button class="fontStyle undo-apply" onClick={() => document.execCommand( 'undo',false,null)}><undo></undo></button>
                <button class="fontStyle redo-apply" onClick={() => document.execCommand( 'redo',false,null)}><redo></redo></button>
                <button class="fontStyle orderedlist" onClick={() => document.execCommand('insertOrderedList', false, null)}><insertOrderedList></insertOrderedList></button>
                <button class="fontStyle unorderedlist" onClick={insertCheckList}><insertUnorderedList></insertUnorderedList></button>    
                <input class="color-apply" type="color" onChange={chooseColor} id="myColor" /> 
            
                <select id="fontSize" onClick={changeSize}>
                    <option value="6">H1</option>      
                    <option value="5">H2</option>
                    <option value="4">H3</option>
                    <option value="3">H4</option>
                    <option value="2">H5</option>
                    <option value="1">H6</option>
                </select>
                
            </fieldset>
    
            <div id='editor1' className='Editor' ref={ref} contentEditable={true} suppressContentEditableWarning={true} data-text="Todo....">
              <div></div>
            </div>
        </div>
    )
}
