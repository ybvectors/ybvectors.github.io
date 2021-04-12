import { html } from '../lib.js';
import { getIllustrationById, deleteIllustration, createComment, getAllComments, deleteComment, deleteAllCommentsByIllustration} from '../api/data.js';

const detailsTemplate = (illustration, onDelete, onComment, comments) => html`
<section id="illustration-details">

    <div class="details-info">
        <img src=${illustration.imageUrl}>
        <h1>${illustration.title}</h1>
        <hr>

        <p class="description-para">${illustration.Description}</p>

        <div class="illustrations-buttons">
            <a href="/catalogue" class="edit-button">Back</a>
    ${illustration.owner.objectId == sessionStorage.getItem('userId') ? html`<a href="/edit/${illustration.objectId}" class="edit-button">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="delete-button">Delete</a>`:''} 
            
        </div>

        ${sessionStorage.getItem('authToken') != null ? 
        html`<div class="add-comment-area">
            <textarea id="commentText" class="comment-area" placeholder="Write your comment"
                spellcheck="false"></textarea>
                <a @click=${onComment} href="javascript:void(0)" class="button-details">Comment</a>
        </div>` : ''}
        

        <div class="recent-comments">
            <h2>Most recent comments</h2>
            
            ${comments.length == 0 ? html`<h3>No comments yet.</h3>` : comments.map(commentTemplate)}
        </div>

    </div>
</section>`;

const commentTemplate = (comment) => html`
<div id=${comment.objectId} class="comment">
    <h4>${comment.owner.username} commented:</h4>
    <p>${comment.text}</p>
</div>`;

export async function detailsPage(ctx) {

    const illustrationId = ctx.params.id;
    const illustration = await getIllustrationById(illustrationId);
    const comments = await getAllComments();
    const filteredComments = comments.filter(c=>c.illustration.objectId==illustrationId);
    
    
    ctx.render(detailsTemplate(illustration, onDelete, onComment, filteredComments));

    async function onDelete() {
        const confirmed = confirm('Are you sure you want to delete this illustration?');
        if (confirmed) {

            await deleteIllustration(illustrationId);
            for(let c of filteredComments){
                await deleteComment(c.objectId);
            }
            ctx.page.redirect('/catalogue');
        }
    }

    async function onComment() {
        const text = document.getElementById('commentText').value;
        if (!text) {
            return alert('Invalid comment!');
        }

        document.getElementById('commentText').value='';
        await createComment(illustrationId, {
            text
        });
        ctx.page.redirect('/details/'+illustrationId);
    }

    
}