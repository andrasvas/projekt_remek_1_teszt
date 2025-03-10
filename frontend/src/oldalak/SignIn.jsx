import './Bakelitek.css'

function SignIn(){

    return(
        <>
            <div>
                <form action="">
                    <input type="email" name="" id="" placeholder='E-mail' />
                    <br />
                    <input type="password" name="" id="" placeholder='Jelszó' />
                    <br />
                    <input type="submit" value="Bejelentkezés" />
                </form>
            </div>

            <div>
                <a href="/signup">Még nincs fiókod?</a>
            </div>
        </>
    )
}

export default SignIn