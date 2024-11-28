import { EditorState, convertToRaw, Modifier, SelectionState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import DOMPurify from 'dompurify';


interface IInputField{
    editorState: any;
    setEditorState: any;
    news: string;
    set_news: (data) => void;
}

const CustomInputField = ({editorState, setEditorState, set_news, news}: IInputField) => {

      const onEditorStateChange = editorState => {
    setEditorState(editorState);
    const dirtyHTML = draftToHtml(
      convertToRaw(editorState.getCurrentContent()),
    );

    const cleanHTML = DOMPurify.sanitize(dirtyHTML, {
      USE_PROFILES: { html: true },
    });
    set_news(cleanHTML);
  };


    return(
           <Editor
                      placeholder="Great News"
                      editorState={editorState}
                      wrapperClassName="wrapper-class border ml-3"
                      editorClassName="editor-class m-2"
                      toolbarClassName="toolbar-class"
                      toolbar={{
                        options: [
                          'inline',
                          'fontSize',
                          'fontFamily',
                          'textAlign',
                          'list',
                        ],
                        inline: {
                          options: ['italic', 'bold'],
                        },
                        blockType: {
                          className: 'demo-option-custom-wide',
                          dropdownClassName: 'demo-dropdown-custom',
                        },
                        fontSize: { className: 'demo-option-custom-medium' },
                      }}
                      onEditorStateChange={editorState => {
                        onEditorStateChange(editorState);
                      }}
                    />
    )
}

export default CustomInputField