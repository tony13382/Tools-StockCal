/*試算法切換*/
var count_way = "price";

function change_count_way() {
    if (count_way == "price") {
        count_way = "persent";
        document.getElementById("show_on_countway").innerHTML = "％ 比例試算";
    } else {
        count_way = "price";
        document.getElementById("show_on_countway").innerHTML = "＄ 價格試算";
    }
}

function count_price_stock(mode) {
    try {
        var set_stock_price = parseFloat(document.getElementById("set_stock_price").value);
        var set_stock_num = parseFloat(document.getElementById("set_stock_num").value);
        var set_commi = parseFloat(document.getElementById("set_commi").value);
        var set_discount_per = parseFloat(document.getElementById("set_discount_per").value);
        var set_discount_price = parseFloat(document.getElementById("set_discount_price").value);
        var set_tax_per = parseFloat(document.getElementById("set_tax_per").value);
		//count
        var count = new stock_fun;
    	count.setValue(mode, set_stock_price, set_commi, set_stock_num, set_discount_per, set_discount_price, set_tax_per);
		count.outputSOL();
    } catch (Erre) {
        var set_stock_price = 100;
        var set_stock_num = 1
        var set_commi = 0.1425;
        var set_discount_per = 100;
        var set_discount_price = 0;
        var set_tax_per = 0.3;
        UIkit.notification({
            message: "演算法有誤(ConvertNum@Cal)",
            status: 'warning',
            timeout: '2000'
        });
    }
}

class stock_fun {
	setPrice(price){
		this.price = (price);
	}
	setMode(mode){
		this.mode=mode;
	}
    setValue(getmode, getprice, getcommi, getnum, getdisper, getdisprice, gettaxper) {
        this.mode = (getmode);/*0 means buy | 1 means sell*/
        this.price = (getprice);
        this.set_commi = (getcommi);
        this.stock_num = (getnum);
        this.disper = (getdisper);
        this.disprice = (getdisprice);
        this.taxper = (gettaxper);
    }
    get sale_mode() {
        if (this.mode == 0) {
            return '購入';
        } else if (this.mode == 1) {
            return '售出';
        } else {
            return '404';
        }
    }
    get stock_price_count() {
        return (this.price * this.stock_num * 1000);
    }
    get commi() {
        let buy_commi = ((this.stock_price_count * this.set_commi / 100) * (this.disper / 100) - this.disprice);
        buy_commi = Math.round(buy_commi);
        if (buy_commi <= 20 && mincommi) {
            return 20;
        } else {
            return buy_commi;
        }
    }
    get tax_count() {
        if (this.mode == 0) {
            return 0;
        } else {
            let tax = Math.round(this.stock_price_count * this.taxper / 100);
            return tax;
        }
    }
    get total() {
        if (this.mode == 0) {
            return (this.stock_price_count + this.commi);
        } else if (this.mode == 1) {
            return (this.stock_price_count - this.commi - this.tax_count);
        } else {
            return 404;
			UIkit.notification({
            	message: "程序有誤(getTitle)",
            	status: 'warning',
            	timeout: '2000'
        	});
        }
    }
	setTitle(){
		if (this.mode == 0) {
            document.getElementById("total_title").innerHTML = "購入成本";
        } else if (this.mode == 1) {
            document.getElementById("total_title").innerHTML = "出售取得";
        } else {
            UIkit.notification({
            	message: "程序有誤(setTitle)",
            	status: 'warning',
            	timeout: '2000'
        	});
        }
	}
	outputSOL() {
        let sol_mode = this.sale_mode;
        let sol_stock_price = this.stock_price_count;
      	let sol_commi = this.commi;
		let sol_tax = this.tax_count;
		let sol_total = this.total;
        document.getElementById("sol_mode").innerHTML = sol_mode;
        document.getElementById("sol_stock_price").innerHTML = sol_stock_price + "";
        document.getElementById("sol_commi").innerHTML = sol_commi + "";
        document.getElementById("sol_tax").innerHTML = sol_tax + "";
        document.getElementById("sol_total").innerHTML = sol_total + "";
		this.setTitle();
    }
}


