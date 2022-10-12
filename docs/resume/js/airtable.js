// var xhr = new XMLHttpRequest();
// xhr.open('POST', 'https://gsslab-website-api.vercel.app/api/get_all_resume');
// xhr.addEventListener('load', onLoadFunc, false);
// xhr.send(null);

// $.ajax({
//   url: ' https://gsslab-website-api.vercel.app/api/get_all_resume', //アクセスするURL
//   type: 'post',         //post or get
//   cache: false,        //cacheを使うか使わないかを設定
//   dataType:'json',     //data type script・xmlDocument・jsonなど
//   data:{},           //アクセスするときに必要なデータを記載
// })

// .done(function(onLoadFunc) {
//   //通信成功時の処理
//   //成功したとき実行したいスクリプトを記載
//   console.log(onLoadFunc);
// })

// .fail(function(xhr) {  
//   //通信失敗時の処理
//   //失敗したときに実行したいスクリプトを記載
//   console.log(xhr);
// })

// .always(function(xhr, msg) { 
//   //通信完了時の処理
//   //結果に関わらず実行したいスクリプトを記載
//   console.log(xhr, msg);
// });   

// // // response を 画面に表示するコードを書く
// // response.data.each((resume) => {
// // $(‘#result’).append(‘<div>
// // <p>resume.name<p>
// // </div>’)
// // })