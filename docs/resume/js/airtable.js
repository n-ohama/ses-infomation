let pageNum = 1;
const query = location.search;
pageNum = Number(query.replace('?page=', ''));

if (pageNum === 0) {
  pageNum = 1;
}

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
      let modalHeadercloseBtn = document.querySelectorAll('.js-modalHeadercloseBtn')[
        index
      ];
      modal.classList.toggle('is_show');
      overlay.classList.toggle('is_show');
      modalClose.classList.toggle('is_show');
      modalHeadercloseBtn.classList.toggle('is_show');

      // オーバーレイをクリックすると、オーバーレイとモーダルのis_showクラスを除去
      overlay.addEventListener('click', () => {
        $(`#interviewVideo${index}`).attr(
          'src',
          $(`#interviewVideo${index}`).attr('src'),
        );
        modal.classList.remove('is_show');
        overlay.classList.remove('is_show');
      });
      // 閉じるボタンをクリックすると、オーバーレイとモーダルのis_showクラスを除去
      modalClose.addEventListener('click', () => {
        $(`#interviewVideo${index}`).attr(
          'src',
          $(`#interviewVideo${index}`).attr('src'),
        );
        modal.classList.remove('is_show');
        overlay.classList.remove('is_show');
      });
      // モーダルヘッダー閉じるボタンをクリックすると、オーバーレイとモーダルのis_showクラスを除去
      modalHeadercloseBtn.addEventListener('click', () => {
        $(`#interviewVideo${index}`).attr(
          'src',
          $(`#interviewVideo${index}`).attr('src'),
        );
        modal.classList.remove('is_show');
        overlay.classList.remove('is_show');
      });
    });
  });
}

function renderModals(resumes) {
  $('#render-modals').html('');

  $(resumes).each((index, resume) => {
    if (resume?.Card_Display) {
      resume.salary = _.floor(resume.Salary / 10000, 1);
      resume.picture = resume.Picture ? resume.Picture[0].url : null;
      resume.skills = resume.Skills
        ? _.reduce(
            resume.Skills,
            (m, skill, key) => {
              return (
                m +
                `<li class="badge_item ${badgeLightColor[skill.length]}">${skill}</li>`
              );
            },
            '',
          )
        : `<li class="badge_item badge_light_9">調整中</li>`;

      resume.fw = resume.Framework
        ? _.reduce(
            resume.Framework,
            (m, fw, key) => {
              return (
                m + `<li class="badge_item ${badgeLightColor[fw.length]}">${fw}</li>`
              );
            },
            '',
          )
        : `<li class="badge_item badge_light_9">調整中</li>`;

      $('#render-modals').append(`
      
      <div class="modal js-modal_${index + 1}">
      <div class="modal_inner">
        <div class="modal_content">
            <header class="modal_header">
              <button class="modal_header_close_btn js-modalHeadercloseBtn"></button>
              <figure class="modal_figure"><img src="${
                resume.picture
                  ? resume.picture
                  : resume.Gender && resume.Gender !== '男性'
                  ? './img/female_user_default_image.png'
                  : './img/user_default_image.png'
              }" alt="${resume.Name}"></figure>
              <div class="modal_header_right">
                  <div class="modal_header_sp">
                      <p class="modal_name">
                        ${
                          resume.Nickname ? resume.Nickname : '名前（調整中）'
                        }<span class="modal_name_age"> ${
        resume.Age ? `(${resume.Age}歳)` : ''
      } ${resume?.Gender ?? ''}</span>
                      </p>
                      <div class="modal_meta">
                          <div class="modal_meta_box">
                              <img src="${
                                resume.Rank
                                  ? rankingList[resume.Rank]
                                  : 'img/badge_gold.png'
                              }" alt="gold">
                              <p class="modal_meta_text">${
                                resume.Rank ? resume.Rank : 'ランク（調整中）'
                              }</p>
                          </div>
                          <div class="modal_meta_box">
                              <img src="img/icon_area.svg" alt="">
                              <p class="modal_meta_text">フィリピン</p>
                          </div>
                          <p class="modal_price"><span class="modal_price_big">
                            <span class="pc">ご契約金額：</span>
                            ${
                              resume.salary
                                ? `${resume.salary}万円</span> <span class="excluded_tax">(税抜)</span> / 月`
                                : '調整中'
                            }
                          </p>
                      </div>
                  </div>
                  <div class="modal_badge">
                      <div class="badge_box">
                        <p class="badge_title">ポジション</p>
                        <ul class="badge_list badge_list-hasPositon">
                            ${
                              resume.Position
                                ? `<li class="badge_item ${
                                    badgePositionTagColor[resume.Position]
                                  }">${resume.Position}</li>`
                                : `<li class="badge_item badge_item--default_color badge_light_9">調整中</li>`
                            }
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
                    ${
                      resume.WorkHistory
                        ? `<pre>${resume.WorkHistory}</pre>`
                        : '※現在調整中です'
                    }
                  </div>

                  <!-- modal_post直下にCMS機能が入るイメージ -->
                  <p class="modal_title_sub">面接動画</p>
                  <div class="modal_post modal_post_interview_video">
                      <div class="center">
                      ${
                        resume.InterviewUrl
                          ? `<iframe id="interviewVideo${index}" style="width: 680px; height: 360px;" src="${resume.InterviewUrl}" width="640" height="480" allow="autoplay"></iframe>`
                          : `<img src="./img/default_interview_video.png">`
                      }
                      </div>
                      <a class="modal_meta_text_center" href="https://otter.ai/u/abS2AjB95TRwumYKLsMuysxu0So?f=%2Fmy-notes&tab=summary">面接内容書き起こし</a>
                  </div>
                  
                  <!-- modal_post直下にCMS機能が入るイメージ -->
                  ${
                    resume.Comment
                      ? `<p class="modal_title_sub">GSSからのコメント</p>
                        <div class="modal_post">
                            <p>${resume.Comment}</p>
                            ${
                              resume.CodeExam !== '未実施'
                                ? `<div class="modal_post_code">コードテスト結果：<span class="textC_purple">${resume.CodeExam}</span></div>`
                                : ''
                            }
                        </div>`
                      : ``
                  }
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
    }
  });
}

