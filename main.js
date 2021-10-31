let canvas = document.getElementById('gamezone');
let  context = canvas.getContext('2d');
let  scoreshow = document.getElementById('score');

const birdimg = new Image();
const hinhnenchinh = new Image();
const ongtren = new Image();
const ongduoi = new Image();
birdimg.src = "images/bird.png";
hinhnenchinh.src = "images/nenchinh.png";
ongtren.src = "images/ongtren.png";
ongduoi.src = "images/ongduoi.png";
// đầu tiên là nạp các hình vô nha các bạn :)
// bước 2 là tạo 1 số biến cần thiết

let  score = 0;
const khoangcachhaiong = 140; // mình xin phép đặt tên tiếng việt để các bạn dễ hình dung
let  khoangcachdenongduoi; // biến này là khoảng cách từ đầu ống trên đến vị trí đầu ống dưới
// tạo ra 1 object chim với tọa độ x y là 1 nữa canvas
let  bird = {
    x: hinhnenchinh.width / 5,
    y: hinhnenchinh.height / 2
}
let  ong = []; //tạo mảng ống để chứa các ống di chuỷen
    ong[0] = {
        x: canvas.width,
        y: 0 // khởi tạo ống đầu tiên nằm bên phải ngoài cùng và y=0;
}
let mouse = { //tọa độ con trỏ chuột
    x: canvas.width / 2,
    y: canvas.height / 2
};


//tạo function để chạy trò chơi
function run() {
    // load hình ảnh vào
    context.drawImage(hinhnenchinh, 0, 0);
    context.drawImage(birdimg, bird.x, bird.y);

    for (let i = 0; i < ong.length; i++) {
        khoangcachdenongduoi = ongtren.height + khoangcachhaiong;
        context.drawImage(ongtren, ong[i].x, ong[i].y);
        // vẽ ống trên theo tọa độ của ống đó
        //  ống dưới phụ thuộc ống trên
        context.drawImage(ongduoi, ong[i].x, ong[i].y + khoangcachdenongduoi);
        // mình lấy vị trí ống trên cộng khoảng cách đến
        // ống dưới vì tí nữa mình random nó lên xuống
        ong[i].x -= 5; //để ống di chuyển

        // lập trình thêm ống khi ống di chuyển đến giữa
        // nó sẽ tạo thêm 1 ống nữa
        if (ong[i].x === canvas.width / 2) {
            ong.push({
                x: canvas.width,
                y: Math.floor(Math.random() * ongtren.height) - ongtren.height
                // ở đây mình sẽ làm video giải thích sau về
                // random này các bạn làm theo là được
            })
        }
        if (ong[i].x === 0) ong.splice(0, 1);
        // nếu ống đụng lề trái thì xóa nó đi để tránh mảng ống
        //  bị đầy làm chậm
        if (ong[i].x === bird.x) score++;
        // giờ làm cái khó nhất là thua  
        if (bird.y + birdimg.height === canvas.height || bird.x + birdimg.width >= ong[i].x && bird.x <= ong[i].x + ongtren.width
            && (bird.y <= ong[i].y + ongtren.height ||
                bird.y + birdimg.height >= ong[i].y + khoangcachdenongduoi)
        ) {
            return;
        }
    }
    scoreshow.innerHTML = "score: " + score;
    // cho bird rơi xuống
    bird.y += 3;
    requestAnimationFrame(run);
}

//thêm function cho nó bay lên khi nhấn
document.addEventListener("keydown", function () {
    bird.y -= 60;
})

run();