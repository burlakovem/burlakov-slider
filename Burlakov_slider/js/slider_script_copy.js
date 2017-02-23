var
slide_count=document.querySelectorAll('div.byres_slider div').length; //Количество слайдов
slide_true=0;//Текущий слайд
slide_hover=false;
slide_click=false;
mause_positionX=0;
mause_positionX_start=0;
mause_positionX_end=0;
moveMouseX=0;
print='';
vspomogatel=0;
slider_content=document.createElement('div');
slider_content.classList.add('slider_content');
slider_conteiner=document.querySelector('.byres_slider');
//Кнопка первого слайда
dots='<li><a class="burlakovSlider-dots burlakovSlider-dots-true" id="burlakovSlide-dots-0" onclick="dotsChecked(0); return false;"></a></li>';
//Вспомогательный слайд (копия первого)
div_end=document.querySelectorAll('div.byres_slider div')[0].cloneNode(1);
document.querySelector('.byres_slider').appendChild(div_end);
document.querySelector('.byres_slider').appendChild(slider_content);
dots_container=document.createElement('ul');
//Контейнер с дотс кнопками
dots_container.style.cssText='width:'+28*slide_count+'px; margin-left:'+(-28*slide_count/2)+'px;';
dots_container.classList.add('burlakovSlider__dots_container');

//Кнопки влево и вправо
print+='<div>';
print+='<a class="byres_slider_btn-left" onclick="slider_btnLeft(); return false;"></a>';
print+='<a class="byres_slider_btn-right" onclick="slider_btnRight(); return false;"></a>';
print+='</div>';

//Стилизуем слайды и кнопки
for(var i=0; i<slide_count+1; i++){
	document.querySelectorAll('div.byres_slider div')[0].classList.add("byres_slider_slide");
	document.querySelectorAll('div.byres_slider div')[0].id='bs_slide-' + i;
	document.getElementById('bs_slide-' + i).style.cssText='left:' + i * 100 + '%;';
	(slider_content.appendChild(document.getElementById('bs_slide-' + i)));
	//document.getElementById('bs_slide-' + i).addEventListener('touchstart',function(event){eventDown(event);});
	if(i!=slide_count && i!=0){
		dots+='<li><li><a class="burlakovSlider-dots burlakovSlider-dots-false" id="burlakovSlide-dots-'+i+'"  onclick="dotsChecked('+i+'); return false;"></a></li>';
	}
};

//Добавляем кнопки влево и вправо
slider_conteiner.innerHTML+=print;
slider_conteiner.appendChild(dots_container);
dots_container.innerHTML+=dots;

//Это даст интересный вид кнопок (на любителя)
for(var i=0; i<slide_count; i+=2){
	document.getElementById('burlakovSlide-dots-'+i).style.cssText='margin-top:15px';
}

//Запоминаем текущий вид slider_conteiner
print=slider_conteiner.innerHTML;

/*
//Делаем иллюзию бесконечного слайда
slider_return= function(){
	moovedSlide('transition:none;');
	slide_true+=vspomogatel;
	setTimeout(anim_btn,1);
};
*/

//Движение слайдов
moovedSlide=function(cssTransition,slide_true){
	for(var i=0; i<slide_count+1; i++){
		document.getElementById('bs_slide-' + i).style.cssText='left:' + ( i-slide_true) * 100 + '%; '+'margin-left:'+moveMouseX+'px; '+cssTransition;
	}
};

//Анимационная смена слайда
anim_btn= function(){	
	clearTimeout(autoSwitch);
	moveMouseX=0;
	moovedSlide('',slide_true);
	
	//Удаляем класс текущей выбранной кнопки
	document.querySelector('.burlakovSlider-dots-true').classList.add('burlakovSlider-dots-false');
	document.querySelector('.burlakovSlider-dots-true').classList.remove('burlakovSlider-dots-true');
	
	//Назначаем класс новой выбранной кнопки
	if(slide_true<slide_count){
		document.getElementById('burlakovSlide-dots-'+slide_true).classList.add("burlakovSlider-dots-true");
		document.getElementById('burlakovSlide-dots-'+slide_true).classList.remove("burlakovSlider-dots-false");
	}else{
		document.getElementById('burlakovSlide-dots-0').classList.add("burlakovSlider-dots-true");
		document.getElementById('burlakovSlide-dots-0').classList.remove("burlakovSlider-dots-false");
	}
	
	//Автоматизация смены слайда при наведении мыши слайдер останавливается
	if(!slide_hover && !slide_click){
		autoSwitch=setTimeout(slider_btnRight,4200);
	}
};	
//Автоматизация смены слайда
autoSwitch=setTimeout(anim_btn,1);

