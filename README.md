# burlakov-slider
slider without jquery

<h2>Чтобы воспользоваться сладером сделайте следуюущие действия:</h2>
<h4>1.Поместите папку с названием "Burlakov_slider" в дирректорию с вашим сайтом;</h4>
<h4>2.В head вставьте </h4>

```
<link rel='stylesheet' href='Burlakov_slider/css_img/main.css'/>
```
3.Сверстайте таким образом:

```
<div class='your_class'>
  <div>..Your slide..</div>
  <div>..Your slide..</div>
  <div>..Your slide..</div>
  <div>..Your slide..</div>
</div>
```

4.Вставьте перед закрывающимя тегом body
```
<script src='Burlakov_slider/js/slider_script_oop.js'></script>
<script>
			var slider_0=new  initBurlakovSlider('your_class');
      slider_0.transition=0.45;		//Скорость смены слайда
      slider_0.slideTimeOut=4200;	//Перерыв между сменой слайда
      slider_0.dotsEnable=true;		//Показывать дотс кнопки
      slider_0.dotsStyle=0;			//Стиль дотс
      slider_0.reverse=false;		//Реверсировать направление слайдов
      slider_0.autoPlay=true;		//Автоматическая смена слайда
      slider_0.mouseDown=true;		//Дейтсвия при зажатой кнопкой мыши
      slider_0.touch=true;			//Дейтсвия при тачинге на телефоне
      slider_0.hoverStop=true;		//Остановка при наведении
      slider_0.btnLRenable=true;		//Показать кнопки влево/вправо
      slider_0.slide_true=0;			//Текущий слайд
			slider_0.run();
			//Все эти параметры заданы по умолчанию и их перечисление не нужно
		</script>
```
