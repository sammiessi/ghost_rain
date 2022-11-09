//화면 자체에 이벤트를 다는 것! key event -> 용사의 움직임
//e = 이벤트 정보
document.addEventListener("keydown", function (e) {
  console.log(e.keyCode);
  const heroLeft = getComputedStyle(heroElement).left; //getComputedStyle = 아직 HTML 인라인 스타일에 없기 때문에
  console.log("용사의 왼쪽 값은: ", heroLeft); // "400px" 식으로 표현되는 문자열임

  //문자열이라 숫자로 바꾸어주어야 연산 가능 -> Number()
  //split("px")[0] 의미 = "px"기준으로 나눈 후 배열을 만든다 -> 그중 index0
  const heroLeftWithoutPx = Number(heroLeft.split("px")[0]); //문자열이라 숫자로 바꾸어주어야 연산 가능 -> Number()
  console.log("heroLeftWithoutPx = ", heroLeftWithoutPx);

  //한없이 밖으로 나가면 안 돼! 용사의 left가 0보다 작아지거나 or 765(BG_WIDTH - HERO_WIDTH)보다 커질 때 그만!
  if (
    (heroLeftWithoutPx - 20 < 0 && e.keyCode === 37) ||
    (heroLeftWithoutPx + 20 > BG_WIDTH - HERO_WIDTH && e.keyCode === 39)
  ) {
    /*1. 오른쪽으로 다시 올 수 있어야 됨! 따라서 "왼쪽 키 누르면서" 조건 추가
    2. 팔 한 짝이 튀어나왔다 -> 시작점이 left=0 이었기 때문. 따라서, <key를 한 번 눌렀을 때> 기준으로 넥스트 스텝을 고려해서 "-10" 해줌*/
    return; //함수를 종료해라!
  }

  if (e.keyCode === 37) {
    //37 = 왼쪽키
    heroElement.style.left = heroLeftWithoutPx - 20 + "px"; //단위가 꼭 필요해서 px 문자열 붙임!
    heroElement.className = "left"; //왼쪽 키 -> css > left 클래스에 지정한 왼쪽 모습을 보이게 지정
    // console.log("용사의 왼쪽 값 -1: ", heroLeftWithoutPx - 10);
  } else if (e.keyCode === 39) {
    //39 = 오른쪽키
    heroElement.style.left = heroLeftWithoutPx + 20 + "px";
    heroElement.className = "right"; //오른쪽 키 -> css > right 클래스에 지정한 오른쪽 모습을 보이게 지정
    // console.log("용사의 왼쪽 값 +1: ", heroLeftWithoutPx + 10);
  }
});
/* 1. keydown: 누르는 순간부터 용사가 움직이게
2. heroElement 접근 안 해도 쓸 수 있는 이유 -> html 하단 script 순서: 먼저 hero.js에서 선언을 함, 따라서 접근 가능
--> 아예 settings.js에서 접근을 해버리고 html 하단, js 중 가장 먼저 놓으면 다른 js 파일에서도 그냥 다 쓸 수 있음
3. */

document.addEventListener("keyup", function () {
  heroElement.className = "stop"; //키를 떼면 -> css > stop 클래스에 지정한 정면 모습을 보이게
});
