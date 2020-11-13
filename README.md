# Maker
Meow LU (Foxxing Girl)

# Function
stock_fun()
* setValue(getmode, getprice, getcommi, getnum, getdisper, getdisprice, gettaxpe)設定所有數值
    * getmode (0買入,1賣出)
    * getprice (float 單一股價)
    * getcommi (float 手續費基本為0.1425)
    * getnum (int 股票張數)
    * getdisper (int 手續費折扣後%數 100~0)
    * getdisprice (int 手續費折扣金額 min:0)
    * gettaxpe (float 稅金%數 0.1 0.15 0.3)
* setPrice(int) 設定單一股價
* setMode(int) 設定(0買入,1賣出)
* sale_mode 輸出 模式名稱
* stock_price_count 輸出 單純股價
* commi 輸出 手續費
* tax_count 輸出 稅金
* total 輸出 總金額
* mode 輸出 模式(0 or 1)
* price 輸出單一股價金額
* set_commi 輸出 銀行手續費
* stock_num 輸出 張數
* disper 輸出 折扣後比例
* disprice 輸出 折扣金額
* taxper 輸出 稅比例