function renderResumes(resumes) {
  const resumes1 = resumes
    .filter((item) => item.Card_Display)
    .slice((pageNum - 1) * 12, pageNum * 12);
  let resumeCount = 0;

  $('#render-resumes').html('');

  $('#number-of-list').text(_.size(resumes) + ' 名のエンジニアが見つかりました');

  $(resumes1).each((index, resume) => {
    if (resume?.Card_Display) {
      resume.salary = _.floor(resume.Salary / 10000, 1);
      resume.picture = resume.Picture ? resume.Picture[0].url : null;
      resume.skils = resume.Skills
        ? _.reduce(
            resume.Skills,
            (m, skill, key) => {
              return (
                m +
                `<li class="badge_item ${badgeLightColor[skill.length]}">${skill}</li>`
              );
            },
            '',
          )
        : `<li class="badge_item badge_light_9">調整中</li>`;

      $('#render-resumes').append(`
      <li class="card" data-js-num="${index + 1}">
      <div class="card_header">
          <figure class="card_figure">
            <img src="${
              resume.picture
                ? resume.picture
                : resume.Gender && resume.Gender !== '男性'
                ? './img/female_user_default_image.png'
                : './img/user_default_image.png'
            }" alt="${resume.Name}">
          </figure>
          <div class="card_header_right">
              <h2 class="card_name">
              ${
                resume.Nickname ? resume.Nickname : '名前（調整中）'
              }<br><span class="card_name_age">${resume.Age ? `(${resume.Age}歳)` : ''} ${
        resume?.Gender ?? ''
      }</span>
              </h2>
              <div class="card_rank">
                  <img src="${
                    resume.Rank ? rankingList[resume.Rank] : 'img/badge_gold.png'
                  }" alt="gold">
                  <p class="card_rank_text">${
                    resume.Rank ? resume.Rank : 'ランク（調整中）'
                  }</p>
              </div>
              <p class="card_price">
                <span class="card_price_big">${
                  resume.salary
                    ? `${resume.salary}万円</span> <span class="excluded_tax">(税抜)</span> / 月`
                    : '金額（調整中）'
                }</p>
          </div>
      </div>
      <div class="card_body">
          <div class="card_body_top">
              <div class="badge_box">
                  <p class="badge_title">ポジション</p>
                  <ul class="badge_list badge_list-hasPositon">
                    ${
                      resume.Position
                        ? `<li class="badge_item ${
                            badgePositionTagColor[resume.Position]
                          }">${resume.Position}</li>`
                        : `<li class="badge_item badge_item--default_color badge_light_9">調整中</li>`
                    }
                  </ul>
              </div>
              <div class="badge_box">
                  <p class="badge_title">スキル</p>
                  <ul class="badge_list">${resume.skils}</ul>
              </div>
          </div>
          <div class="card_body_bottom">
              <h3 class="card_title_sub">経歴</h3>
              ${
                resume.WorkHistory
                  ? `<p class="card_desc">${resume.WorkHistory}</p>`
                  : '※現在調整中です'
              }
          </div>
      </div>
      </li>
      `);

      resumeCount += 1;
    }
  });

  $('#number-of-list').text(resumeCount + ' 名のエンジニアが見つかりました');

  renderModals(resumes);

  toggleModal();
}

/**
 * Filter condition for position, skills and rank
 *
 * @param {Object} resumes
 * @param {String} positionValue
 * @param {String} rankValue
 * @param {String} skillValue
 *
 * @returns array
 */
const resumeFilterCondition = (resumes, positionValue, rankValue, skillValue) => {
  let filterValues = {};
  let resumeList = resumes;

  if (rankValue !== 'all') {
    Object.assign(filterValues, { Rank: rankValue });
  }

  if (positionValue !== 'all') {
    Object.assign(filterValues, { Position: positionValue });
  }

  if (skillValue !== 'all') {
    resumeList = _.filter(
      resumeList,
      (resume) =>
        resume.Skills.includes(skillValue) || resume.Framework.includes(skillValue),
    );
  }

  return _.filter(resumeList, filterValues);
};

$.ajax({
  url: ' https://gsslab-website-api.vercel.app/api/get_all_resume',
  type: 'POST',
  cache: false,
  dataType: 'json',
  data: {},
})
  .done((resumes) => {
    const positions = _.compact(_.uniq(_.map(resumes.data, 'Position')));
    const skills = _.uniq(_.map(resumes.data, 'Skills'));
    const frameworks = _.uniq(_.map(resumes.data, 'Framework'));
    const rank = rankingList;
    const skillList = _.compact(_.union(skills.flat(), frameworks.flat()));
    console.log('abbbbcccddd', _.map(resumes.data, 'Position'), resumes.data);

    const positionTags = _.reduce(
      positions,
      (m, p, key) => {
        return m + `<option value="${p}">${p}</option>`;
      },
      '<option value="all" selected>全てのポジション</option>',
    );
    $('#position-filter').append(positionTags);

    const rankTags = _.reduce(
      rank,
      (m, p, key) => {
        return m + `<option value="${key}">${key}</option>`;
      },
      '<option value="all" selected>全てのランク</option>',
    );
    $('#rank-filter').append(rankTags);

    const skillTags = _.reduce(
      skillList,
      (m, p, key) => {
        return m + `<option value="${p}">${p}</option>`;
      },
      '<option value="all" selected>全てのスキル</option>',
    );
    $('#skill-filter').append(skillTags);

    renderResumes(resumes.data);

    $('#position-filter').change((e) => {
      console.log(e.target.value);

      const positionValue = e.target.value;
      const rankValue = $('#rank-filter').val();
      const skillValue = $('#skill-filter').val();

      if (positionValue === 'all' && rankValue === 'all' && skillValue === 'all')
        return renderResumes(resumes.data);

      const list = resumeFilterCondition(
        resumes.data,
        positionValue,
        rankValue,
        skillValue,
      );
      renderResumes(list);
    });

    $('#rank-filter').change((e) => {
      console.log(e.target.value);

      const rankValue = e.target.value;
      const positionValue = $('#position-filter').val();
      const skillValue = $('#skill-filter').val();

      if (positionValue === 'all' && rankValue === 'all' && skillValue === 'all')
        return renderResumes(resumes.data);

      const list = resumeFilterCondition(
        resumes.data,
        positionValue,
        rankValue,
        skillValue,
      );
      renderResumes(list);
    });

    $('#skill-filter').change((e) => {
      console.log(e.target.value);

      const skillValue = e.target.value;
      const positionValue = $('#position-filter').val();
      const rankValue = $('#rank-filter').val();

      if (positionValue === 'all' && rankValue === 'all' && skillValue === 'all')
        return renderResumes(resumes.data);

      const list = resumeFilterCondition(
        resumes.data,
        positionValue,
        rankValue,
        skillValue,
      );
      renderResumes(list);
    });
  })
  .fail((err) => {
    alert('履歴書データの取得に失敗しました');
    renderResumes([]);
    console.log(err);
  });
