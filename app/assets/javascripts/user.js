$(function() {

var search_list = $(".listview.js-lazy-load-images");

function appendProduct(users) {
    var html = ``
    search_list.append(html);
  }


function appendNoProduct(users) {
  var html = `<li>
                該当するユーザーはいません
              </li>`
  search_list.append(html);
  }

  $("").on("keyup", function() {
    var input = $(".search__query").val();
    $.ajax({
      type: 'GET',
      url: '/products/search',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      console.log(users);
     // $(".listview.js-lazy-load-images").empty();
     // if (products.length !== 0) {
     //   products.forEach(function(product){
     //     appendProduct(product);
     //   });
     // }
     // else {
     //   appendNoProduct("一致する映画はありません");
     // }
    })
    // .fail(function() {
    //   alert('映画検索に失敗しました');
    // })
  });
});
