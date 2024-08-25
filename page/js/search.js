/**
 * 検索DVD画面
 */
$(document).ready(function() {
	if ($("#result").length > 0) {
		var height = $('#result').offset().top;
		$('html, body').animate({ scrollTop: height });
		// $(window).scrollTop(height);
	}

	$('#result').DataTable({
		responsive: true,
		language: {
			url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/ja.json',
		}
	});
});

function detailDVD(id) {
	open("/brightstar/dvd/detail?id=" + id, "_blank", "width=800px, height=600px, left=200px");
}

function deleteDVD(id, name) {
	var result = confirm("DVD「" + name + "」を削除してもよろしいですか？");

	if (result) {
		// location.href = "/brightstar/dvd/delete?id=" + id + "&name=" + name;

		// AJAX通信を開始
		$.ajax({
			// データの送信先
			url: "/brightstar/dvd/delete",
			// メソッド
			type: "post",
			// 送信するデータ
			data: {
				"id": id,
				"name": name
			}
		})
			// AJAXリクエストが成功（ステータスコード200）した場合の処理
			.done(function(msg) {
				alert(msg);
				$("#searchForm").submit();
			})
			// リクエストが失敗した場合の処理
			.fail(function() { })
	}
}