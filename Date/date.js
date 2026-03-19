const displayElement = document.getElementById('datetime-display');

//array แปลงเลขเป็นชื่อเดือน
const thaiMonths = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
];

function formatThaiDateTime(isoString) {
    const dateObj = new Date(isoString);
    
    const day = dateObj.getDate();
    const month = thaiMonths[dateObj.getMonth()];
    const year = dateObj.getFullYear() + 543; // แปลงเป็น พ.ศ.

    //เติม 0 ข้างหน้าถ้าหลักเดียว (9:0:0 จะเป็น 09:00:00)
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');

    return `วันที่ ${day} ${month} ${year} เวลา ${hours}:${minutes}:${seconds} น.`;
}

function fetchTime() {
    //ทำ Timeout ให้กับ Fetch API ใช้ AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
        controller.abort(); //ยกเลิก Request ถ้าเกิน 3 วิ
    }, 3000);

    fetch('https://learningportal.ocsc.go.th/learningspaceapi/localdatetime', { signal: controller.signal }).then(response => {
        clearTimeout(timeoutId);
        
        if (response.ok) { //200 Ok
            return response.json(); //json() returns a promise
        } else {
            throw new Error('Network response was not ok'); //throw error ให้ไปเข้า .catch() เมื่อสถานะไม่สำเร็จ
        }
    }).then((data) => {
    
        const thaiFormattedText = formatThaiDateTime(data.datetime);
        displayElement.innerText = thaiFormattedText;
        displayElement.classList.remove('error');
        
        console.log(data.datetime);
    }).catch(e => {
        //เข้า Catch ถ้าปิดเน็ต หรือ Timeout
        displayElement.innerText = "ระบบเครือข่ายล้มเหลว";
        displayElement.classList.add('error');
        
        console.log(e.toString());
    });
}

fetchTime();

//call API อัปเดตทุก 1 วิ
setInterval(fetchTime, 1000);
