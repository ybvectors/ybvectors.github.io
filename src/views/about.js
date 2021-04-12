import { html } from '../lib.js';

const aboutTemplate = () => html`
<section id="about">
    <div class="about-left-col">
        <img src="images/—Pngtree—business person in suit_4432293.png" alt="">
    </div>
    <div class="about-right-col">
        <div class="about-text">
            <h1>About me</h1><br><br>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop publishing software like Aldus PageMaker including versions
                of Lorem Ipsum.
            </p><br><br>
            <h2>"Some inspirational quote..."</h2>
        </div>
    </div>
</section>`;

export async function aboutPage(ctx){
    ctx.render(aboutTemplate());
}