//Возобновление и остановка анимации при наведение мыши
slider_content.addEventListener('mouseover',function(){slide_hover=true; clearTimeout(autoSwitch);});
slider_content.addEventListener('mouseout',function(){slide_hover=false; if(!slide_click){autoSwitch=setTimeout(slider_btnRight,4200);}});

//Остановка анимации при клике мыши
slider_content.addEventListener('mousedown',function(event){eventDown(event);});
slider_content.addEventListener('touchstart',function(event){eventDown(event);});
eventDown=function(event){
	if(event.which==1 || event.targetTouches!=undefined){
		clearTimeout(autoSwitch);
		//console.log('yes'); 
		slide_click=true;
		mause_positionX_start=event.pageX || event.changedTouches[0].pageX;
		event.preventDefault();
	}
}

//Возобновление анимации при клике мыши==false
document.addEventListener('mouseup',function(event){eventUp(event,150);});
document.addEventListener('touchend',function(event){eventUp(event,50);});
eventUp=function(event,pxLeaght){
	if(slide_click){
		//console.log('no');
		slide_click=false;
		mause_positionX_end=(event.changedTouches==undefined)?event.pageX:event.changedTouches[0].pageX;
		if(mause_positionX_start>mause_positionX_end && pxLeaght<Math.abs(mause_positionX_start-mause_positionX_end)){
			setTimeout(slider_btnRight,1);
		}else if(mause_positionX_start<mause_positionX_end && pxLeaght<Math.abs(mause_positionX_start-mause_positionX_end)){
			setTimeout(slider_btnLeft,1);
		}else{
			mouseMove(mause_positionX_end);//поведение слайдов при отпускании мышки
			setTimeout(anim_btn,20);
		}
	}
}

//Поведение слайдов, когда курсор двигается
document.addEventListener('mousemove',function(event){eventMove(event)});
document.addEventListener('touchmove',function(event){eventMove(event)});
eventMove=function(event){
	if(slide_click && slide_hover || slide_click && event.changedTouches!=undefined){
		mause_positionX=event.pageX || event.changedTouches[0].pageX;
		moveMouseX=mause_positionX-mause_positionX_start;
		setTimeout(mouseMove,1,mause_positionX);//поведение слайдов при движении зажатой мышки
		//console.log(mause_positionX);
		event.preventDefault();
	}else if(slide_click && !slide_hover || slide_click && event.changedTouches==undefined){
		eventUp(event,50)
	}
}

//поведение слайдов при отпускании или движении мышки
mouseMove=function(mause_positionX_end){
	if(slide_true==0 && mause_positionX_end>mause_positionX_start){
		slide_true=(!slide_click)?slide_count:slide_true;
		setTimeout(moovedSlide,1,'transition:none;',slide_count);
	}else if(slide_true==slide_count && mause_positionX_end<mause_positionX_start){
		slide_true=(!slide_click)?0:slide_true;
		setTimeout(moovedSlide,1,'transition:none;',0);
	}else{
		if(slide_click){moovedSlide('transition:none;',slide_true);}
	}
}

//Кнопка вправо
slider_btnRight=function(){	
	if(slide_true<slide_count){	
		slide_true+=1;
		setTimeout(anim_btn,1);
	}else{
		slide_true=0;
		setTimeout(moovedSlide,1,'transition:none;',slide_true);
		slide_true=1;
		setTimeout(anim_btn,20);
	}
};

//Кнопка влево
slider_btnLeft=function(){
	if(slide_true>0){
		slide_true-=1;
		setTimeout(anim_btn,1);
	}else{
		slide_true=slide_count;
		setTimeout(moovedSlide,1,'transition:none;',slide_true);
		slide_true-=1;
		setTimeout(anim_btn,20);
	}
};

//Выбранная дотс кнопка
function dotsChecked(сheck){
	if(slide_true==slide_count){setTimeout(moovedSlide,1,'transition:none;',0);}
	var сheck=сheck;
	if(сheck<slide_true){
		slide_true=сheck+1;
		return setTimeout(slider_btnLeft,1);
	}else{
		slide_true=сheck-1;
		return setTimeout(slider_btnRight,1);
	}
};
