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
slider_conteiner=document.querySelector('.byres_slider');
//Кнопка первого слайда
dots='<li><a class="burlakovSlider-dots burlakovSlider-dots-true" id="burlakovSlide-dots-0" onclick="dotsChecked(0); return false;"></a></li>';
//Вспомогательный слайд (копия первого)
div_end=document.querySelectorAll('div.byres_slider div')[0].cloneNode(1);
document.querySelector('.byres_slider').appendChild(div_end);
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
	document.querySelectorAll('div.byres_slider div')[i].classList.add("byres_slider_slide");
	document.querySelectorAll('div.byres_slider div')[i].id='bs_slide-' + i;
	document.getElementById('bs_slide-' + i).style.cssText='left:' + i * 100 + '%;';
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
slider_conteiner.addEventListener('mouseover',function(){slide_hover=true; clearTimeout(autoSwitch);});
slider_conteiner.addEventListener('mouseout',function(){slide_hover=false; if(!slide_click){autoSwitch=setTimeout(slider_btnRight,4200);}});

//Остановка анимации при клике мыши
slider_conteiner.addEventListener('mousedown',function(event){
	if(event.which==1){
		clearTimeout(autoSwitch);
		//console.log('yes'); 
		slide_click=true;
		mause_positionX_start=event.pageX;
		event.preventDefault();
	}
});

//Возобновление анимации при клике мыши==false
document.addEventListener('mouseup',function(event){
	if(event.which==1){
		//console.log('no');
		slide_click=false;
		mause_positionX_end=event.pageX;
		if(mause_positionX_start>mause_positionX_end && 100<Math.abs(mause_positionX_start-mause_positionX_end)){
			setTimeout(slider_btnRight,1);
		}else if(mause_positionX_start<mause_positionX_end && 100<Math.abs(mause_positionX_start-mause_positionX_end)){
			setTimeout(slider_btnLeft,1);
		}else{
			setTimeout(anim_btn,1);
		}
	}
});

document.addEventListener('mousemove',function(event){
	if(slide_click){
		mause_positionX=event.pageX;
		moveMouseX=mause_positionX-mause_positionX_start;
		if(mause_positionX>mause_positionX_start && slide_true==0){
			moovedSlide('transition:none;',slide_count);
		}else if(mause_positionX<mause_positionX_start && slide_true==slide_count){
			moovedSlide('transition:none;',0);
		}else{
			moovedSlide('transition:none;',slide_true);
		}
		//console.log(mause_positionX);
		event.preventDefault();
	}
});

//Кнопка вправо
slider_btnRight=function(){	
	if(slide_true<slide_count){	
		slide_true+=1;
		setTimeout(anim_btn,1);
	}else{
		slide_true=0;
		moovedSlide('transition:none;',slide_true);
		slide_true=1;
		setTimeout(anim_btn,1);
	}
};

//Кнопка влево
slider_btnLeft=function(){
	if(slide_true>0){
		slide_true-=1;
		setTimeout(anim_btn,1);
	}else{
		slide_true=slide_count;
		moovedSlide('transition:none;',slide_true);
		slide_true-=1;
		setTimeout(anim_btn,1);
	}
};

//Выбранная дотс кнопка
function dotsChecked(сheck){
	var сheck=сheck;
	if(сheck<slide_true){
		slide_true=сheck+1;
		return slider_btnLeft();
	}else{
		slide_true=сheck-1;
		return slider_btnRight();
	}
};
