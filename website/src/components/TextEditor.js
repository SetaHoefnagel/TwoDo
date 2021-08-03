import React, { useCallback, useRef } from 'react';
import ReactDOM from 'react-dom';
import CheckboxElement from './CheckboxElement';

import { CKEditor, CKEditorContext } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import TodoList from '@ckeditor/ckeditor5-list/src/todolist';
import Context from '@ckeditor/ckeditor5-core/src/context';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';

export default () => {
  const ref = React.createRef();
  let ces = [];
  let refs = {};
  const [ref2, setRef2] = useHookWithRefCallback();
  const [html, setHTML] = "<b>Hello <i>World</i></b>";
  const contentEditable = React.createRef();

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
                  <CKEditorContext context={ Context }>
                      <CKEditor
                        editor={ ClassicEditor }
                        config={ {
                          plugins: [ Paragraph, Bold, Italic, Essentials, TodoList ],
                          toolbar: [ 'heading', '|', 'bold', 'italic', 'link', '|', 'bulletedList', 'numberedList', 'todoList', 'blockQuote' ],
                        } }
                        data="<p>Hello from the first editor working with the context!</p>"
                        onReady={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor1 is ready to use!', editor );
                        } }
                    />

                  <h2>Using the CKeditor 5 context feature in React</h2>
                    <CKEditor
                        editor={ ClassicEditor }
                        config={ {
                            plugins: [ Paragraph, Bold, Italic, Essentials ],
                            toolbar: [ 'bold', 'italic' ]
                        } }
                        data="<p>Hello from the first editor working with the context!</p>"
                        onReady={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor1 is ready to use!', editor );
                        } }
                    />
                  </CKEditorContext>
        </div>
    )
}
