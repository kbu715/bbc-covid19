(() => {
  //bird 날라가게 하는 함수

  const actions = {
    birdFlies() {
      //객체의 메소드
      document.querySelector(
        '[data-index="2"] .bird'
      ).style.transform = `translateX(${window.innerWidth}px)`;
      //data-index="2" 인 속성을 가진 elem의 bird 클래스를 가진 자식
    },
    birdFlies2() {
      //객체의 메소드
      document.querySelector(
        '[data-index="5"] .bird'
      ).style.transform = `translateX(${window.innerWidth}px)`;
      //data-index="2" 인 속성을 가진 elem의 bird 클래스를 가진 자식
    },
  };

  const stepElems = document.querySelectorAll('.step');
  const graphicElems = document.querySelectorAll('.graphic-item');
  let currentItem = graphicElems[0]; // 현재 활성화된(visible가 붙은) .graphic-item을 지정
  let ioIndex;
  //intersection ovserver
  //관찰 대상이 사라지거나 추가될 때 콜백함수가 실행된다.
  const io = new IntersectionObserver((entries, observer) => {
    // console.log(entries[0].target.dataset.index);
    ioIndex = entries[0].target.dataset.index * 1;
  });

  for (let index = 0; index < stepElems.length; index++) {
    io.observe(stepElems[index]); // 모든 step (말풍선) 들이 관찰 대상으로 등록된다.

    // stepElems[i].setAttribute('data-index', i);

    // 또는

    stepElems[index].dataset.index = index; //data- : 이 속성은 dataset이라는 객체가 미리 만들어져 있다. 속성이름을 index로 할거니깐 .index로 했다.
    graphicElems[index].dataset.index = index;
  }

  function activate(action) {
    currentItem.classList.add('visible');

    if (action) {
      actions[action]();
    }
  }
  function inactivate() {
    currentItem.classList.remove('visible');
  }

  window.addEventListener('scroll', () => {
    let step;
    let boundingRect;
    let temp = 0;

    for (let index = ioIndex - 1; index < ioIndex + 2; index++) {
      step = stepElems[index];
      if (!step) {
        continue;
      }
      boundingRect = step.getBoundingClientRect();
      //   console.log(boundingRect);

      temp++;
      if (
        boundingRect.top > window.innerHeight * 0.1 &&
        boundingRect.top < window.innerHeight * 0.8
      ) {
        // console.log(step.dataset.index);

        inactivate();

        currentItem = graphicElems[step.dataset.index];
        activate(currentItem.dataset.action);
      }
    }

    console.log(temp); //loop몇번도는지 확인하기 위한 변수
  });
  activate();
})(); //즉시 실행 함수!!!
