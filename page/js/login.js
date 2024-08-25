/**
 * ログイン画面
 */
$(function() {
	// ログインボタンクリック
	$("#loginBtn").click(loginCheck);
})
$(function() {
	// ログインボタンクリック
	$("#loginBtn2").click(loginpage);
})

function loginpage(){
	open("loginPage.html")
}

//メッセージの定義
var message = new Object();
message["error001"] = "$1を入力してください。";
message["error002"] = "$1は$2で入力してください。";

//メッセージの呼び出し
function getMessage(id, param1, param2) {
	var m = message[id];
	if (param1 != undefined) {
		m = m.replace("$1", param1);
	}
	if (param2 != undefined) {
		m = m.replace("$2", param2);
	}
	return m;
}

// 入力チェックを行う
function loginCheck() {
	// 出力パラメータ
	var useridItem = "ユーザID";
	var passwordItem = "パスワード";
	var useridType = "[a-z]、[A-Z]、[0-9]、「_」、「-」のみ";
	var passwordType = "[a-z]、[A-Z]、[0-9]のみ";
	var useridLen = "８～20文字";
	var passwordLen = "８～15文字";

	// 入力した値
	var userid = $("#userid").val();
	var password = $("#password").val();

	// 正規表現
	// [\\w-]
	var useridRegExp = /^[a-zA-Z0-9_-]+$/;
	var passwordRegExp = /^[a-zA-Z0-9]+$/;

	// エラーメッセージ
	var errorMsg = new Array();

	// 必須チェック
	if (userid == null || userid.length == 0) {
		errorMsg.push(getMessage("error001", useridItem));
	}
	if (password == null || password.length == 0) {
		errorMsg.push(getMessage("error001", passwordItem));
	}

	// 文字種チェック
	if (!useridRegExp.test(userid)) {
		errorMsg.push(getMessage("error002", useridItem, useridType));
	}
	if (!passwordRegExp.test(password)) {
		errorMsg.push(getMessage("error002", passwordItem, passwordType));
	}

	// 文字数チェック
	if (userid.length < 8 || userid.length > 20) {
		errorMsg.push(getMessage("error002", useridItem, useridLen));
	}
	if (password.length < 8 || password.length > 15) {
		errorMsg.push(getMessage("error002", passwordItem, passwordLen));
	}

	// エラーがある場合はエラーメッセージをJSアラートで表示しつつ自画面遷移
	if (errorMsg.length > 0) {
		alert(errorMsg.join("\n"));
	}
	// エラーがない場合は、ユーザ認証チェックを行う
	else {
		$("#loginForm").submit();
	}
}