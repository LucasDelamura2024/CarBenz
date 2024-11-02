
    const scriptURL = 'https://script.google.com/macros/s/AKfycbz8wKWEhQVsJlKUODdFKTYqxj0z6JEtIovmnz-4H51KDa3qN7VIxLBp-MJa1t5lxsDCVg/exec';
    const form = document.forms['booking-form'];

    form.addEventListener('submit', e => {
    e.preventDefault();

    fetch(scriptURL, {
    method: 'POST',
    body: new FormData(form),
    })
    .then(response => {
    if (!response.ok) {
    throw new Error('Erro ao enviar o formulário');
    }
    window.location.reload();
    })
    .catch(error => console.error('Error!', error.message));
    })

