// 고스트 생성 함수
function createGhost() {
  const ghostElement = document.createElement("div");
  ghostElement.style.position = "absolute";
  ghostElement.style.top = "0px";

  let randomLeft = randomNum(); //755 이하 랜덤 숫자 호출
  ghostElement.style.left = randomLeft + "px"; //"px" 단위 필요

  ghostElement.style.width = GHOST_WIDTH + "px";
  ghostElement.style.height = GHOST_HEIGHT + "px";
  ghostElement.style.background = 'url("./images/ghost.png") no-repeat';

  bgElement.appendChild(ghostElement);

  setInterval(function () {
    //1. 생성된 고스트 요소에 접근
    //2. top값 가져온다 & 3. 2번에서 숫자 추출 후, 1 + px
    let ghostTopNum = Number(ghostElement.style.top.split("px")[0]) + 15;

    //유령 죽었을 때 이미지 바꾸기! image sprite
    function killGhost(ghostElement) {
      ghostElement.style.backgroundPosition = "-45px 0px";

      setTimeout(function () {
        ghostElement.remove();
      }, 200);
    }

    let ghostLeftNum = Number(ghostElement.style.left.split("px")[0]);
    let heroLeftNum = Number(heroElement.style.left.split("px")[0]);
    if (ghostTopNum > BG_HEIGHT - (HERO_HEIGHT + GHOST_HEIGHT)) {
      if (
        ghostLeftNum < heroLeftNum &&
        heroLeftNum < ghostLeftNum + GHOST_WIDTH
      ) {
        killGhost(ghostElement);
        return;
      }
    }

    //3': 배경 밑에 안 넘어가게 값 조절
    if (ghostTopNum > BG_HEIGHT - GHOST_HEIGHT - 2) {
      ghostElement.remove();
      return;
    }

    //4. 다시 할당한다
    ghostElement.style.top = ghostTopNum + "px";
  }, 100); //0.1초에 한 번씩 떨어지게
}

createGhost();

//유령 폭우!! 2초마다
setInterval(createGhost, 2000);

//랜덤 넘버 만드는 함수
function randomNum() {
  // left가 0 ~ 755(800-유령 가로 45 ... 삐져나오기 때문에) 사이에 랜덤 정수 생성
  let randomNumUnder755 = Math.floor(Math.random() * 755);
  return randomNumUnder755;
}
