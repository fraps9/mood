const searchBtn=document.querySelector('#main_header .sub_gnb .search');
const searcharea=document.querySelector('#main_header .sub_gnb .search_area');

searchBtn.addEventListener('click', () =>{
    searcharea.classList.toggle('area');
});

  function popup(){
    var url = "../musicplayer/musicplayer.html";
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
  