import { html } from '../lib.js';
import { getIllustrations } from '../api/data.js';

const catalogueTemplate = (illustrations) => html`
<section id="catalogue">
    <h1>Catalogue</h1>

    <div class="illustrations">

        ${illustrations.length == 0 ? html`<h2>No illustrations in database.</h2>` : illustrations.map(illustrationTemplate)}

    </div>

</section>`;

const illustrationTemplate = (illustration) => html`
<div class="illustration">
    <div class="preview">
        <img src=${illustration.imageUrl}>
    </div>
    <h2>${illustration.title}</h2>
    <div class="info">
        <div class="data-buttons">
            <a href="/details/${illustration.objectId}" class="button-details">Details</a>
        </div>
    </div>
</div>`;

export async function cataloguePage(ctx){

    const illustrations = await getIllustrations();
    illustrations.reverse();
    ctx.render(catalogueTemplate(illustrations));
    window.scrollTo(0,0);

}
