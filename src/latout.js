/*設定20是否為手續費最小值*/
var mincommi = new Boolean(true);

function change_mincommi() {
    if (mincommi) {
        mincommi = false;
        document.getElementById("show_tax_on").innerHTML = "現在關閉";
        document.getElementById("show_tax_on").className = "uk-button uk-button-danger";
    } else {
        mincommi = true;
        document.getElementById("show_tax_on").innerHTML = "現在開啟";
        document.getElementById("show_tax_on").className = "uk-button uk-button-primary";
    }
}
/*損益模式切換外觀*/
var count_mode = "E";

function change_count_mode() {
    if (count_mode == "E") {
        count_mode = "S";
        document.getElementById("show_on_countmode").innerHTML = "&darr;   現在為損";
        document.getElementById("show_on_countmode").className = "uk-button uk-button-danger";
    } else if (count_mode == "S") {
        count_mode = "E";
        document.getElementById("show_on_countmode").innerHTML = "&uarr;   現在為益";
        document.getElementById("show_on_countmode").className = "uk-button uk-button-primary";
    } else {}
}
/*設定證交稅試算金額*/
function set_tax_per(set_num) {
    document.getElementById("set_tax_per").value = set_num + "";
}
/*RESET 預設值*/
function reset_value() {
    document.getElementById("set_stock_price").value = "0";
    document.getElementById("set_stock_num").value = "1";
    document.getElementById("set_commi").value = "0.1425";
    document.getElementById("set_discount_per").value = "100";
    document.getElementById("set_discount_price").value = "0";
    document.getElementById("set_tax_per").value = "0.3";
}
