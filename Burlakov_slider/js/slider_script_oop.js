function initBurlakovSlider(burlakov_sc){
	//Публичные переменные
	var this_=this;
	this_.transition=0.45;		//Скорость смены слайда
	this_.slideTimeOut=4200;	//Перерыв между сменой слайда
	this_.dotsEnable=true;		//Показывать дотс кнопки
	this_.dotsStyle=0;			//Стиль дотс
	this_.reverse=false;		//Реверсировать направление слайдов
	this_.autoPlay=true;		//Автоматическая смена слайда
	this_.mouseDown=true;		//Дейтсвия при зажатой кнопкой мыши
	this_.touch=true;			//Дейтсвия при тачинге на телефоне
	this_.hoverStop=true;		//Остановка при наведении
	this_.btnLRenable=true;		//Показать кнопки влево/вправо
	this_.slide_true=0;			//Текущий слайд
	this_.resizeHeight=false;	//Изменение высоты
	this_.attachBtns=[];		//Можно задать другие кнопки
	this_.attachSlide=[];		//Прикрепить к слайду ещё слайд
	
	var	slider_conteiner=document.querySelector('.'+burlakov_sc);
	var	slide_count=slider_conteiner.children.length; //Количество слайдов
	var	slide_hover=false;
	var	slide_click=false;
	var	mause_positionX=0;
	var	mause_positionX_start=0;
	var	mause_positionX_end=0;
	var	moveMouseX=0;
	var procentWidth=document.getElementsByClassName(burlakov_sc)[0].parentNode.offsetWidth/100;
	var	print='';
	var	vspomogatel=0;
		//Кнопка первого слайда
	var	array_dots_id=[];
	
	var	dots_container=document.createElement('ul');
	
	//Контейнер с дотс кнопками
	dots_container.style.cssText='width:'+28*slide_count+'px; margin-left:'+(-28*slide_count/2)+'px;';
	dots_container.classList.add('burlakovSlider__dots_container');

	
	//Создаём дотс кнопки
	function createDots(i){
		if(i<slide_count && this_.dotsEnable){
			var dot=document.createElement('li');
			var dot_a=document.createElement('a');
			if(i!=this_.slide_true){
				dot_a.classList.add("burlakovSlider-dots-false");
			}else{
				dot_a.classList.add("burlakovSlider-dots-true");
			}
			dot_a.classList.add("burlakovSlider-dots");
			dot_a.id='id-'+burlakov_sc+'-dots-'+i;
			
			dot.appendChild(dot_a);
			dots_container.appendChild(dot);
			return dot_a;
		}
		return false;
	}
	function addBtnsLR(){
		if(this_.btnLRenable){
			//Кнопки влево и вправо
			print+='<div>';
			print+='<a class="byres_slider_btn-left"></a>';
			print+='<a class="byres_slider_btn-right"></a>';
			print+='</div>';
			slider_conteiner.innerHTML+=print;		
		}
	}
	//Стилизуем дотс кнопки через параметр
	function slilizeDots(){
		if(this_.dotsStyle==1){
			for(var i=0; i<slide_count; i+=2){
				document.getElementById('id-'+burlakov_sc+'-dots-'+i).style.cssText='margin-top:15px';
			}
		}
	}
	//Стилизуем dots кнопки при выборе другой кнопки
	function choiceDots(new_slide){
		var slide_true=new_slide;
		if(this_.dotsEnable){
			//Удаляем класс текущей выбранной кнопки
			document.querySelector('.'+burlakov_sc+' .burlakovSlider-dots-true').classList.add('burlakovSlider-dots-false');
			document.querySelector('.'+burlakov_sc+' .burlakovSlider-dots-true').classList.remove('burlakovSlider-dots-true');
			
			//Назначаем класс новой выбранной кнопки
			if(slide_true<slide_count){
				document.getElementById('id-'+burlakov_sc+'-dots-'+slide_true).classList.add("burlakovSlider-dots-true");
				document.getElementById('id-'+burlakov_sc+'-dots-'+slide_true).classList.remove("burlakovSlider-dots-false");
			}else{
				document.getElementById('id-'+burlakov_sc+'-dots-0').classList.add("burlakovSlider-dots-true");
				document.getElementById('id-'+burlakov_sc+'-dots-0').classList.remove("burlakovSlider-dots-false");
			}
		}
	}
	//ресайзинг высоты
	function resizeHeightFun(){
		if(this_.resizeHeight){
			slider_conteiner.style.height=slider_conteiner.children[this_.slide_true].clientHeight;
		}
	}
	//Ресайз окна браузера
	function resaizeWindow(){
		procentWidth=document.getElementsByClassName(burlakov_sc)[0].parentNode.offsetWidth/100;
		//console.log(procentWidth);
		resizeHeightFun();
	}
	this_.run=function(){
		var block_btns=false;
		var block_touchs=false;
		//Вспомогательный слайд (копия первого)
		var	div_end=slider_conteiner.children[0].cloneNode(1);
		slider_conteiner.appendChild(div_end);
		//Стилизуем слайды и дотс кнопки
		for(var i=0; i<slide_count+1; i++){
			var add_slide=slider_conteiner.children[i];
			add_slide.classList.add("byres_slider_slide");
			if(this_.mouseDown){
				add_slide.classList.add("byres_cursor_grab");
			}
			add_slide.id=burlakov_sc+'_slide-' + i;
			add_slide.style.cssText='left:' + i * 100 + '%; transition:'+this_.transition+';';
			

			setTimeout(function(dot_a,i){				
				if(dot_a===false) return;
				dot_a.addEventListener('click',function(){
					dotsChecked(i); /*console.log(i);*/ return false;
					});
			},1,createDots(i),i);
		};
		
		//Добавляем кнопки влево и вправо
		addBtnsLR();
		slider_conteiner.appendChild(dots_container);
		if(this_.btnLRenable){
			document.querySelector('.'+burlakov_sc+' .byres_slider_btn-left').addEventListener('click',function(){if(block_btns) return; slider_btnLeft();  return false;});
			document.querySelector('.'+burlakov_sc+' .byres_slider_btn-right').addEventListener('click',function(){if(block_btns) return; slider_btnRight();  return false;});
		}
		//Запоминаем текущий вид slider_conteiner
		//print=slider_conteiner.innerHTML;
		
		//Это даст интересный вид кнопок (на любителя)
		slilizeDots();
		//Движение слайдов
		var moovedSlide=function(cssTransition,slide_true){
			block_btns=true;
			block_touchs=true;
			for(var i=0; i<slide_count+1; i++){
				document.getElementById(burlakov_sc+'_slide-' + i).style.cssText='left:' + ( i-slide_true) * 100 + '%; '+'margin-left:'+moveMouseX+'px; '+cssTransition;
			}
			setTimeout(function(){block_btns=false;},this_.transition*900);
			setTimeout(function(){block_touchs=false;},this_.transition*800);
		};
		//Выбираем слайд true
		if(this_.slide_true!=0){
			if(this_.slide_true>=slide_count-1 || this_.slide_true<0){
				this_.slide_true=slide_count-1;
			}		
			moovedSlide('',this_.slide_true);
		}
		//Анимационная смена слайда
		var anim_btn= function(){	
			clearTimeout(autoSwitch);
			moveMouseX=0;
			moovedSlide('transition:'+this_.transition+'s;',this_.slide_true);
			
			//Стилизуем dots кнопки при выборе другой кнопки
			choiceDots(this_.slide_true);
			
			//Автоматизация смены слайда при наведении мыши слайдер останавливается
			if(!slide_hover && !slide_click && this_.autoPlay){
				autoSwitch=setTimeout((!this_.reverse)?slider_btnRight:slider_btnLeft,this_.slideTimeOut);
			}
		};	
		//Автоматизация смены слайда
		var autoSwitch=setTimeout(anim_btn,1);

		//Возобновление и остановка анимации при наведение мыши
		slider_conteiner.addEventListener('mouseover',function(){if(this_.hoverStop){slide_hover=true; clearTimeout(autoSwitch);}});
		slider_conteiner.addEventListener('mouseout',function(){
			slide_hover=false; 
			if(!slide_click && this_.autoPlay){
				autoSwitch=setTimeout((!this_.reverse)?slider_btnRight:slider_btnLeft,this_.slideTimeOut);
			}
		});

		//Остановка анимации при клике мыши
		slider_conteiner.addEventListener('mousedown',function(event){if(this_.mouseDown && !block_touchs){eventDown(event);}});
		slider_conteiner.addEventListener('touchstart',function(event){if(this_.touch && !block_touchs){eventDown(event);}});
		var eventDown=function(event){
			if(event.which==1 || event.targetTouches!=undefined){
				clearTimeout(autoSwitch);
				//console.log('yes'); 
				slide_click=true;
				mause_positionX_start=event.pageX || event.changedTouches[0].pageX;
			}
		};

		//Возобновление анимации при клике мыши==false
		slider_conteiner.addEventListener('mouseup',function(event){eventUp(event,150);});
		slider_conteiner.addEventListener('touchend',function(event){eventUp(event,50);});
		var eventUp=function(event,pxLeaght){
			if(slide_click){
				//console.log('no');
				slide_click=false;
				//mause_positionX_end=(event.changedTouches==undefined)?event.pageX:event.changedTouches[0].pageX;
				if(0>moveMouseX && pxLeaght<Math.abs(moveMouseX)){
					setTimeout(slider_btnRight,1);
				}else if(0<moveMouseX && pxLeaght<Math.abs(moveMouseX)){
					setTimeout(slider_btnLeft,1);
				}else{
					mouseMove(mause_positionX_end);//поведение слайдов при отпускании мышки
					setTimeout(anim_btn,20);
				}
			}
		};

		//Поведение слайдов, когда курсор двигается
		slider_conteiner.addEventListener('mousemove',function(event){eventMove(event); event.preventDefault();});
		slider_conteiner.addEventListener('touchmove',function(event){eventMove(event)});
		var eventMove=function(event){
			if(slide_click && slide_hover || slide_click && event.changedTouches!=undefined){
				mause_positionX=event.pageX || event.changedTouches[0].pageX;
				moveMouseX=mause_positionX-mause_positionX_start;
				setTimeout(mouseMove,1,mause_positionX);//поведение слайдов при движении зажатой мышки
				//console.log(mause_positionX);
			}else if(slide_click && !slide_hover || slide_click && event.changedTouches==undefined){
				eventUp(event,50)
			}
		};

		//поведение слайдов при отпускании или движении мышки
		var mouseMove=function(mause_positionX_end){
			if(this_.slide_true==0 && mause_positionX_end>mause_positionX_start){
				this_.slide_true=(!slide_click)?slide_count:this_.slide_true;
				setTimeout(moovedSlide,1,'transition:none; cursor:grabbing; cursor:-webkit-grabbing;',slide_count);
			}else if(this_.slide_true==slide_count && mause_positionX_end<mause_positionX_start){
				this_.slide_true=(!slide_click)?0:this_.slide_true;
				setTimeout(moovedSlide,1,'transition:none; cursor:grabbing; cursor:-webkit-grabbing;',0);
			}else{
				if(slide_click){moovedSlide('transition:none; cursor:grabbing; cursor:-webkit-grabbing;',this_.slide_true);}
			}
		};

		//Кнопка вправо
		var slider_btnRight=function(){	
			if(this_.slide_true<slide_count){	
				this_.slide_true+=1;
				setTimeout(anim_btn,1);
			}else{
				this_.slide_true=0;
				setTimeout(moovedSlide,1,'transition:none;',this_.slide_true);
				this_.slide_true=1;
				setTimeout(anim_btn,20);
			}
		};

		//Кнопка влево
		var slider_btnLeft=function(){
			if(this_.slide_true>0){
				this_.slide_true-=1;
				setTimeout(anim_btn,1);
			}else{
				this_.slide_true=slide_count;
				setTimeout(moovedSlide,1,'transition:none;',this_.slide_true);
				this_.slide_true-=1;
				setTimeout(anim_btn,20);
			}
		};

		//Выбранная дотс кнопка
		function dotsChecked(сheck){
			if(this_.slide_true==slide_count){setTimeout(moovedSlide,1,'transition:none;',0);}
			var сheck=сheck;
			if(сheck<this_.slide_true){
				this_.slide_true=сheck+1;
				return setTimeout(slider_btnLeft,1);
			}else{
				this_.slide_true=сheck-1;
				return setTimeout(slider_btnRight,1);
			}
		};
		resizeHeightFun();
	}
	this_.runFabe=function(){
		var thisFabe=this;
		var block_btns=false;
		var block_touchs=false;
		var stopAnim=function(){
			clearTimeout(thisFabe.animSlideOut_2);
			clearTimeout(animSlideOut);
		}
		//Выбираем слайд true
		if(this_.slide_true>=slide_count-1 || this_.slide_true<0){
			this_.slide_true=slide_count-1;
		}		
		//Ресайз окна браузера
		window.onresize=resaizeWindow;
		//Стилизация и подготовка слайдов и дотс кнопок
		for(var i=0;i<slide_count;i++){
			var add_slide=slider_conteiner.children[i];
			add_slide.classList.add("byres_slider_slide");
			if(this_.mouseDown){
				add_slide.classList.add("byres_cursor_grab");
			}
			add_slide.id=burlakov_sc+'_slide-' + i;
			if(i==this_.slide_true){
				if(this_.attachSlide[i]!=undefined){this_.attachSlide[i].style.cssText='transition:'+this_.transition+'s; opacity:1;';}
				add_slide.style.cssText='transition:'+this_.transition+'s; opacity:1;';
			}else{
				if(this_.attachSlide[i]!=undefined){this_.attachSlide[i].style.cssText='transition:'+this_.transition+'s; opacity:0; display:none;';}
				add_slide.style.cssText='transition:'+this_.transition+'s; opacity:0; display:none;';
			}
			setTimeout(function(dot_a,i){				
				if(dot_a===false) return;
				dot_a.addEventListener('click',function(){
					dotsChecked(i); /*console.log(i);*/ return false;
					});
			},1,createDots(i),i);
		}
		var anim_slide=function(new_slide){
			stopAnim();
			
			block_btns=true;
			setTimeout(function(){block_btns=false;},this_.transition*1000+110);
			if(new_slide>=slide_count){
				var new_slide=0;
			}else if(new_slide<0){
				var new_slide=slide_count-1;
			}
			choiceDots(new_slide);
			var this_slide_true=this_.slide_true;
			this_.slide_true=new_slide;
			
			if(Math.abs(moveMouseX)<30){
				var cssText='transition:'+this_.transition+'s; opacity:0;';
				if(this_.attachSlide[new_slide]!=undefined){this_.attachSlide[new_slide].style.cssText=cssText;}
				document.getElementById(burlakov_sc+'_slide-' + new_slide).style.cssText=cssText;
			}
			var cssText='transition:'+this_.transition+'s; opacity:0;';
			if(this_.attachSlide[this_slide_true]!=undefined){this_.attachSlide[this_slide_true].style.cssText=cssText;}
			document.getElementById(burlakov_sc+'_slide-' + this_slide_true).style.cssText=cssText;
			
			//console.log(slide_true);
			moveMouseX=0;
			
			setTimeout(function(){
				var cssText='transition:'+this_.transition+'s; opacity:1;';
				if(this_.attachSlide[new_slide]!=undefined){this_.attachSlide[new_slide].style.cssText=cssText;}
				document.getElementById(burlakov_sc+'_slide-' + new_slide).style.cssText=cssText;
			},20);
			setTimeout(clearOpacity,1,this_slide_true);
			//setTimeout(function(){document.getElementById(burlakov_sc+'_slide-' + this_slide_true).style.cssText='display:none;';},this_.transition*1000);
			thisFabe.animSlideOut_2=setTimeout(function(){
				if(this_.attachSlide[this_slide_true]!=undefined){this_.attachSlide[this_slide_true].style.cssText='display:none;';	}
				document.getElementById(burlakov_sc+'_slide-' + this_slide_true).style.cssText='display:none;';						
				if(this_.autoPlay && !slide_hover && !slide_click){
					animSlideOut=setTimeout((!this_.reverse)?slider_btnRight:slider_btnLeft,this_.slideTimeOut);
				}
				
			},this_.transition*1000);
		};
		
		
		//Добавляем кнопки влево и вправо
		addBtnsLR();
		//Это даст интересный вид кнопок (на любителя)
		slilizeDots();
		slider_conteiner.appendChild(dots_container);
		var attachLeftBtn= function (){	
				if(block_btns) return;
				setTimeout(slider_btnLeft,1);
				return false;
		}
		var attachRightBtn= function (){	
			if(block_btns) return;
			setTimeout(slider_btnRight,1);
			return false;		
		}
		if(this_.btnLRenable){
			document.querySelector('.'+burlakov_sc+' .byres_slider_btn-left').addEventListener('click',attachLeftBtn);
			document.querySelector('.'+burlakov_sc+' .byres_slider_btn-right').addEventListener('click',attachRightBtn);
		}
		if(this_.attachBtns[0]!=undefined){
			this_.attachBtns[0].addEventListener('click',attachLeftBtn);
		}
		if(this_.attachBtns[1]!=undefined){
			this_.attachBtns[1].addEventListener('click',attachRightBtn);
		}
			
		var slider_btnRight=function(){		
			stopAnim();
			setTimeout(anim_slide,1,this_.slide_true+1);
		};
		var slider_btnLeft=function(){			
			stopAnim();
			setTimeout(anim_slide,1,this_.slide_true-1);
		};
		if(this_.autoPlay){
			var animSlideOut=setTimeout((!this_.reverse)?slider_btnRight:slider_btnLeft,this_.slideTimeOut);
		}
		//Выбранная дотс кнопка
		function dotsChecked(сheck){	
			if(сheck==this_.slide_true || block_btns) return;
			//clearTimeout(thisFabe.eventDownOut);		
			anim_slide(сheck);
		};
		var slideVar=function(){
			if(moveMouseX>0){
				return (this_.slide_true==0)?slide_count-1:this_.slide_true-1;
			}else if(moveMouseX<0){
				return(this_.slide_true>=slide_count-1)?0:this_.slide_true+1;
			}else{
				return this_.slide_true;
			}
		};
		var moovedSlide=function(){
			var this_slide_true=0;
			if(moveMouseX!=0){
				this_slide_true=slideVar();
				var this_moveMouseX=Math.abs(moveMouseX);
				document.getElementById(burlakov_sc+'_slide-' + this_slide_true).style.cssText='transition:none; opacity:'+this_moveMouseX/procentWidth/100+'; cursor:grabbing; cursor:-webkit-grabbing;';
				document.getElementById(burlakov_sc+'_slide-' + this_.slide_true).style.cssText='transition:none; opacity:'+(1-(this_moveMouseX/procentWidth)/100)+'; cursor:grabbing; cursor:-webkit-grabbing;';
			}
		};
		var clearOpacity=function(this_slide_true){
			for(var i=0; i<slide_count; i++){
				if(i==this_slide_true || i==this_.slide_true) continue;
				//console.log(i);
				document.getElementById(burlakov_sc+'_slide-' + i).style.cssText='transition:'+this_.transition+'s; display:none;';
			}
		};
		//Остановка анимации при клике мыши
		slider_conteiner.addEventListener('mousedown',function(event){if(this_.mouseDown && !block_touchs){eventDown(event);}});
		slider_conteiner.addEventListener('touchstart',function(event){if(this_.touch && !block_touchs){eventDown(event);}});
		var eventDown=function(event){
			
				if(event.which==1 || event.targetTouches!=undefined){
					stopAnim();
					//console.log('yes'); 
					slide_click=true;
					mause_positionX_start=event.pageX || event.changedTouches[0].pageX;
				}
			
		};
		//Поведение слайдов, когда курсор двигается
		slider_conteiner.addEventListener('mousemove',function(event){eventMove(event); event.preventDefault();});
		slider_conteiner.addEventListener('touchmove',function(event){eventMove(event)});
		var eventMove=function(event){
			if(slide_click && slide_hover || slide_click && event.changedTouches!=undefined){
				mause_positionX=event.pageX || event.changedTouches[0].pageX;
				moveMouseX=mause_positionX-mause_positionX_start;
				setTimeout(moovedSlide,1);//поведение слайдов при движении зажатой мышки
				//console.log(mause_positionX);
			}else if(slide_click && !slide_hover || slide_click && event.changedTouches==undefined){
				eventUp(event,50)
			}
		};
		
		
		//Возобновление и остановка анимации при наведение мыши
		if(this_.hoverStop){
			slider_conteiner.addEventListener('mouseover',function(){slide_hover=true; stopAnim();});
			slider_conteiner.addEventListener('mouseout',function(event){
				slide_hover=false; 
				if(!slide_click && this_.autoPlay){
					animSlideOut=setTimeout((!this_.reverse)?slider_btnRight:slider_btnLeft,this_.slideTimeOut);
				}
			});
		}
		//Возобновление анимации при клике мыши==false
		slider_conteiner.addEventListener('mouseup',function(event){eventUp(event,150);});
		slider_conteiner.addEventListener('touchend',function(event){eventUp(event,50);});
		var eventUp=function(event,pxLeaght){
			if(slide_click){
				//console.log('no');
				slide_click=false;
				var this_slide=slideVar();
				if(this_slide==this_.slide_true) return;
				//mause_positionX_end=(event.changedTouches==undefined)?event.pageX:event.changedTouches[0].pageX;
				setTimeout(clearOpacity,1,this_slide);
				if(0>moveMouseX && pxLeaght<Math.abs(moveMouseX)){
					setTimeout(slider_btnRight,1);
				}else if(0<moveMouseX && pxLeaght<Math.abs(moveMouseX)){
					setTimeout(slider_btnLeft,1);
				}else{
				
					//console.log(moveMouseX);
					document.getElementById(burlakov_sc+'_slide-' + this_.slide_true).style.cssText='transition:0.4s; opacity:1;';
					document.getElementById(burlakov_sc+'_slide-' + this_slide).style.cssText='transition:0.4s; opacity:0;';
					setTimeout(function(){document.getElementById(burlakov_sc+'_slide-' + this_slide).style.cssText='display:none;';},400);
				
				
					if(this_.autoPlay && !slide_hover){
						animSlideOut=setTimeout((!this_.reverse)?slider_btnRight:slider_btnLeft,this_.slideTimeOut+400);
					}
				}
			}
		};
		resizeHeightFun();
	};
}