function count_stock() {
    //get set
    try {
        var count_target = parseFloat(document.getElementById("count_target").value);
        var count_gap = parseFloat(document.getElementById("count_gap").value);
    } catch (Err) {
        UIkit.notification({
            message: "損益與演算法選擇有誤",
            status: 'warning',
            timeout: '2000'
        });
    }
    //set count
    try {
        var set_stock_price = parseFloat(document.getElementById("set_stock_price").value);
        var set_stock_num = parseFloat(document.getElementById("set_stock_num").value);
        var set_commi = parseFloat(document.getElementById("set_commi").value);
        var set_discount_per = parseFloat(document.getElementById("set_discount_per").value);
        var set_discount_price = parseFloat(document.getElementById("set_discount_price").value);
        var set_tax_per = parseFloat(document.getElementById("set_tax_per").value);
		
		var set_target_value = parseFloat(document.getElementById("count_target").value);
		var set_gap_value = parseFloat(document.getElementById("count_gap").value);
        if (set_gap_value >= 10) {
            if (set_stock_price >= 1000) {
                set_gap_value = 5;
            }
            else if (set_stock_price >= 500){
                set_gap_value = 1;
            }
            else if (set_stock_price >= 100){
                set_gap_value = 0.5;
            }
            else if (set_stock_price >= 50){
                set_gap_value = 0.1;
            }
            else if (set_stock_price >= 10){
                set_gap_value = 0.05;
            }
            else if (set_stock_price >= 0){
                set_gap_value = 0.01;
            }
            else{
                set_gap_value = 0.05;
                console.log("ERR AUTO GAP")
            }
        }
		var target = 0;
		
		var count = new stock_fun;
    	count.setValue(0, set_stock_price, set_commi, set_stock_num, set_discount_per, set_discount_price, set_tax_per);
		if (isNaN(set_tax_per) || isNaN(set_discount_price) || isNaN(set_discount_per) || isNaN(set_commi) || isNaN(set_stock_num) || isNaN(set_stock_price)) {
            UIkit.notification({
                message: "INPUT INFORMATION ERROR(@ToolSet) ",
                status: 'warning',
                timeout: '2000'
            });
        }
    } catch (Erre) {
        var set_stock_price = 100;
        var set_stock_num = 1
        var set_commi = 0.1425;
        var set_discount_per = 100;
        var set_discount_price = 0;
        var set_tax_per = 0.3;
    }
	
    if (count_mode == "E") {
        document.getElementById("show_count_mode").innerHTML = "益";
        if (count_way == "persent") {target = count.total * set_target_value / 100;} 
		else if (count_way == "price") {target = set_target_value;} 
		else { window.alert("WAY ERROR");}
		let n1 = 0;
		let n2 = count.total;
		let num = 0;
		count.setMode(1);
		let sub = 0;
		do{
			count.setPrice(set_stock_price + set_gap_value * num);
			num++;
			n1 = count.total;
			sub = n1 - n2;
		}while(sub<=target);
		document.getElementById("show_count_target").innerHTML = set_stock_price + set_gap_value * num;
		document.getElementById("show_count_target_price").innerHTML = target;
		document.getElementById("show_count_price").innerHTML = sub;
		document.getElementById("show_count_sell").innerHTML = n1;
		document.getElementById("show_count_buy").innerHTML = n2;
		
    } 
	else if (count_mode == "S") {
        document.getElementById("show_count_mode").innerHTML = "損";
        if (count_way == "persent") {target = (-1 * count.total) * set_target_value / 100;} 
		else if (count_way == "price") {target = -1 * set_target_value;} 
		else {window.alert("WAY ERROR");}
		let n1 = 0;
		let n2 = count.total;
		let num = 0;
		count.setMode(1);
		let sub = 0;
		do{
			count.setPrice(set_stock_price + set_gap_value * num);
			num--;
			n1 = count.total;
			sub = n1 - n2;
		}while(sub>=target);
		document.getElementById("show_count_target").innerHTML = set_stock_price + set_gap_value * num;
		document.getElementById("show_count_target_price").innerHTML = target;
		document.getElementById("show_count_price").innerHTML = sub;
		document.getElementById("show_count_sell").innerHTML = n1;
		document.getElementById("show_count_buy").innerHTML = n2;
    } 
	else {window.alert("MODE ERROR")}
}
