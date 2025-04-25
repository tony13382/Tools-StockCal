/**
 * 快速計算機功能模塊
 * 改進版本：修復遞歸調用問題，限制記錄數量，統一代碼風格
 */

// 計算記錄最大保存數量
const MAX_RECORDS = 10;
// 保存計算記錄的數組
let calculationRecords = [];

/**
 * 執行減法計算並顯示結果
 */
function dis() {
    const n1 = parseInt(document.getElementById("quick_cal_n1").value, 10);
    const n2 = parseInt(document.getElementById("quick_cal_n2").value, 10);
    
    if (isNaN(n1) || isNaN(n2)) {
        UIkit.notification({
            message: "請先輸入數值在上兩格中",
            status: 'warning',
            timeout: 2000 // 移除不必要的引號
        });
        
        // 清空輸入框而不是將值設為0
        return;
    }
    
    // 檢查計算結果是否會超出安全範圍
    if (Math.abs(n1) > Number.MAX_SAFE_INTEGER || Math.abs(n2) > Number.MAX_SAFE_INTEGER) {
        UIkit.notification({
            message: "數值過大，可能導致計算不準確",
            status: 'warning',
            timeout: 2000
        });
    }
    
    const result = n1 - n2;
    document.getElementById("quick_cal_ans").value = result;
    addRecord(n1, n2, result);
}

/**
 * 將計算結果填入被減數欄位
 */
function sol_to_n1() {
    // 統一使用原生 DOM API
    const totalElement = document.getElementById("sol_total");
    const convert = parseInt(totalElement.textContent, 10);
    
    if (isNaN(convert)) {
        UIkit.notification({
            message: "請先進行買入賣出計算",
            status: 'warning',
            timeout: 2000
        });
    } else {
        document.getElementById("quick_cal_n1").value = convert;
        document.getElementById("quick_cal_ans").value = "";
    }
}

/**
 * 將計算結果填入減數欄位
 */
function sol_to_n2() {
    // 統一使用原生 DOM API
    const totalElement = document.getElementById("sol_total");
    const convert = parseInt(totalElement.textContent, 10);
    
    if (isNaN(convert)) {
        UIkit.notification({
            message: "請先進行買入賣出計算",
            status: 'warning',
            timeout: 2000
        });
    } else {
        document.getElementById("quick_cal_n2").value = convert;
        document.getElementById("quick_cal_ans").value = "";
    }
}

/**
 * 添加計算記錄到列表
 * @param {number} n1 - 被減數
 * @param {number} n2 - 減數
 * @param {number} result - 計算結果
 */
function addRecord(n1, n2, result) {
    // 創建新記錄
    const newRecord = {
        n1, 
        n2, 
        result,
        timestamp: new Date()
    };
    
    // 將新記錄添加到數組開頭
    calculationRecords.unshift(newRecord);
    
    // 限制記錄數量
    if (calculationRecords.length > MAX_RECORDS) {
        calculationRecords = calculationRecords.slice(0, MAX_RECORDS);
    }
    
    // 更新顯示
    updateRecordDisplay();
}

/**
 * 更新記錄顯示
 */
function updateRecordDisplay() {
    const recordListElement = document.getElementById("record-list");
    
    if (calculationRecords.length === 0) {
        recordListElement.textContent = "無計算紀錄";
        return;
    }
    
    // 使用安全的方法構建HTML
    const recordsHTML = calculationRecords.map(record => {
        // 使用模板字符串提高可讀性
        return `
            <div class="uk-margin-small-bottom">
                ${record.n1} - ${record.n2} = <br>
                <span class='uk-badge'>${record.result}</span>
            </div>
            <hr>
        `;
    }).join('');
    
    // 使用一次性操作更新DOM，減少重繪
    recordListElement.innerHTML = recordsHTML;
}

/**
 * 清空計算記錄
 */
function clearRecord() {
    calculationRecords = [];
    const recordListElement = document.getElementById("record-list");
    recordListElement.textContent = "無計算紀錄";
}

/**
 * 安全地設置元素的HTML內容
 * @param {HTMLElement} element - 目標DOM元素
 * @param {string} html - 要設置的HTML內容
 */
function setElementHTML(element, html) {
    if (!element) {
        console.error("目標元素不存在");
        return;
    }
    
    element.innerHTML = html;
}

// 替換原有的有問題的setInnerhtmlAt函數
function setInnerhtmlAt(element, html, count) {
    if (!element) return;
    
    element.innerHTML = html;
    
    // 確保count有值且小於5
    if (count === undefined) {
        count = 1;
    }
    
    // 如果內容為空且嘗試次數少於5次，則重試
    if (element.innerHTML === '' && count < 5) {
        setTimeout(() => {
            // 修復了遞歸調用，現在正確調用setInnerhtmlAt
            setInnerhtmlAt(element, html, count + 1);
        }, 50);
    }
}