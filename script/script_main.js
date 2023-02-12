const searchBtn=document.querySelector('#main_header .sub_gnb .search');
const searcharea=document.querySelector('#main_header .sub_gnb .search_area');

searchBtn.addEventListener('click', () =>{
    searcharea.classList.toggle('area');
});

const swiper = new Swiper('.swiper', {
  loop: true,
  speed: 400,
  autoplay:true,
  });


function popup(){
  var url = "musicplayer/musicplayer.html";
  var name = "mood music player";
  var option = "width = 500, height = 700, top = 100, left = 200, location = no"
  window.open(url, name, option);
}
const as=document.querySelectorAll('.btns a');
for(let i=0; i<as.length; i++){
  as[i].addEventListener('click',()=>{
    popup();
  });
}


  $(function(){
    const listNum2=$('.rolling_content>ul').find('li').length; //27
    let totalPageNum=Math.ceil(listNum2/3); // desktop:7씩 보이는 구간, tablet:5씩 보이는 구간(페이지)
    let distance=($('.rolling_content').find('img').width()+40)*3; // desktop 이동거리
    let currentPageIndex=0;
    let targetLeft=0; // -distance*currentPageIndex(0, 1, 2, 3)
    $('.rolling_box>.next').on('click',function(e){
      e.preventDefault();
      if($(window).width()>1024){// desktop
        totalPageNum=Math.ceil(listNum2/3);
        distance=($('.rolling_content').find('img').width()+40)*3;
      }else if($(window).width()>640){// tablet
        totalPageNum=Math.ceil(listNum2/3);
        distance=($('.rolling_content').find('img').width()+15)*3;
      }
      if(currentPageIndex<totalPageNum-1){ // curent<3
        currentPageIndex++;
        // if(currentPageIndex>=totalPageNum){currensPageIndex=totalPageNum-1}
        // if(curent>=4){curent=3}
        targetLeft=-distance*currentPageIndex;
        console.log(targetLeft);
        $('.rolling_content>ul').stop().animate({left:targetLeft}, 500);
      }
    });
  
    $('.rolling_box>.prev').on('click',function(e){
      e.preventDefault();
      if($(window).width()>1024){ //desktop
        totalPageNum=Math.ceil(listNum2/7);
        distance=($('.rolling_content').find('img').width()+40)*7;
      }else if($(window).width()>640){ // tablet
        totalPageNum=Math.ceil(listNum2/5);
        distance=($('.rolling_content').find('img').width()+15)*5;
      }
      if(currentPageIndex>0){
      currentPageIndex--;
      // if(currentPageIndex<0){currentPageIndex=0;}
      targetLeft=-distance*currentPageIndex;
      $('.rolling_content>ul').stop().animate({left:targetLeft}, 500);
      }
    });
  });