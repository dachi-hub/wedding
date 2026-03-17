const form = document.querySelector('.event-form');
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxvKjPJ-XIXi13RVTyvxOWvGiK26iMdyp6pr-QOqrvDWwvPvXABxAmK8I1Pn-EN1ZA33w/exec';
const submitBtn = form.querySelector('.submit-btn');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    form.classList.add('form-disabled');
    submitBtn.classList.add('btn-loading');
    submitBtn.disabled = true;

    const formData = new FormData(form);
    const params = new URLSearchParams();
    const multiValueFields = ['drink', 'food'];

    for (const key of formData.keys()) {
        if (multiValueFields.includes(key)) {
            const values = formData.getAll(key).join(', ');
            params.set(key, values);
        } else if (!params.has(key)) {
            params.set(key, formData.get(key));
        }
    }
    fetch(WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: params
    })
        .then(() => {
            alert('Ваш выбор сохранен!');
            form.reset();
        })
        .catch(err => {
            console.error('Ошибка:', err);
            alert('Произошла ошибка при отправке. Попробуйте еще раз.');
        })
        .finally(() => {
            form.classList.remove('form-disabled');
            submitBtn.classList.remove('btn-loading');
            submitBtn.disabled = false;
        });
});

