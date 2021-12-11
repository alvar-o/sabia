import { useState } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { postMessage } from "../store/actions/messages";

const MessageForm = props => {
    const { errors, postMessage } = props;
    const [text, setText] = useState(''); 
    const navigate = useNavigate();
    const location = useLocation();

    const handleNewMessage = e => {
        e.preventDefault();
        postMessage(text);
        setText('');
        if (/\/messages\/new/.test(location.pathname)) {
            navigate('/');
        }
        else {
            
        }
    }

    return (
        <div className='col-12'>
            <form
                onSubmit={handleNewMessage}
                className='d-flex align-items-center justify-content-center'>
                <div className="w-100 mb-3 row row-cols-1 justify-content-md-center">
                    <textarea
                        type="text"
                        className="form-control"
                        value={text}
                        onChange={e => setText(e.target.value)} />

                    <button
                        className="btn btn-success float-end mt-3" disabled={!text}  >
                        Post message
                    </button>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(mapStateToProps, { postMessage })(MessageForm);