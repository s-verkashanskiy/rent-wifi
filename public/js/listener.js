// if (document.getElementById('qqq')) {
//   document.getElementById('qqq').addEventListener('click', async (event) => {
//     try {
//       if (event.target.id === 'stat') {
//       // Отменяем дефолтное реагирование на нажатие кнопки
//         event.preventDefault();

//         // Формируем AJAX запрос к сервуру, передавая введенные в форму данные
//         const responseponse = await fetch('/stat', { method: 'GET' });
//         const { status, username, rounds } = await responseponse.json();

//         if (status === 200) {

//         }
//       }
//     } catch (err) { console.error(err); }
//   });
// }

if (document.forms.signup) {
  document.forms.signup.addEventListener('submit', async (event) => {
    try {
      // Отменяем дефолтное реагирование на нажатие кнопки
      event.preventDefault();

      const {
        method, action, username, email, password,
      } = event.target;
      // Формируем AJAX запрос к сервуру, передавая введенные в форму данные
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
      // Перейти на страницу аутентификации если нет ошибок
      
      // есть ошибки ...
      const { status, errUnqUser, errUnqEmail, error } = await response.json();
      if (status === 200) {
        window.location.href = '/login';
        // if (status) document.location.replace("/login");
      }
      
      // Обработка ошибок уникальности логина и почты
      if (errUnqUser || errUnqEmail) {
        document.getElementById('errors-unique').innerHTML =
        render('error', { errUnqUser, errUnqEmail });
      };
      // Обработка ошибок уникальности на уровне БД
      if (error) {
        document.getElementById('errors-error').innerHTML =
        render('error', { error });
      };
      
    } catch (err) { console.error(err); }
  });
}

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
