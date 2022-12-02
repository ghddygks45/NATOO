$(function() {

	if($('.layer-content').hasClass('open')){
		$('body').css('overflow','hidden');
		dim('open');
	}

	$(document).on('click', '.gnb > ul > li > a', function(){
		$(this).toggleClass('active').parent().siblings().find(' > a');
	});

    // datepicker
	$.datepicker.setDefaults({
		dateFormat: 'yy-mm-dd',
		prevText: '이전 달',
		nextText: '다음 달',
		monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		dayNames: ['일', '월', '화', '수', '목', '금', '토'],
		dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
		dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
		showMonthAfterYear: true,
		yearSuffix: '년',
		showOn: "button",
		buttonImageOnly: false,
		buttonText: "달력",
		showOn: "both"
	});

    $(".datepicker").datepicker();
	
});

var dimLayer = '<div class="dim"></div>';

$(document).on('click', '.dim', function(){
	// if($('.layer-content').hasClass('open')){
	// 	layerContentClose();
	// }

	// if($('.layer-popup').hasClass('fadeInDown')){
	// 	layerPopupClose('off');
	// }

	// if($('.alert-popup').hasClass('fadeInDown')){
	// 	alertPopupClose('off');
	// }
	//layerContentClose();
	//alertPopupClose('alert-popup');
});

function layerContentOpen(){
	dim('open');
	$('.layer-content').addClass('open');
	$('body').css('overflow','hidden');
}

function layerContentClose(){
	dim('off');
	$('.layer-content').removeClass('open');
	$('body').removeAttr('style');
}

function layerPopupOpen(id){
	if($('.layer-content').hasClass('open')) {
		$('.dim').css('z-index','10000');
	}else{
		dim('open');
	}
	$(".layer-popup[data-popup="+id+"]").show().addClass('fadeInDown');
}

function layerPopupClose(id){
	var target;
	
	if(id == 'off'){
		target = $(".layer-popup.fadeInDown");
	}else{
		target = $(".layer-popup[data-popup="+id+"]");
	}

	if($('.layer-content').hasClass('open')) {
		$('.dim').removeAttr('style');
	}else{
		dim('off');
	}

	target.removeClass('fadeInDown').addClass('fadeInUp');
	setTimeout(function(){
		target.removeClass('fadeInUp').removeAttr('style');
	},300);
}

function alertPopupOpen(id){
	$('.layer-popup').each(function(){
		if($(this).css('display') == 'block'){
			$('.dim').css('z-index','20000');
			return false;
		}else{
			dim('open');
			return false;
		}
	});
	$(".alert-popup[data-popup="+id+"]").show().addClass('fadeInDown');
}

function alertPopupClose(id){
	var target;
	$('.layer-popup').each(function(){
		if($(this).css('display') == 'none'){
			dim('off');
		}else{
			$('.dim').removeAttr('style');
			return false;
		}
	});
	if(id == 'off'){
		target = $(".alert-popup.fadeInDown");
	}else{
		target = $(".alert-popup[data-popup="+id+"]");
	}

	target.removeClass('fadeInDown').addClass('fadeInUp');
	setTimeout(function(){
		target.removeClass('fadeInUp').removeAttr('style');
	},300);
}

function dim(mode){
	if(mode == 'open'){
		$('body').append(dimLayer);
		setTimeout(function(){$('.dim').addClass('open');},100);
	}else{
		$('.dim').removeClass('open');
		setTimeout(function(){$('.dim').remove();},500);
	}
}

function setThumbnail(event, id){
	var reader = new FileReader();
	var obj = $("#" + id);
	reader.onload = function(event) {
		var img = document.createElement("img");
		img.setAttribute("src", event.target.result);
		obj.append(img);
		//obj.addClass('sw').append(img);
	};
	reader.readAsDataURL(event.target.files[0]);
	obj.parent().find(' > .btn-img-del').show();
	obj.parent().find(' > .pic-check').show();
}

function orgImage(obj){
	var img = $(obj).find('> img').attr('src');
	var tag = '<img src="' + img + '" alt="">';
	layerPopupOpen('image-popup');
	$('.org-size').find(' > img').remove();
	$('.org-size').append(tag);
}

function imgFileDelete(obj, id){
	var agent = navigator.userAgent.toLowerCase();
	var imgFile = $('#' + id);
	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ){
		imgFile.replaceWith( imgFile.clone(true) );
	} else {
		imgFile.val("");
	}
	$(obj).parent().find('.pic-check').hide();
	$(obj).hide().parent().find('img').remove();
}

function fileDelete(id){
	var agent = navigator.userAgent.toLowerCase();
	var imgFile = $('#' + id);
	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ){
		imgFile.replaceWith( imgFile.clone(true) );
	} else {
		imgFile.val("");
	}
	$('#' + id).parent('.file-select').next().hide();
}

function fileCheck(obj){
	var filePathSplit = obj.value.split('\\');
	var fileNameSplit = filePathSplit[filePathSplit.length-1];
	var par = $(obj).parent('.file-select').next();
	par.css('display', 'inline-block');
	par.find('.fn').text(fileNameSplit);
}

function selectChange(item){
	var state = item.value;
	$('#'+state).show();
	$('.select_con').not($('#'+state)).hide();
}

// tab
$(document).on("click", ".tab-btn a", function(){
	var tabIdx = $(this).data("tab");
	$(".tab-content").hide();
	$("#"+tabIdx).show();
	$(this).addClass('active');
	$('.tab-btn a').not($(this)).removeClass('active');
});

// // 통계관리 셀렉트
$(document).on('change',".stats_btn .check input" , function(){
	var chk_value = $(this).data('tab');
	$(".stats_con").hide();
	$("#"+chk_value).show();
})

// tbl-tab
$(document).on("click", ".tbl_btn a", function(){
	var tabIdx = $(this).data("tab");
	$(".tbl_con").hide();
	$(".tab-content.first").show();
	$('.tab-btn a.first').addClass('active');
	$("#"+tabIdx).show();
	$(this).addClass('active');
	$('.tbl_btn a').not($(this)).removeClass('active');
});

// 댓글
$(document).on("click", ".comment_btn", function(){
	// var comment = $(this).parents('tr').next('.comment_box');
	// comment.fadeToggle('fast');
	// $('.comment_box').not(comment).hide();
	$(this).parents('tr').toggleClass('reply-open');
});