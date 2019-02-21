let gallery = {
  init (){
    this.imgCount = document.querySelectorAll('.dg-wrapper >a').length;
    this.current = 1;
    this.calcPosition();
    this.run();
  },
  calcPosition (){
    let left = (this.current === 1)?this.imgCount:(this.current - 1);
    let outLeft = (left === 1)?this.imgCount:(left - 1);
    let right = (this.current === this.imgCount)?1:this.current + 1;
    let outRight = (right === this.imgCount)?1:right + 1;

    this.curEle = document.querySelector(`.dg-wrapper a:nth-child(${this.current})`);
    this.leftEle = document.querySelector(`.dg-wrapper a:nth-child(${left})`);
    this.rightEle = document.querySelector(`.dg-wrapper a:nth-child(${right})`);
    this.outLeftEle = document.querySelector(`.dg-wrapper a:nth-child(${outLeft})`);
    this.outRightEle = document.querySelector(`.dg-wrapper a:nth-child(${outRight})`);
  },
  nextAnimation (){
    this.current = (this.current === this.imgCount)?1:this.current + 1;
    this.outLeftEle.className = "";
    this.calcPosition();
    this.run();
  },
  run (){
    this.curEle.className = "show change current";
    this.leftEle.className = "show change left";
    this.rightEle.className = "show change right";
    this.outLeftEle.className = "change outleft";
    this.outRightEle.className = "change outright";
    // 显示网址
    this.curEle.querySelector('div').style.display = "block";
    this.leftEle.querySelector('div').style.display = "none";
    // 防止中间元素被右边覆盖
    this.curEle.style.zIndex = '100';
    this.leftEle.style.zIndex = '1';
  }
};

window.onload = ()=>{
  gallery.init();
  setInterval(()=>{gallery.nextAnimation()},2000);
};
