document.addEventListener('DOMContentLoaded', function() {

    // --- Lógica da Página Inicial (posts recentes) ---
    const postsContainer = document.getElementById('posts-container');
    if (postsContainer) {
        fetch('posts.json')
            .then(response => response.json())
            .then(posts => {
                const latestPosts = posts.slice(0, 3);
                
                let postsHTML = '';
                latestPosts.forEach(post => {
                    postsHTML += `
                        <div class="post-summary-card">
                            <h3>${post.title}</h3>
                            <p>${post.description}</p>
                            <a href="${post.link}" class="read-more">Leia Mais</a>
                        </div>
                    `;
                });
                
                postsContainer.innerHTML = postsHTML;
            })
            .catch(error => {
                console.error('Erro ao carregar os posts:', error);
                postsContainer.innerHTML = '<p>Não foi possível carregar os posts no momento.</p>';
            });
    }

    // --- NOVA LÓGICA: Página do Blog (todos os posts) ---
    const blogPostsContainer = document.getElementById('blog-posts-container');
    if (blogPostsContainer) {
        fetch('posts.json')
            .then(response => response.json())
            .then(posts => {
                let postsHTML = '';
                // Loop por TODOS os posts, sem slice()
                posts.forEach(post => {
                    // Usamos a classe de estilo que já existe para o resumo dos posts
                    postsHTML += `
                        <article class="blog-post-summary">
                            <h2>${post.title}</h2>
                            <p class="post-meta">Publicado em ${new Date(post.date).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</p>
                            <p>${post.description}</p>
                            <a href="${post.link}" class="read-more">Leia Mais</a>
                        </article>
                    `;
                });
                
                blogPostsContainer.innerHTML = postsHTML;
            })
            .catch(error => {
                console.error('Erro ao carregar os posts do blog:', error);
                blogPostsContainer.innerHTML = '<p>Não foi possível carregar os posts no momento.</p>';
            });
    }

    // --- Lógica do Formulário de Contato (sem alterações) ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitButton = document.getElementById('submit-button');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const scriptURL = 'COLE_AQUI_A_URL_DO_SEU_SCRIPT_DO_GOOGLE'; // Mantenha sua URL aqui
            const formData = new FormData(contactForm);

            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';
            formStatus.textContent = '';

            fetch(scriptURL, { method: 'POST', body: formData })
                .then(response => {
                    if (response.ok) {
                        formStatus.textContent = 'Mensagem enviada com sucesso! Obrigado.';
                        formStatus.style.color = 'green';
                        contactForm.reset();
                    } else {
                        throw new Error('Erro na resposta da rede.');
                    }
                })
                .catch(error => {
                    console.error('Erro!', error.message);
                    formStatus.textContent = 'Ocorreu um erro ao enviar a mensagem. Tente novamente mais tarde.';
                    formStatus.style.color = 'red';
                })
                .finally(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Enviar Mensagem';
                });
        });
    }
});