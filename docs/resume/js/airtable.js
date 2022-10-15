function toggleModal() {
  // モーダル用
  const elems = document.querySelectorAll('.card');

  elems.forEach((elem, index) => {
    // 各モーダルをクリックするとオーバーレイと、モーダルが表示
    elem.addEventListener('click', function () {
      let modalTarget = this.dataset.jsNum;
      let modal = document.querySelector('.js-modal_' + modalTarget);
      let overlay = document.querySelector('.js-overlay');
      let modalClose = document.querySelectorAll('.js-close')[index];
      modal.classList.toggle('is_show');
      overlay.classList.toggle('is_show');
      modalClose.classList.toggle('is_show');

      // オーバーレイをクリックすると、オーバーレイとモーダルのis_showクラスを除去
      overlay.addEventListener('click', () => {
        modal.classList.remove('is_show');
        overlay.classList.remove('is_show');
      });
      // 閉じるボタンをクリックすると、オーバーレイとモーダルのis_showクラスを除去
      modalClose.addEventListener('click', () => {
        modal.classList.remove('is_show');
        overlay.classList.remove('is_show');
      });
    });
  });
}

function renderModals(resumes) {
  $('#render-modals').html('');

  $(resumes).each((index, resume) => {
    resume.salary = _.floor(resume.Salary / 10000, 1);
    resume.picture = resume.Picture[0].url;
    resume.skills = _.reduce(
      resume.Skills,
      (m, skill, key) => {
        return m + `<li class="badge_item bgc_orange">${skill}</li>`;
      },
      '',
    );

    resume.fw = _.reduce(
      resume.Framework,
      (m, fw, key) => {
        return m + `<li class="badge_item bgc_pink">${fw}</li>`;
      },
      '',
    );

    $('#render-modals').append(`
    
    <div class="modal js-modal_${index + 1}">
    <div class="modal_inner">
      <div class="modal_content">
          <header class="modal_header">
            <figure class="modal_figure"><img src="${resume.picture}" alt=""></figure>
            <div class="modal_header_right">
                <div class="modal_header_sp">
                    <p class="modal_name">
                      ${resume.Name}<span class="modal_name_age"> (${resume.Age}歳)</span>
                    </p>
                    <div class="modal_meta">
                        <div class="modal_meta_box">
                            <img src="img/badge_gold.png" alt="gold">
                            <p class="modal_meta_text">${resume.Rank}</p>
                        </div>
                        <div class="modal_meta_box">
                            <img src="img/icon_area.svg" alt="">
                            <p class="modal_meta_text">フィリピン}</p>
                        </div>
                        <p class="modal_price"><span class="modal_price_big">
                          <span class="pc">ご契約金額：</span>
                          ${resume.salary}万円</span> / 月
                        </p>
                    </div>
                </div>
                <div class="modal_badge">
                    <div class="badge_box">
                      <p class="badge_title">ポジション</p>
                      <ul class="badge_list badge_list-hasPositon">
                        <li class="badge_item bgc_blue-position">${resume.Position}</li>
                      </ul>
                    </div>
                    <div class="badge_box">
                      <p class="badge_title">スキル</p>
                      <ul class="badge_list">${resume.skills}</ul>
                    </div>
                    <div class="badge_box">
                      <p class="badge_title">フレームワーク</p>
                      <ul class="badge_list">${resume.fw}</ul>
                    </div>
                </div>
            </div>
        </header>
        <div class="modal_body">
            <!-- modal_postWrapは今後の拡張性で追加しています -->
            <div class="modal_postWrap">
                <p class="modal_title_sub">経歴</p>
                <div class="modal_post">
                    <pre>${resume.WorkHistory}</pre>
                </div>
            </div>
        </div>

        <footer class="modal_footer">
            <div class="modal_btnWrap">
                <a class="modal_btn modal_btn-close js-close">閉じる</a>
            </div>
        </footer>
    </div>
    </div>
    
    `);
  });
}

function renderResumes(resumes) {
  $('#render-resumes').html('');

  $('#number-of-list').text(_.size(resumes) + ' 名のエンジニアが見つかりました');

  $(resumes).each((index, resume) => {
    resume.salary = _.floor(resume.Salary / 10000, 1);
    resume.picture = resume.Picture[0].url;
    resume.skils = _.reduce(
      resume.Skills,
      (m, skill, key) => {
        return m + `<li class="badge_item bgc_orange">${skill}</li>`;
      },
      '',
    );

    $('#render-resumes').append(`
    <li class="card" data-js-num="${index + 1}">
    <div class="card_header">
        <figure class="card_figure">
          <img src="${resume.picture}" alt="">
        </figure>
        <div class="card_header_right">
            <h2 class="card_name">
              ${resume.Name}<br><span class="card_name_age">(${resume.Age}歳)</span>
            </h2>
            <div class="card_rank">
                <img src="img/badge_gold.png" alt="gold">
                <p class="card_rank_text">${resume.Rank}</p>
            </div>
            <p class="card_price">
              <span class="card_price_big">${resume.salary}万円</span> / 月</p>
        </div>
    </div>
    <div class="card_body">
        <div class="card_body_top">
            <div class="badge_box">
                <p class="badge_title">ポジション</p>
                <ul class="badge_list badge_list-hasPositon">
                    <li class="badge_item bgc_blue-position">${resume.Position}</li>
                </ul>
            </div>
            <div class="badge_box">
                <p class="badge_title">スキル</p>
                <ul class="badge_list">${resume.skils}</ul>
            </div>
        </div>
        <div class="card_body_bottom">
            <h3 class="card_title_sub">経歴</h3>
            <p class="card_desc">${resume.WorkHistory}</p>
        </div>
    </div>
    </li>
    `);
  });

  renderModals(resumes);

  toggleModal();
}

$.ajax({
  url: ' https://gsslab-website-api.vercel.app/api/get_all_resume',
  type: 'POST',
  cache: false,
  dataType: 'json',
  data: {},
})
  .done((resumes) => {
    console.log('Ajax Response', resumes);

    const positions = _.uniq(_.map(resumes.data, 'Position'));
    const positionTags = _.reduce(
      positions,
      (m, p, key) => {
        return m + `<option value="${p}">${p}</option>`;
      },
      '<option value="all" selected>全てのポジション</option>',
    );
    $('#position-filter').append(positionTags);

    renderResumes(resumes.data);

    $('#position-filter').change((e) => {
      console.log(e.target.value);

      if (e.target.value === 'all') return renderResumes(resumes.data);

      const list = _.filter(resumes.data, { Position: e.target.value });
      renderResumes(list);
    });
  })
  .fail((err) => {
    alert('履歴書データの取得に失敗しました');
    renderResumes([]);
    console.log(err);
  });
