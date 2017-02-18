var
slide_count=document.querySelectorAll('div.byres_slider div').length; //Количество слайдов
slide_true=0;//Текущий слайд
print='';
vspomogatel=0;
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

document.querySelector('.byres_slider').innerHTML+=print;
document.querySelector('.byres_slider').appendChild(dots_container);
dots_container.innerHTML+=dots;

//Это даст интересный вид кнопок (на любителя)
for(var i=0; i<slide_count; i+=2){
	document.getElementById('burlakovSlide-dots-'+i).style.cssText='margin-top:15px';
}

print=document.querySelector('div.byres_slider').innerHTML;

//Делаем иллюзию бесконечного слайда
slider_return= function(){
	for(var i=0; i<slide_count+1; i++){
		document.getElementById('bs_slide-' + i).style.cssText='left:' + ( i-slide_true) * 100 + '%;  transition:none;';
	}
	slide_true+=vspomogatel;
	setTimeout(anim_btn,1);
};

//Анимационная смена слайда
anim_btn= function(){	
	clearTimeout(autoSwitch);
	for(var i=0; i<slide_count+1; i++){
		document.getElementById('bs_slide-' + i).style.cssText='left:' + ( i-slide_true) * 100 + '%;';
	}
	//Автоматизация смены слайда
	autoSwitch=setTimeout(slider_btnRight,2700);
	
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
};	
//Автоматизация смены слайда
autoSwitch=setTimeout(anim_btn,1);

//Кнопка вправо
slider_btnRight=function(){
	if(slide_true<slide_count){	
		slide_true+=1;
		setTimeout(anim_btn,1);
	}else{
		slide_true=0;
		vspomogatel=1;
		return slider_return();
	}
};

//Кнопка влево
slider_btnLeft=function(){
	if(slide_true>0){
		slide_true-=1;
		setTimeout(anim_btn,1);
	}else{
		slide_true=slide_count;
		vspomogatel=-1;
		return slider_return();
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
}