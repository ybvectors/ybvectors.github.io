import { html } from '../lib.js';
import { createIllustration } from '../api/data.js';

const createTemplate = (onSubmit) => html`
<section id="create-publication">
    <div class="container">
        <form @submit=${onSubmit} id="create-form">
            <h1>Post</h1>
            <p>Please fill in this form to create a post.</p>
            <hr>
            <p>Title</p>
            <input type="text" placeholder="Enter Title" name="title">
            <p>Description</p>
            <!-- <input type="text" placeholder="Enter Description" name="description"> -->
            <textarea placeholder="Enter Description" spellcheck="false" name="description"></textarea>
            <p>Image URL</p>
            <input type="text" placeholder="Enter Image URL" name="imageUrl">
            <hr>
            <input type="submit" class="registerbtn" value="Create">
        </form>
    </div>
</section>`;

export async function createPage(ctx){
    ctx.render(createTemplate(onSubmit));
    window.scrollTo(0,0);

    async function onSubmit(event){
        event.preventDefault();
        const formData= new FormData(event.target);
        const title = formData.get('title');
        const Description = formData.get('description');
        const imageUrl = formData.get('imageUrl');

        if(!title || !Description || !imageUrl){
            return alert('All fields are required!');
        }

        await createIllustration({
            title,
            Description,
            imageUrl
        });

        ctx.page.redirect('/catalogue');
    }
}
