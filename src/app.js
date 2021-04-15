import * as api from './api/data.js';
window.api = api;
import {page, render} from './lib.js';
import { logout as apiLogout } from './api/data.js';  
import { homePage } from './views/home.js';
import { aboutPage } from './views/about.js';
import { registerPage } from './views/register.js';
import { loginPage } from './views/login.js';
import { cataloguePage } from './views/catalogue.js';
import { detailsPage } from './views/details.js';
import { createPage } from './views/create.js';
import { editPage } from './views/edit.js';

const main = document.getElementById('site-content');
setUserNav();
document.getElementById('logoutBtn').addEventListener('click', logout);

page('/', decorateContext, homePage);
page('/about', decorateContext, aboutPage);
page('/register', decorateContext, registerPage);
page('/login', decorateContext, loginPage);
page('/catalogue', decorateContext, cataloguePage);
page('/details/:id', decorateContext, detailsPage);
page('/post', decorateContext, createPage);
page('/edit/:id', decorateContext, editPage);

page.start();

function decorateContext(ctx, next){
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}



function setUserNav(){
    const token = sessionStorage.getItem('authToken');
    if(token != null){
        const username = sessionStorage.getItem('username');
        document.querySelectorAll('.logged-in').forEach(li=>li.style.display = '');
        document.querySelectorAll('.guest').forEach(li=>li.style.display='none');
        document.getElementById('welcome').textContent = `Welcome, ${username}`;
        if(sessionStorage.getItem('userId') == 'y2MFzIzOu9' || sessionStorage.getItem('userId') == 'wtFCsbQoqK'){
            document.querySelector('.admin-only').style.display = '';
        }else{
            document.querySelector('.admin-only').style.display = 'none';
        }
    }else{
        document.querySelectorAll('.guest').forEach(li=>li.style.display='');
        document.querySelectorAll('.logged-in').forEach(li=>li.style.display = 'none');
    }
}

async function logout(){
    await apiLogout();
    setUserNav();
    page.redirect('/');
}
