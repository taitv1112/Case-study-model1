let canvas = document.getElementById('gamezone');
let context = canvas.getContext('2d');
let scoreshow = document.getElementById('score');
let highScoreshow = document.getElementById("hightScore");
let check = false;
const birdimg = new Image();
const backGround = new Image();
const pipeNorth = new Image();
const pipeSouth = new Image();

birdimg.src = "images/bird.png";
backGround.src = "images/nenchinh.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";



const spaceBetweenTwoPipesY = 150; // mình xin phép đặt tên tiếng việt để các bạn dễ hình dung
let spaceNorthToSouth; // biến này là khoảng cách từ đầu ống trên đến vị trí đầu ống dưới
// tạo ra 1 object chim với tọa độ x y là 1 nữa canvas

class Bird {
    x;
    y;
    speed;

    constructor(x, y, speed) {
        this.speed = speed;
        this.x = x;
        this.y = y;
    }

    updateBird() {
        this.x = backGround.width / 5;
        this.y = backGround.height / 2;
    }
}

let bird = new Bird(backGround.width / 5, backGround.height / 2, 60)

class Score {
    score = 0;
    maxScore = 0;
    constructor(score, maxScore) {
        this.score = score;
        this.maxScore = maxScore;
    }

    clearScore() {
        this.score = 0;
    }

    getMaxScore() {
        return this.maxScore;
    }

    setMaxScore(maxScore) {
        this.maxScore = maxScore
    }

}

let score = new Score(0,0);

let pipe = []; //tạo mảng ống để chứa các ống di chuỷen
pipe[0] = {
    x: canvas.width,
    y: 0 // khởi tạo ống đầu tiên nằm bên phải ngoài cùng và y=0;
}

//tạo function để chạy trò chơi
function play() {
    // load hình ảnh vào
    context.drawImage(backGround, 0, 0);
    context.drawImage(birdimg, bird.x, bird.y);

    for (let i = 0; i < pipe.length; i++) {
        spaceNorthToSouth = pipeNorth.height + spaceBetweenTwoPipesY;
        context.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        context.drawImage(pipeSouth, pipe[i].x, pipe[i].y + spaceNorthToSouth);
        pipe[i].x -= 5; //để ống di chuyển
        // khi ống di chuyển đến giữa
        // nó sẽ tạo thêm 1 ống nữa
        if (pipe[i].x === canvas.width / 2) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            })
        }
        // if (pipe[i].x === 0) pipe.splice(0, 1);// nếu ống đụng lề trái thì xóa nó đi
        if (pipe[i].x === bird.x) {
            score.score+= 1;
            if(score.score<score.maxScore){
                score.maxScore = score.score;
                console.log(score.maxScore)
            }
        }
        // giờ làm cái khó nhất là thua
        if (bird.y + birdimg.height === canvas.height ||
            bird.x + birdimg.width >= pipe[i].x && bird.x <= pipe[i].x + pipeNorth.width
            && (bird.y <= pipe[i].y + pipeNorth.height ||
                bird.y + birdimg.height >= pipe[i].y + spaceNorthToSouth)
        ) {
            check = true

            return check;

        }
    }
    scoreshow.innerHTML = "score: " + score.score;
    // cho bird rơi xuống
    bird.y += 3;
    requestAnimationFrame(play);

}

//thêm function cho nó bay lên khi nhấn
document.addEventListener("click", function () {
    bird.y -= bird.speed;
})

function UpdatePipe() {
    pipe = [];
    pipe[0] = {
        x: canvas.width,
        y: 0
    }
}

function start() {
    bird.updateBird();
    UpdatePipe()
    play();
}

function reset() {
    bird.updateBird();
    UpdatePipe()
    score.clearScore();
}

