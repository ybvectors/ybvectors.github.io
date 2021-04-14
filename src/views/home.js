import { html } from '../lib.js';

const homeTemplate = () => html`
<section id="home-section">
    <div class="home">
        <h1>Welcome to the official <br>YB Vectors website!</h1>
        <h4>This is an official portfolio website,<br> which includes all my creations.</h4>
        <p>Don't have an account yet? <a href="/register"> Register</a> now!</p>
        <p>Already have an account? <a href="/login"> Login</a> from here.</p>
    </div>
    <div class="img-box">
        <img src="images/—Pngtree—blue paint splash graffiti_3883911.png" class="back-img" alt="">
        <img src="images/—Pngtree—orange brush_5459394.png" class="front-img" alt="">
    </div>
</section>`;

export async function homePage(ctx){
    const token = sessionStorage.getItem('authToken');
    if(token != null){
        ctx.page.redirect('/catalogue');
    }else{
        ctx.render(homeTemplate());
        window.scrollTo(0,0);
    }
}