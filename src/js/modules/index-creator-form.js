import { _createElement } from '../utils/helpers';

class Form {
  createForm() {
    const formEl = _createElement('form', { className: 'form page__form' });

    let nameField, emailField, textButton;

    if (localStorage.getItem('lang') === 'ru') {
      nameField = this._createField('text', 'Введите ваше имя');
      emailField = this._createField('email', 'Введите ваш Email');
      textButton = 'Отправить';
    } else {
      nameField = this._createField('text', 'Type your Name');
      emailField = this._createField('email', 'Type your Email');
      textButton = 'Send Message';
    }

    const button = `
    <button type="submit" class="page__button">
      ${textButton}
      <i class="icon-plus"></i>
    </button>
    `;

    formEl.insertAdjacentHTML('afterbegin', nameField);
    formEl.insertAdjacentHTML('beforeend', emailField);
    formEl.insertAdjacentHTML('beforeend', button);
    formEl.onsubmit = this.onSubmitForm;

    return formEl;
  }

  onSubmitForm(e) {
    const postData = async (url, data) => {
      document.querySelector('.form__message').classList.add('info');
      document.querySelector('.form__message').textContent = messages.loading;
      let res = await fetch(url, {
        method: 'POST',
        body: new FormData(data)
      });

      return await res.text();
    };

    let messages = {};

    if (localStorage.getItem('lang') === 'ru') {
      messages = {
        loading: 'загрузка...',
        success: 'Сообщение успешно отправлено',
        error: 'Упс! Что-то пошло не так'
      };
    } else {
      messages = {
        loading: 'loading...',
        success: 'Thx! Success',
        error: 'Oops! Error'
      };
    }

    let statusMessage = _createElement('div', {
      className: 'form__message message'
    });

    this.appendChild(statusMessage);

    e.preventDefault();

    postData('/server.php', this)
      .then(res => {
        document.querySelector('.form__message').classList.add('success');
        document.querySelector('.form__message').textContent = messages.success;
      })
      .catch(err => {
        document.querySelector('.form__message').classList.add('error');
        document.querySelector('.form__message').textContent = messages.error;
      })
      .finally(() => {
        setTimeout(() => {
          document.querySelector('.form__message').remove();
          document
            .querySelectorAll('.form__input')
            .forEach(item => (item.value = ''));
        }, 5000);
      });
  }

  _createField(type, placeholder, contentIns = '', className = 'form__input') {
    const fieldForm = `
    <label class="form__item">
      <input
        type="${type}"
        name="${type}"
        class="${className}"
        placeholder="${placeholder}"
      />
      ${contentIns}
    </label>
    `;

    return fieldForm;
  }
}

export default Form;
