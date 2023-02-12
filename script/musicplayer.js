const musicWrap=document.querySelector('.wrapper');
        const musicAudio=musicWrap.querySelector('#main-audio');
        const playBtn=musicWrap.querySelector('#play-btn');
        const musicPlay=()=>{
            playBtn.innerHTML='pause'; //musicWrap.querySelector('#play-btn-img').src="~.svg"
            musicAudio.play();
        }
        const musicPause=()=>{
            playBtn.innerHTML='play_arrow';//musicWrap.querySelector('#play-btn-img').src="~.svg"
            musicAudio.pause();
        }
        playBtn.addEventListener('click',()=>{
            let getText=playBtn.innerText; //playBtn.innerHTML
            (getText=='pause')?musicPause():musicPlay();
        });
        let list_index=0; //musicList[0] ~ [5] 순환호출
        const albumImg=musicWrap.querySelector('.m-img>img');
        const m_name=musicWrap.querySelector('.name');
        const m_artist=musicWrap.querySelector('.artist') // musicAudio
        const loadMusic=(num)=>{
            albumImg.src=`images/${musicList[num].img}.png`//img경로
            musicAudio.src=`songs/${musicList[num].audio}.mp3`//audio경로
            m_name.innerText=musicList[num].name;//name 글자정보 글자만 쓰는거면 innerText 사용해도 무관
            m_artist.innerHTML=musicList[num].artist;//artist 글자정보
        }
        window.addEventListener('load',()=>{
            loadMusic(list_index);
        });

        const progressive=musicWrap.querySelector('.m-progress');
        const progressBar=progressive.querySelector('.bar');
        const currentTime=progressive.querySelector('.current');
        const totalTime=progressive.querySelector('.duration');
        //this , event.target , event.currentTarget(this와 같음)
        musicAudio.addEventListener('timeupdate',(event)=>{
            let current=event.target.currentTime;
            let duration=event.target.duration;
            let progressRatio=(current/duration)*100; //백분율
            progressBar.style.width=`${progressRatio}%`;//progreesRatio+'%'
            //재생시간 표시
            //진행바 넓이지정
            let currentMin=Math.floor(current/60);
            let currentSec=Math.floor(current%60);
            if(current<10){ currentSec=`0${currentSec}`;}
            currentTime.innerHTML=`${currentMin}:${currentSec}`;

            musicAudio.addEventListener('loadeddata',(e)=>{
                let totalDuration=musicAudio.duration;
                let totalMin=Math.floor(totalDuration/60);
                let totalSec=Math.floor(totalDuration%60);
                if(totalSec<10){ totalSec=`0${totalSec}`};//"0"+totalSec
                totalTime.innerHTML=`${totalMin}:${totalSec}`;
            //전체 시간표시
            });
        });

        const next=musicWrap.querySelector('#next-btn');
        const prev=musicWrap.querySelector('#prev-btn');
        const nextMusic=()=>{
            list_index++;
            if(list_index>=musicList.length){ list_index=0;}
            // (list_index>=musicList.length)? list_index=0:list_index=list_index
            loadMusic(list_index);
            musicPlay();
        }
        const prevMusic=()=>{
            list_index--;
            if(list_index<0){ list_index=musicList.length-1;}
            loadMusic(list_index);
            musicPlay();
        }
        next.addEventListener('click',()=>{
            nextMusic();
        });
        prev.addEventListener('click',()=>{
            prevMusic();
        });

        /*
            obj.clientWidth , .clientHeight( padding포함 크기 인식 )
            obj.offsetWidth , .offsetHeight ( border 포함 크기 인식 , 자식요소 크기 포함인식 )
            obj.getBoundingClientRect() - .width , .height , ( border+padding 포함 , 소수표기 가능성)
        */
    progressive.addEventListener('click',(e)=>{
        let maxWidth=progressive.clientWidth;
        let clickXposition=e.offsetX;
        let totalDuration=musicAudio.duration;
        musicAudio.currentTime=(clickXposition/maxWidth)*totalDuration;
        musicPlay();
    });
    
    const mRepeat=musicWrap.querySelector('#repeat-btn');
    musicAudio.addEventListener('ended',()=>{
        let getText=mRepeat.innerText;
        if(getText=='repeat'){ nextMusic();} // repeat , repeat-one , shuffle 구분용 조건문
    });