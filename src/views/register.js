import { html } from '../lib.js';
import { register } from '../api/data.js';
const registerTemplate = (onSubmit) => html`
<section id="register">
    <div class="container">
        <form @submit=${onSubmit} id="register-form">
            <h1>Register</h1>
            <p>Please fill in this form to create an account.</p>
            <hr>
            <p>Email</p>
            <input type="text" placeholder="Enter Email" name="email">
            <p>Username</p>
            <input type="text" placeholder="Enter Username" name="username">
            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password">
            <p>Repeat Password</p>
            <input type="password" placeholder="Repeat Password" name="repeatPass">
            <hr>
            <input type="submit" class="registerbtn" value="Register">
        </form>
        <div class="signin">
            <p>Already have an account?
                <a href="/login">Sign in</a>.
            </p>
        </div>
    </div>
</section>`;

export async function registerPage(ctx){
    ctx.render(registerTemplate(onSubmit));
    window.scrollTo(0,0);

    async function onSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const username = formData.get('username');
        const password = formData.get('password');
        const rePass = formData.get('repeatPass');

        if(!email || !username || !password || !rePass){
            return alert('All fields are required!');
        }

        if(password != rePass){
            return alert('Passwords don\'t match!');
        }

        await register(email, username, password);
        ctx.setUserNav();
        ctx.page.redirect('/catalogue');
    }
}