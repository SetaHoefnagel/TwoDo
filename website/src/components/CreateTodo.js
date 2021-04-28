import CheckboxElement from "./CheckboxElement"
import TextEditor from "./TextEditor"

export default () => {
    return (
        <div className='form'>
            <div className='form-group'>
                <label for='title'>Title</label>
                <input name='title' className='form-control' type='text' />
            </div>
            <div className='form-group'>
                <TextEditor />
            </div>
            <input type='submit' className='btn btn-success' value='Create'/>
        </div>
    )
}
