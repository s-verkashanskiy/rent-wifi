document.forms.signup?.addEventListener('submit', async (event) => {
  // Отменяем дефолтное реагирование на нажатие кнопки
  event.preventDefault();

  const { method, action, username, email, password } = event.target;
  // Формируем AJAX запрос к сервуру, передавая введенные в форму данные
  try {
    const response = await fetch(action, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Считываем значение из полей формы (относительно нажатой кнопки)
        username: username.value,
        email: email.value,
        password: password.value,
      }),
    });
    
    // есть ошибки ...
    const { status, errUnqUser, errUnqEmail, error } = await response.json();
    if (status === 200) {
      window.location.href = '/login';
      return;
      // if (status) document.location.replace("/login");
    }

    // Обработка ошибок уникальности логина и почты
    if (errUnqUser || errUnqEmail) {
      document.getElementById('errors-unique').innerHTML =
        render('partials/error', { errUnqUser, errUnqEmail });
    };
    // Обработка ошибок уникальности на уровне БД
    if (error) {
      document.getElementById('errors-error').innerHTML =
        render('partials/error', { error });
    };

  } catch (err) { console.error(err); }
});

// const div_element = event.target.parentElement.nextElementSibling;
// div_element.classList.toggle('hidden');




function render(templateName, data = {}) {
  const str = document.getElementById(`${templateName}Template`).content.textContent;
  return window.Handlebars.compile(str)(data);
}

const dropdown1 = document.querySelector('.dropdown-trigger');
const options = {
  hover: false,
  closeOnClick: true,
};
M.Dropdown.init(dropdown1, options);
const select12 = document.querySelector('#select');
M.FormSelect.init(select12);
