import { html } from '../lib.js';
import { editIllustration, getIllustrationById } from '../api/data.js';

const editTemplate = (illustration, onSubmit) => html`
<section id="edit-publication">
    <div class="container">
        <form @submit=${onSubmit} id="edit-form">
            <h1>Edit Publication</h1>
            <p>Please fill in this form to edit a publication.</p>
            <hr>
            <p>Title</p>
            <input type="text" placeholder="Enter Title" name="title" .value=${illustration.title}>
            <p>Description</p>
            <!-- <input type="text" placeholder="Enter Description" name="description" .value=${illustration.Description}> -->
            <textarea placeholder="Enter Description" spellcheck="false" name="description">${illustration.Description}</textarea>
            <p>Image URL</p>
            <input type="text" placeholder="Enter Image URL" name="imageUrl" .value=${illustration.imageUrl}>
            <hr>
            <input type="submit" class="editbtn" value="Edit">
        </form>
    </div>
</section>`;

export async function editPage(ctx){

    const illustrationId = ctx.params.id;
    const illustration = await getIllustrationById(illustrationId);
    ctx.render(editTemplate(illustration, onSubmit));
    window.scrollTo(0,0);
    async function onSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const title = formData.get('title');
        const Description = formData.get('description');
        const imageUrl = formData.get('imageUrl');

        if(!title || !Description || !imageUrl){
            return alert('All fields are required!');
        }

        await editIllustration(illustrationId, {
            title,
            Description,
            imageUrl
        });

        ctx.page.redirect('/details/'+illustrationId);

    }
}
