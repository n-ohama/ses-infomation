const { createApp } = Vue;

function getLoginInfo() {
  const LOGIN_EMAIL = 'GSS_LOGIN_EMAIL';
  const LOGIN_PW = 'GSS_LOGIN_PASSWORD';
  const email = localStorage.getItem(LOGIN_EMAIL);
  const password = localStorage.getItem(LOGIN_PW);

  return { email, password };
}

createApp({
  data() {
    return {
      email: 'Hello Vue!',
      password: 'Hello Vue!',
      errorEmail: false,
      errorPassword: false,
      isShowLoginPage: false,
    };
  },
  created() {
    let eye = document.querySelector('.js-eye');
    if (eye) {
      eye.addEventListener('click', function () {
        if (this.previousElementSibling.getAttribute('type') === 'password') {
          this.previousElementSibling.setAttribute('type', 'text');
          this.classList.add('is_show');
        } else {
          this.previousElementSibling.setAttribute('type', 'password');
          this.classList.remove('is_show');
        }
      });

      console.log('count is: ' + this.count); // => "count is: 1"
    }

    setTimeout(() => {
      this.isShowLoginPage = !this.isShowLoginPage;
    }, 20000);

    const info = getLoginInfo();

    if (_.includes(info.email, '@')) {
      $.ajax({
        url: ' https://gsslab-website-api.vercel.app/api/login',
        type: 'POST',
        cache: false,
        dataType: 'json',
        data: info,
      })
        .done((resumes) => {
          console.log('Ajax Response', resumes);
        })
        .fail((err) => {
          // alert('ログインに失敗しました');
          console.log(err);
        });
    } else {
      this.isShowLoginPage = true;
    }
  },
}).mount('#app');
