window.onload = function () {

  const holes = document.querySelectorAll('.hole');
  const scoreBoard = document.querySelector('.score');
  const moles = document.querySelectorAll('.mole');
  const startBtn = document.getElementById('start_btn');
  let titleH1 = document.getElementById('title');

  let lastHole;
  let timeUp = false;
  let score = 0;
  let gameTime = 10000;
  let curGame;

  let randomTool  = {
    randomHole : ()=> {
      let a;
      do {
        a = Math.floor(Math.random() * 6);
      }while (a === lastHole);
      lastHole = a;
      return a;
    },
    randomTime : ()=>{
      return Math.random() * 500 + 500;
    }
  };

  startBtn.addEventListener('click', function () {
    showBtnAnimation();
    startGame();
  }, false);

  //添加点击得分事件
  moles.forEach((val)=>{
    val.onclick = ()=>{
      if(!timeUp){
        score ++;
        scoreBoard.innerText = score;
        val.parentElement.classList.remove('up');
      }
    }
  });

  function showBtnAnimation() {
    event.preventDefault();

    startBtn.classList.add('animate');
    // 按钮动画延时，按钮动画结束后发生的事：换为正常状态（class中的animate去掉），开始按钮消失
    setTimeout(() => {
      startBtn.classList.remove('animate');
      startBtn.style.display = 'none';
    }, 700);
  }

  function startGame() {
    timeUp = false;
    score = 0;

    curGame = moleUp();
    setTimeout(endGame,gameTime);
  }
  //包含出现和消失,由0开始编号
  function moleUp(){
    let index = randomTool.randomHole();
    holes[index].classList.add('up');

    return setTimeout(()=>{
      holes[index].classList.remove('up');
      curGame = nextMoleUp(index);
    },randomTool.randomTime());
  }
  function nextMoleUp(cur) {
    holes[cur].classList.remove('up');
    return moleUp();
  }
  function endGame(){
    clearTimeout(curGame);
    holes.forEach((val)=>{
      val.classList.remove('up');
    });
    startBtn.innerText = "Replay!";
    startBtn.style.display = "inline-block";
  }
};