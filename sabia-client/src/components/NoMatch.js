import { useEffect } from "react"

export default ({ errors }) => {
    useEffect(() => {
        document.body.classList.remove(...document.body.classList);
        document.body.classList.add('not-found')
    })

    return (
        <div className="home-container">
            <div className="hero">
                <div style={{
                    fontSize: '6em',
                    textAlign: 'center'
                }}>
                    :(
                </div>
                <h2>404</h2>
                <p>
                    {errors?.message ? errors.message : 'This page does not exist.'}
                    
                </p>
            </div>
        </div>
    )
}