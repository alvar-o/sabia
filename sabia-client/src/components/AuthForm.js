import { useEffect, useState } from "react";

const AuthForm = ({ 
    heading, 
    buttonText, 
    signup, 
    errors, 
    router,
    authUser: onAuth,
    removeError }) => {

    const [state, setState] = useState({
        email: '',
        username: '',
        password: '',
        profileImageUrl: ''
    })

    const handleSubmit = async e => {
        e.preventDefault();
        const authType = signup ? 'signup' : 'signin';
        onAuth(authType, state)
        .then((res) => {
            if (res) router.navigate('/')
        })
        .catch((err) => {
            console.log(err)
            return err
        })
    }

    const handleChange = e => {
        let { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    useEffect(() => {
        removeError()
    }, [router.location, removeError])
    
    return (
            <form
                className="d-flex flex-column justify-content-md-center"
                onSubmit={handleSubmit} >
                <h2 className='text-center mb-3'>{heading}</h2>
                {!!errors.message && (
                    <div className="alert alert-danger p-1 text-center">
                        <small>
                            {errors.message}
                        </small>
                    </div>
                )}
                <div className="row">
                    <label
                        className='col-form-label'
                        htmlFor="email">
                        E-mail:
                    </label>
                    <input
                        className='form-control'
                        type="text"
                        id="email"
                        name="email"
                        value={state.email}
                        onChange={handleChange} />
                </div>

                {signup && (
                    <div className="row">
                        <label
                            className='col-form-label'
                            htmlFor="username">
                            Username:
                        </label>
                        <input
                            className='form-control'
                            type="text"
                            id="username"
                            name="username"
                            value={state.username}
                            onChange={handleChange} />
                    </div>
                )}

                <div className="row">
                    <label
                        className='col-form-label'
                        htmlFor="password">
                        Password:
                    </label>
                    <input
                        className='form-control'
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleChange} />
                </div>

                {signup && (
                    <div className="row">
                        <label
                            className='col-form-label'
                            htmlFor="profileImageUrl">
                            Avatar URL:
                        </label>
                        <input
                            className='form-control'
                            type="text"
                            id="profileImageUrl"
                            name="profileImageUrl"
                            value={state.profileImageUrl}
                            onChange={handleChange} />
                    </div>
                )}

                <div className="row">
                    <button 
                        type='submit' 
                        className="btn btn-primary btn-block btn-lg my-3">
                        {buttonText}
                    </button>
                </div>
            </form>
    )
}

export default AuthForm;